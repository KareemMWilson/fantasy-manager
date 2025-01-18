import { Queue, Worker } from "bullmq";
import { TeamController } from "../../controllers/team.controller";
import { config } from "../../config";

const connection = {
  host: config.REDIS.HOST,
  port: Number(config.REDIS.PORT),
};

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

  initialize() {
    this.worker.on("completed", (job) => {
      console.log(`${job.id} has completed!`);
      console.log(JSON.stringify(job.data));
    });

    this.worker.on("failed", (job, err) => {
      console.log(`${job?.id} has failed with ${err.message}`);
    });

    console.log("TeamCreationService initialized.");
  },

  async addTeamCreationJob(userId: string): Promise<void> {
    await this.queue.add("creating team", { userId });
    console.log(`Job added for userId: ${userId}`);
  },

  async close(): Promise<void> {
    await this.queue.close();
    await this.worker.close();
    console.log("Queue and Worker have been closed.");
  },
};

TeamCreationService.initialize();
