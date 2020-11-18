import { respond } from "../util/respond.js";
import { tryCatch } from "../util/tryCatch.js";
import bcrypt from 'bcrypt';
import db from "../models/index.js"
const { User } = db.sequelize.models;

/**
 * This is the user controller class.
 * Do all the user's functions such as
 * authenticate, logout, CRUD functions
 * or processing.
 * 
 * @param {any} data User data 
 * 
 * @author Code Squadi
 * @version 0.1.0-alpha
 * 
 * ----
 * Example Usage
 * 
 * const uc = new UserController({username: 'John', password: 'm&69H13'});
 * 
 * if(await uc.login().success) {...}
 * 
 */
export class ExampleController {
  data = null;
  defaultAttrs = ['id', 'username', 'email', 'role', 'status'];
  constructor(data) {
    if (data) {
      this.data = {};
      Object.keys(data).map((item) => {
        if (data[item]) {
          this.data[item] = data[item];
        }
      });
    }
  }

  /**
   * Creates an user into the database
   * 
   * Property data MUST be defined to perform
   */
  async create() {
    if (!this.data)
      throw 'Property "data" must not be null.';
    if (await this.checkPropExists({ username: this.data.username }))
      return respond('Username already in use.', true);
    if (await this.checkPropExists({ email: this.data.email }))
      return respond('E-mail already in use.', true);

    const result = await tryCatch(User, 'create', this.data);
    if (result) {
      const { id, username, email } = result;
      return respond({ id, username, email });
    }
    return respond('Error creating user.', true);
  }

  /**
   * Updates an user using its id
   * 
   * Property data MUST be defined
   */
  async update() {
    if (!this.data) throw 'Property "data.id" must not be null.';
    if (!this.data.id) return respond('Property "id" must not be null.', true)

    const attributes = this.getAttributeNames();

    if (!await this.checkPropExists({ id: this.data.id, email: this.data.email, username: this.data.username }))
      return respond('User not found.', true);

    const result = await tryCatch(User, 'update', [
      { ...this.data }, {
        attributes,
        where: { id: this.data.id }
      }
    ]);

    if (result) return respond('Update successful.');
    return respond('Update failed.', true);


  }

  /**
   * Removes an user from the database
   * 
   * Property data MUST be defined with its id
   */
  async remove() {
    if (!this.data) throw 'Property "data" must not be null.';
    if (!this.data.id) return respond('User id must not be null');

    if (!await this.checkPropExists({ id: this.data.id })) return respond('User not found.', true);

    const result = await tryCatch(User, 'destroy', {
      where: {
        id: this.data.id
      }
    });

    if (result) return respond('ok');
    else return respond('Error removing user.', true);
  }

  /**
   * Get all users in the database
   */
  async getAll() {
    const result = await tryCatch(User, 'findAll', {
      attributes: this.defaultAttrs
    });
    return respond(result);
  }
  /**
   * Get all users in the database
   * 
   * Property data must be defined with its id
   */
  async getOne() {
    const result = await tryCatch(User, 'findOne', {
      attributes: this.defaultAttrs,
      where: {
        id: this.data.id
      }
    });
    if (result) return respond(result);
    return respond('User not found', true);
  }

  /**
   * Gets data Attribute names in an array
   * @returns string[]
   */
  getAttributeNames() {
    return Object.keys(this.data).filter((item) => this.data[item]);
  }

  /**
   * Check if a property value exists in the database and
   * return its register.
   * @param {Object} props 
   */
  async checkPropExists(model, props) {
    if (!props || model) throw 'Properties "props" must not be null';

    const result = await tryCatch(User, 'findOne', {
      where: { ...props }
    });

    return result;
  }
}