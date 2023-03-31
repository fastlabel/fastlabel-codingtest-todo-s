import { createConnection, getConnectionOptions } from "typeorm";

getConnectionOptions().then(async (connectionOptions) => {
  await createConnection({
    ...connectionOptions,
  });
});
