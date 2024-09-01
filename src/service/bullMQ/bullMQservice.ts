import redisClient from '../redis/redisService';
import { Queue } from 'bullmq';

const Queue1 = new Queue('getData', { connection: redisClient });

const Queue2 = new Queue('version', { connection: redisClient });
export const updateTask = {
  add: async (socketId: string, id: number) => {
    await Queue1.add(socketId, id);
  },
};

export const versionTask = {
  add: async (socketId: string, id: number) => {
    await Queue2.add(socketId, id);
  },
};

