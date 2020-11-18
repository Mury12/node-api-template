import fs from 'fs';
import moment from 'moment';

/**
 * Saves logs to a file
 * 
 * @version 0.1.0-alpha
 * @author Andre Mury @Yoobot
 * 
 * ----
 * Example usage:
 * 
 * try {
 * ...
 * 
 * } catch ( error ) {
 * 
 *   const log = new Log('error', req.path, error);
 * 
 *   if ( log.save() ) log.show();
 * 
 * }
 */
export class Logger {
  data = {};
  defaultPath = 'app/logs';
  fullPath = '';
  route = '/';
  file = {
    action: 'actions.json',
    error: 'errors.json',
  };

  constructor(type, route, data, defaultPath) {
    if (!type) throw 'The "type" param is needed.';

    this.data = data ? { meta: { ...data } } : {};
    this.route = route || this.route;
    this.defaultPath = defaultPath || this.defaultPath;

    this.fullPath = `${this.defaultPath}/${this.file[type]}`;
  }


  /**
   * Saves the constructed log
   * 
   * @return {Boolean}
   */
  save() {
    const log = JSON.parse(fs.readFileSync(this.fullPath).toString() || '[]');
    log.push({ ...this.data, time: moment(), route: this.route });

    try {
      fs.writeFileSync(this.fullPath, JSON.stringify(log));
      return true;
    } catch (err) {
      console.log(err);
      return !!!err;
    }
  }

  /**
   * Set log type to action or error
   * @param {string} type 
   */
  setType(type) {
    this.type = type;
    this.fullPath = `${this.defaultPath}/${this.file[type]}`;
    return this;
  }

  /**
   * Append data to the meta tag in log
   * @param {*} data 
   */
  setData(data) {
    this.data = { meta: { ...this.data.meta, ...data } };
    return this;
  }

  clearAll() {
    Object.keys(this.file).map((file) => {
      fs.writeFileSync(`${this.defaultPath}/${this.file[file]}`, '[]');
    });
    this.setData({ action: 'cleared logs' });
    return this;
  }

  /**
   * Returns the complete log file
   * 
   * @return {Array<any>}
   */
  show() {
    const log = JSON.parse(fs.readFileSync(this.fullPath).toString());
    return log;
  }

}