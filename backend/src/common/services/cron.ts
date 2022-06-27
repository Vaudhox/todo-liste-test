import * as Queue from 'bull'
import { MoreThan, IsNull, Not } from 'typeorm';
import  DB from "../../common/database";
import * as luxon from "luxon";
import {sendEmailReminderList} from "../../common/services/mailer"
import { configService } from '../../config/config.service';

export default class WorkerCron {

    private queue;
    private userRepository;
    private listRepository;
    constructor() {
        this.queue = new Queue("list will expored", { redis: { port: 6379, host: '127.0.0.1', password: configService.getValue("REDIS_PASSWORD") }});
        this.userRepository = DB.getUserRepository()
        this.listRepository = DB.getListRepository()
        this.queue.process(async (job, done) => {
            console.log("start job")
            // job.data contains the custom data passed when the job was created
            // job.id contains id of this job.
            const users = await this.userRepository.find({where: {emailConfirm: true, lists: {endDate: Not(IsNull()), reminder: false}}, relations: ["lists"]})

            for (const user of users) {
                for ( const list of user.lists) { 
                    const enDate24h = luxon.DateTime.fromJSDate(list.endDate).plus({ days: 1 })
                    if ( enDate24h > luxon.DateTime.now()) {
                        await sendEmailReminderList(user, list);
                        list.reminder = true;
                        await this.listRepository.save(list);
                    }
                }
            }
            // call done when finished
            done();
        });
        this.queue.on('error', function (error) {
            console.error("error", error);
        })
          /*            
          this.queue.on('waiting', function (jobId) {
           console.log("waiting", jobId);
          });

          this.queue.on('completed', function (job, result) {
            console.log("completed", job.id)
          })
          */
          this.queue.on('failed', function (job, err) {
            console.log("failed", err)
          })
    }

    public start(): void {
        this.queue.add({data: "cron"}, { repeat: { cron: '25 10 * * *' } });
    }

          
}