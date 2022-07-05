export interface IConfig {
  port: number;
  env: string;
  db: {
    srv: DotEnvValue;
    username: DotEnvValue;
    password: DotEnvValue;
    host: DotEnvValue;
    port: DotEnvValue;
    database: DotEnvValue;
  };
  jwtKey: DotEnvValue;
  jwtExpireTime: DotEnvValue;
}

type DotEnvValue = string | undefined;
