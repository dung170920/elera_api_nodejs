import { createClient } from "redis";
import "dotenv/config";

const client = createClient({
  //url: "redis://" + process.env.REDIS_HOST + ":" + process.env.REDIS_PORT,
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number.parseInt(process.env.REDIS_PORT),
  },
});

export async function connectToRedis() {
  client.on("error", (err) => console.log("Redis Client Error", err));

  await client.connect();
}

export async function setValue(key: string, value: string, expired: number) {
  try {
    let options = {};
    if (expired) {
      options = {
        EX: expired,
      };
    }

    await client.set(key, value, options);
  } catch (error) {
    throw error;
  }
}

export async function getValue(key: string) {
  try {
    return await client.get(key);
  } catch (error) {
    throw error;
  }
}

export async function delKey(key: string) {
  try {
    await client.del(key);
  } catch (error) {
    throw error;
  }
}
