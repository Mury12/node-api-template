import {get} from './get.js'
import {clear} from './clear.js'

/**
 * Exports the log routes
 * @param {*} router 
 * @param {*} options 
 */
export const log = async (router, options) => {
    router.get('/', get);
    router.delete('/', clear);
}