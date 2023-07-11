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

  // await client.disconnect();
}

export async function setValue(key: string, value: string, expired: number) {
  let options = {};
  if (expired) {
    options = {
      EX: expired,
    };
  }

  await client.set(key, value, options);
}

export async function getValue(key: string) {
  return await client.get(key);
}

export async function delKey(key: string) {
  await client.del(key);
}
