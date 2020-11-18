import { config } from '../../../config/config.js';
import { respond } from '../../util/respond.js';
import { login, logout, create, update, remove, getAll, get } from './user.js'

/**
 * Exports the users actions routes.
 * @param {*} router 
 * @param {*} options 
 */
export const user = async (router, options) => {
  router.get('/:id', get);
  router.put('/:id', update);
  router.delete('/:id', remove);
  router.post('/', create);
  router.get('/:page/:amount', getAll);
  router.get('/', config.route('jwt', 10), getAll);
}

/**
 * User's authentication routes
 * @param {*} router 
 * @param {*} options 
 */
export const auth = async (router, options) => {
  router.post('/', login);
  router.patch('/', logout);
  router.get('/', config.route('jwt', 1), (req, res) => {
    res.send(respond('ok'));
  });
}