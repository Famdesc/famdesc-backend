
export const APP_NAME = 'FAMDESC_API';

export const DEFAULT_APP_ENV = process.env.NODE_ENV || 'development';

export default () => {
    const app = {
        name: APP_NAME,
        env: process.env.APP_ENV || DEFAULT_APP_ENV,
    };

    return {
        port: parseInt(process.env.APP_PORT, 10) || 3000,
        version: process.env.APP_VERSION || 'v1',
        package: {
            name: process.env.npm_package_name,
            version: process.env.npm_package_version,
        },
        database: {
            type: 'postgres',
            url: process.env.POSTGRES_URL,
            synchronize: false,
        },
        app
    };
};
