module.exports = { 
    async Index (req, res) {
        try {
            res.status(200).render('index', { title: 'Backend web FV', body: req.session.nombre })
        } catch (Error) {
            res.status(500).send({ Error: 'Something has gone wrong' })
        }
}
}
