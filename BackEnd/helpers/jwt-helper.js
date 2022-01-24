const expressJwt = require('express-jwt'); //lib for check token

function authJwt() {
    const secretKey = process.env.secretKeyToken; // Secret like a password for token
    // Check token pass to server if it was created from this secret, the token generated from other secret will not pass check
    return expressJwt({ // execute disassembling token when user request api
        secret: secretKey, 
        algorithms: ['HS256'], // Algorithms to encoding/disassembling {@link https://jwt.io/}
        isRevoked: isRevoked
    }).unless({//api without token
        path: [
            // {url: 'api/v1/products', methods: ['GET', 'OPTIONS']},

            // Using Regex: .* match anything 
            {url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS']},
            {url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS']},
            {url: /\/api\/v1\/users\/login(.*)/},
            {url: /\/api\/v1\/users\/register(.*)/},
            {url: /\/images\/uploads\/(.*)/}, // alow user read image in images/uploads
        ]
    })
}

/**
 * Callback function, check if user is admin or not
 * @param {*} req: request parameters | request body
 * @param {*} payload: contain data inside the token request header(fiels when sign token in login route) 
 * @param {*} done 
 */
async function isRevoked(req, payload, done) {
    if(!payload.isAdmin) {
        done(null, true)
    }
    done();
}

module.exports = authJwt;