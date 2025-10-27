import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const PostgresDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: false,
    logging: false,
    entities: [path.join(__dirname, 'models', '*.{ts,js}')],
    migrations: [path.join(__dirname, 'migrations', '*.{ts,js}')],
    subscribers: [],
});

// Remove the initialization - TypeORM CLI will handle it
export default PostgresDataSource;