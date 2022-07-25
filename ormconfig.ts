module.exports = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "pass123",
  database: "postgres",
  entities: [
    "dist/**/**.entity{.ts,.js}"
  ],
  migrations: [
    "dist/migrations/*.ts"
  ],
  cli: {
    migrationsDir: "src/migrations",
  },
  synchronize: false
};
