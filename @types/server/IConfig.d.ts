export interface IConfig {
  port: number;
  env: string;
  db: {
    srv: DotEnvValue;
    host: DotEnvValue;
    port: DotEnvValue;
    database: DotEnvValue;
  };
  jwtKey: DotEnvValue;
  jwtExpireTime: DotEnvValue;
}

type DotEnvValue = string | undefined;
