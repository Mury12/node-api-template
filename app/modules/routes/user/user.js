import { UserController } from '../../controller/UserController.js'
import moment from 'moment';

/**
 * Requests to authenticate
 * @param {*} req 
 * @param {*} res 
 */
export const login = async (req, res) => {
  const { username, password } = req.body

  const uc = new UserController({ username, password });
  const result = await uc.login();

  if (result.success) {
    const token = await res.jwtSign({
      uid: result.data.id,
      uem: result.data.email,
      unm: result.data.username,
      exp: moment.utc().add(1, 'day').unix()
    });
    result.data.token = token;
    res.setCookie('token', token, {
      secure: false, httpOnly: true
    })
      .send({ ...result })
  }
  else res.code(401).send(result);
}

/**
 * Requests to logout
 * @param {*} req 
 * @param {*} res 
 */
export const logout = async (req, res) => {
  respond()
}

/**
 * Requests to create a new user
 * @param {*} req 
 * @param {*} res 
 */
export const create = async (req, res) => {
  const {
    username, email, password, role
  } = req.body;

  const uc = new UserController({
    username, email, password, role
  });
  const result = await uc.create();

  if (result.success) res.send(result)
  else res.code(422).send(result);
}

/**
 * Requests to update an user
 * @param {*} req 
 * @param {*} res 
 */
export const update = async (req, res) => {
  const {
    username, email, password, role
  } = req.body;
  const { id } = req.params

  const uc = new UserController({
    id, username, email, password, role
  });
  const result = await uc.update();

  if (result.success) res.send(result);
  else res.code(422).send(result);
}

/**
 * Requests to remove an user
 * @param {*} req 
 * @param {*} res 
 */
export const remove = async (req, res) => {
  const { id } = req.body;

  const uc = new UserController({ id });
  const result = await uc.remove();
  if (result.success) res.send(result);
  else res.code(422).send(result, true)
}

/**
 * Gets all users from the database
 * @param {*} req 
 * @param {*} res 
 */
export const getAll = async (req, res) => {
  const {
    page, amount
  } = req.params;

  const uc = new UserController({
    page: Number(page), amount: Number(amount)
  });

  const result = await uc.getAll();

  if (result.success) res.send(result);
  else res.code(500).send('Error getting users');
}

/**
 * Gets user info from database.
 * @param {*} req 
 * @param {*} res 
 */
export const get = async (req, res) => {
  const { id } = req.params;

  const uc = new UserController({ id });
  const result = await uc.getOne();

  if (result.success) res.send(result);
  else res.code(422).send(result);
}
