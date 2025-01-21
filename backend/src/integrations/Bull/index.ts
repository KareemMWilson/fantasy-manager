import { Queue, Worker } from "bullmq";
import { TeamController } from "../../controllers/team.controller";
import { config } from "../../config";
import { Server } from 'socket.io';

const connection = {
  host: config.REDIS.HOST,
  port: Number(config.REDIS.PORT),
};

let io: Server | null = null;

export const TeamCreationService = {
  queue: new Queue("creating-team-queue", { connection }),

  worker: new Worker(
    "creating-team-queue",
    async (job) => {
      console.log("Processing job", { jobId: job.id });
      await TeamController.createTeam(job.data.userId);
    },
    { connection }
  ),

  setSocketIO(socketIO: Server) {
    io = socketIO;
  },

  initialize() {
    this.worker.on("completed", (job) => {
      console.log(`${job.id} has completed!`);
      console.log(JSON.stringify(job.data));

      if (io) {
        io.to(`user:${job.data.userId}`).emit('tc-notify', {
          message: 'Team created successfully!',
          type: 'success',
          jobId: job.id
        });
      }
    });

    this.worker.on("failed", (job, err) => {
      console.log(`${job?.id} has failed with ${err.message}`);
      
      if (io && job) {
        io.to(`user:${job.data.userId}`).emit('notification', {
          message: `Team creation failed: ${err.message}`,
          type: 'error',
          jobId: job.id
        });
      }
    });


    console.log("TeamCreationService initialized.");
  },

  async addTeamCreationJob(userId: string): Promise<void> {
    const job = await this.queue.add("creating-team-queue", { userId });
    console.log(`Job added for userId: ${userId}`);
    
    if (io) {
      io.to(`user:${userId}`).emit('notification', {
        message: 'Team creation started',
        type: 'info',
        jobId: job.id
      });
    }
  },

  async close(): Promise<void> {
    await this.queue.close();
    await this.worker.close();
    console.log("Queue and Worker have been closed.");
  },
};

export const initializeTeamService = (socketIO: Server) => {
  TeamCreationService.setSocketIO(socketIO);
  TeamCreationService.initialize();
  return TeamCreationService;
};