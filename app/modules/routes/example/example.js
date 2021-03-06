import { ExampleController } from "../../controller/ExampleController"

/**
 * GET one row from DB
 * @param {*} req 
 * @param {*} res 
 */
export const get = async (req, res) => {
  const { id } = req.params;

  const ec = new ExampleController({ id });
  const result = ec.get();

  if (result.success) res.send(result);
  else res.code(422).send(result);
}
/**
 * GET all rows from DB
 * @param {*} req 
 * @param {*} res 
 */
export const getAll = async (req, res) => {

}
/**
 * Inserts a new row into DB
 * @param {*} req 
 * @param {*} res 
 */
export const create = async (req, res) => {

}
/**
 * Update a row into DB
 * @param {*} req 
 * @param {*} res 
 */
export const update = async (req, res) => {

}
/**
 * Removes a row from DB
 * @param {*} req 
 * @param {*} res 
 */
export const remove = async (req, res) => {

}