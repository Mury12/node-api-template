import db from "../models/index.js"

/**
 * Validates user session
 * @param {*} req 
 * @param {*} res 
 */
export const SessionChecker = async (req, res, app) => {
  if (req.raw.method === 'OPTIONS') return true;

  const { authorization } = req.headers;

  try {
    let _protected = false;
    if (
      req.context.schema
      && req.context.schema.properties
      && req.context.schema.properties.protected
      && req.context.schema.properties.protected.method
    ) _protected = req.context.schema.properties.protected;
    if (_protected) {
      if (!authorization) {
        res.code(401).send('Unauthorized');
        return;
      }
      switch (_protected.method) {
        case 'jwt':
          await req.jwtVerify();
          const token = app.jwt.decode(authorization.replace('Bearer ', ''));
          req.session = {
            ...req.body,
            userId: token.uid,
            email: token.uem,
            username: token.unm,
          };
          break;
      }
    }
  } catch (err) {
    res.code(401).send(err);
    throw err;
  }
}