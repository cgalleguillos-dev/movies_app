import { registerAs } from '@nestjs/config';

export default registerAs('baseConfig', () => {
    return {
        database: {
            type: process.env.TYPEORM_CONNECTION as any,
            host: process.env.TYPEORM_HOST,
            port: parseInt(process.env.TYPEORM_PORT, 10),
            user: process.env.TYPEORM_USERNAME,
            pass: process.env.TYPEORM_PASSWORD,
            database: process.env.TYPEORM_DATABASE,
        },
        typeorm: {
            entities: process.env.TYPEORM_ENTITIES,
            migrations: process.env.TYPEORM_MIGRATIONS,
            synchronize: process.env.TYPEORM_SYNCHRONIZE,
            migrations_dir: process.env.TYPEORM_MIGRATIONS_DIR,
            logging: process.env.TYPEORM_LOGGING,
        }
    }
});