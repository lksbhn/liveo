import { inject, injectable } from "inversify";
import { Job, scheduleJob } from "node-schedule";
import { Logger } from "../../../../../server/src/app/services/logging/logger";
import { IdGenerator } from "../id-generation/id-generator";

/**
 * Proxy class for node-schedule scheduler
 */
@injectable()
export class Scheduler {

  private readonly _jobs: Map<string, Job> = new Map<string, Job>();

  constructor(
    @inject("Logger") private readonly _logger: Logger,
    @inject("IdGenerator") private readonly _idGenerator: IdGenerator) {
  }

  public schedule(dueDate: Date, callback: () => void): string {
    const id = this._idGenerator.generateId();

    const job = scheduleJob(id, dueDate, (fireDate) => {
      this._logger.debug(`Running scheduled job. Scheduled time was: ${fireDate}.`);
      callback();
      this.removeJob(id);
    });

    if (job) {
      this._jobs.set(id, job);
      this._logger.debug(`Scheduled job with id ${id} to be executed on ${dueDate}.`);
    } else {
      this._logger.warn("Can not schedule job: Date is in the past.");
    }

    return id;
  }

  public cancelJob(id: string): void {
    const job = this._jobs.get(id);

    if (!job) {
      throw new Error(`Job with id ${id} was not found.`);
    }

    job.cancel();
    this.removeJob(id);

    this._logger.debug(`Canceled job with id ${id}.`);
  }

  private removeJob(id: string): void {
    this._jobs.delete(id);
    this._logger.debug(`Removed job with id ${id} from job list.`);
  }
}
