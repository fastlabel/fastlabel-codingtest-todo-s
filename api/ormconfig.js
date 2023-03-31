module.exports = [
  {
    type: "mysql",
    replication: {
      master: {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
      },
      slaves: [
        {
          host: process.env.MYSQL_READ_HOST,
          port: process.env.MYSQL_PORT,
          username: process.env.MYSQL_USER,
          password: process.env.MYSQL_PASSWORD,
          database: process.env.MYSQL_DATABASE,
        },
      ],
    },
    synchronize: false,
    logging: false,
    entities: ["src/entities/**/*.ts"],
    migrations: ["src/migrations/**/*.ts"],
    subscribers: ["src/subscribers/**/*.ts"],
    cli: {
      entitiesDir: "src/entities",
      migrationsDir: "src/migrations",
      subscribersDir: "src/subscribers",
    },
    maxQueryExecutionTime: 600000,
  },
];
