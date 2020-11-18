import dotenv from 'dotenv';
dotenv.config();

export const config = {
    env: process.env.env,
    logging: process.env.logging === "true",
    mysql: {
        logging: process.env === 'dev',
        database: process.env['mysql.dbname'],
        username: process.env['mysql.dbuser'],
        password: process.env['mysql.dbpass'],
        host: process.env['mysql.dbhost'],
        dialect: process.env['mysql.dbdialect'],
        port: process.env['mysql.dbport'],
        dialectOptions: {
            connectTimeout: 600000,
        },
    },
    jwt: {
        secret: process.env['jwt.secret'],
    },
    route: (method, permission) => {
        return {
            schema: {
                properties: {
                    protected: {
                        method,
                        permissioWn: permission || 1
                    }
                }
            }
        }
    }
}