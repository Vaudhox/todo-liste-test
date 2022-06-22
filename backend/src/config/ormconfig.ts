import { DataSource } from "typeorm";
import { configService } from './config.service';

// You can load you .env file here synchronously using dotenv package (not installed here),
// import * as dotenv from 'dotenv';
// import * as fs from 'fs';
// const environment = process.env.NODE_ENV || 'development';
// const data: any = dotenv.parse(fs.readFileSync(`${environment}.env`));
// You can also make a singleton service that load and expose the .env file content.
// ...

const myDataSource = new DataSource({
    type: 'postgres',
    // __dirname is either dist or src folder, meaning either
    url: configService.getValue('DATABASE_URL'),
    logging: true,
    synchronize: true,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    // you can disable this if you prefer running migrations manually.
    migrationsRun: false,
    // Allow both start:prod and start:dev to use migrations
    logger: 'file',
    // the compiled js in prod or the ts in dev.
    migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
})

export default myDataSource;
