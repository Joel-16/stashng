import path from 'path';
import { DataSource } from 'typeorm';

const ssl = {
  rejectUnauthorized: false,
};

interface ParsedConnectionString {
  username: string;
  password: string;
  host: string;
  port: number | null;
  database: string;
  ssl?: any;
}

function parsePostgresConnectionString(connection_string: string): ParsedConnectionString {
  if (!connection_string.startsWith('postgres://')) {
    throw new Error("Invalid PostgreSQL connection string. It should start with 'postgresql://'.");
  }

  connection_string = connection_string.slice('postgres://'.length);

  const [username_password, host_port_database] = connection_string.split('@', 2);
  const [username, password] = username_password.split(':');
  const [host_port, database] = host_port_database.split('/');

  const [host, portStr] = host_port.split(':');
  const port = portStr ? parseInt(portStr, 10) : null;

  if(host === "localhost"){
    return {
      username,
      password,
      host,
      port: port,
      database,
    };
  } else {
    return {
      username,
      password,
      host,
      port: port,
      database,
      ssl: process.env.NODE_ENV === 'production' && ssl,
    };
  }
}

const AppDataSource = new DataSource({
  ...parsePostgresConnectionString(process.env.DATABASE_URL),
  type: 'postgres',
  entities: [path.join(__dirname, '../entities/*.entity{.ts,.js}')],
  synchronize: true,
  logging: true
});

export { AppDataSource};