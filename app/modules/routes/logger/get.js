import { Logger } from "../../services/Logger.js"

export const get = async (req, res) => {
    const log = new Logger('error', req.path)
    res.send(log.show());
}