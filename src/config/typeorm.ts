import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

const config = {
  type: 'postgres',
  host: `${process.env.DATABASE_HOST}`,
  port: parseInt(process.env.DATABASE_PORT),
  username: `${process.env.DATABASE_USERNAME}`,
  password: `${process.env.DATABASE_PASSWORD}`,
  database: `${process.env.DATABASE_NAME}`,
  entities: [__dirname + '../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '../migrations/*{.ts,.js}'],
  logging: process.env.NODE_ENV === 'development',
  migrationsTableName: 'migrations',
  autoLoadEntities: true,
  synchronize: false,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
