require('dotenv').config()
const jwt = require('jsonwebtoken')
//Gets the secret from the env file
const {SECRET} = process.env

module.exports = {
//Is able to authorize user
    isAuthenticated: (req, res, next) => {
        const headerToken = req.get('Authorization')
//Unable to recieve the valid authorization
        if (!headerToken) {
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }

        let token

        try {
            token = jwt.verify(headerToken, SECRET)
        } catch (err) {
//Will return an error due to user error            
            err.statusCode = 500
            throw err
        }

        if (!token) {
            const error = new Error('Not authenticated.')
//Error code used for authorization required
            error.statusCode = 401
            throw error
        }

        next()
    }
}