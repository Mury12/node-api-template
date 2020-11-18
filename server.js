// Dependencies
import fastify from 'fastify';
import cookie from 'fastify-cookie';
import cors from 'fastify-cors'
import jwt from './app/config/jwtconfig'
import meh from './app/modules/util/meh.json';
// Routers
import { log } from './app/modules/routes/logger/index.js';
import { user, auth } from './app/modules/routes/user/index.js';

// Services
import { Logger } from './app/modules/services/Logger.js';

// Middlewares
import { ActionLogger } from './app/modules/middleware/ActionLogger.js';
import { ErrorLogger } from './app/modules/middleware/ErrorLogger.js';
import { SessionChecker } from './app/modules/middleware/SessionChecker.js';
import { config } from './app/config/config.js';


const logger = new Logger('error', '/');
process.setMaxListeners(15)

/**
 * Mounts the server
 * 
 * @returns {FastifyInstance} app
 */
async function mount() {

  const app = fastify({
    logger: config.env === 'dev'
  })

  await app.register(cors, {
    methods: 'HEAD, OPTIONS, PUT, POST, PATCH, GET, DELETE',
    allowedHeaders: 'content-type, authorization, x-usr-addr',
    credentials: true,
    maxAge: 1000 * 60 * 24,
    origin: '*',
  });

  await jwt(app);

  await app.register(cookie);

  /**
   * This hooks acts as middlewares performing
   * actions on each one of these calls
   * -----
   * Logs route actions
   */
  if (config.logging)
    app.addHook('onRequest', ActionLogger)

  /** Checks if session is valid */
  app.addHook('onRequest', async (req, res) => {
    await SessionChecker(req, res, app);
  });

  /** Log errors */
  app.addHook('onError', ErrorLogger);

  /** register routers */
  app.options('*', (req, res) => res.code(204).send());

  app.get('/', function (req, res) {
    let rand = ((Math.random() * meh.length) % (meh.length - 1)).toFixed(0);
    console.log(rand)
    res.send(meh[rand]);
  });

  await app.register(log);
  const promises = [
    app.register(log, { prefix: 'ws/v2/log' }),
    app.register(user, { prefix: 'ws/v2/user' }),
    app.register(company, { prefix: 'ws/v2/company' }),
    app.register(auth, { prefix: 'ws/v2/auth' }),
  ];

  await Promise.all(promises);

  return app;
}

/** Server start */
mount().then((app) => {
  app.listen(3000, '0.0.0.0', (error, addr) => {
    if (error) {
      if (config.logging) {
        logger.setData(error.message);
        logger.save();
      }
      process.exit(1);
    }
  })
});
