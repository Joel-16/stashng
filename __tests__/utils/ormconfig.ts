import path from 'path';
import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  url:"postgres://postgres:5432@localhost:5432/test",
  type: 'postgres',
  entities: [path.join(__dirname, './entities/*.entity{.ts,.js}')],
  synchronize: true,
  logging: false,
});

export { AppDataSource};