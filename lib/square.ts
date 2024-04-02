import { Client, Environment } from 'square';

export const createSquareClient = () => {
  const client = new Client(
    process.env.NODE_ENV === 'developmen'
      ? {
          accessToken: process.env.SANDBOX_ACCESS_TOKEN,
          environment: Environment.Sandbox,
        }
      : {
          accessToken: process.env.ACCESS_TOKEN,
          environment: Environment.Production,
        }
  );

  return client;
};
