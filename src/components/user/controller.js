module.exports = { 
    async Login (req, res) {
        try {
            res.status(200).render('login')
        } catch (Error) {
            res.status(500).send({ Error: 'Something has gone wrong' })
        }
}
}
