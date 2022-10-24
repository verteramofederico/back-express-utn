const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) return res.status(401).send({ error: 'you dont have authorization' })

    const parts = authHeader.split(' ')

    if (parts.length !== 2)
        return res.status(401).send({ error: 'Token error' })

    const [scheme, token] = parts

    if (!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: 'Token with incorrect format' })

    jwt.verify(token, process.env.SIGNATURE_TOKEN, (err, decoded) => {
        if (err) return res.status(401).send({ error: 'invalid Token' })

    req.userId = decoded.id
    return next()
    })
}