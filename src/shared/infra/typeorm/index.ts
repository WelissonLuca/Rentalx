import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      URL:
        process.env.NODE_ENV === 'test'
          ? process.env.TEST_DATABASE_URL
          : defaultOptions,
    })
  );
};
