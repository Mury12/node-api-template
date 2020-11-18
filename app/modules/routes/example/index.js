import { create, update, remove, getAll, get } from './example.js'

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
  router.get('/', getAll);
}
