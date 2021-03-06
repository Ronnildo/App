import Bee from 'bee-queue'
import cancelamentoMail from '../app/jobs/cancelamentoEmail'
import redisConfig from '../../config/redis'

const jobs = [cancelamentoMail];

class Queue{
  constructor(){
    this.queues = {};

    this.init();
  }
  init(){
    jobs.ForEach(({key, handle}) => {
      this.queues[key] =  {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle
      };
    });
  }

  add(queue, job){
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue(){
    jobs.forEach(job => {
      const {bee, handle} = this.queues[jobs.key];

      bee.process(handle);
    });
  }

   handleFailed(job, err){
      console.log(`Queue ${job.queue.name}: FALHOU`, err);
    }

}

export default new Queue();