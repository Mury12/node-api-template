import fastify from 'fastify';
import { config } from './config'
import fastifyJWT from 'fastify-jwt';

export default async function jwt(app) {
  if (app) {
    await app.register(fastifyJWT, { ...config.jwt });
    return app;
  }

  app = fastify();
  await app.register(fastifyJWT, { ...config.jwt })
  return app;
}