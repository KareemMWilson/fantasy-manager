import { Queue, Worker } from "bullmq";
import { TeamController } from "../../controllers/team.controller";
import { config } from "../../config";

class TeamCreationService {
  private queue: Queue;
  private worker: Worker;

  constructor() {
    const connection = {
      host: config.REDIS.HOST,
      port: Number(config.REDIS.PORT),
    };

    this.queue = new Queue("creating-team-queue", { connection });

    this.worker = new Worker(
      "creating-team-queue",
      async (job) => {
        console.log("Processing job", { jobId: job.id });
        await TeamController.createTeam(job.data.userId)
      },
      { connection }
    );

    this.worker.on("completed", (job) => {
      console.log(`${job.id} has completed!`);
      console.log(JSON.stringify(job.data))
    });

    this.worker.on("failed", (job, err) => {
      console.log(`${job?.id} has failed with ${err.message}`);
    });
  }

  public async addTeamCreationJob(userId: string): Promise<void> {
    await this.queue.add("creating team", { userId });
    console.log(`Job added for userId: ${userId}`);
  }

  public async close(): Promise<void> {
    await this.queue.close();
    await this.worker.close();
    console.log("Queue and Worker have been closed.");
  }
}

export default TeamCreationService;