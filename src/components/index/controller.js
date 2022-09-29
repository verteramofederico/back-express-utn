module.exports = { 
    async Index (req, res) {
        try {
            res.status(200).render('index', { title: 'Backend web FV', body: req.session.nombre })
        } catch (Error) {
            res.status(500).send({ Error: 'Something has gone wrong' })
        }
},
    async Login (req, res) {
    try {
        req.session.nombre = "sdffdsdfsfd"
        res.send(process.env.S3_BUCKET)
        //.redirect('/')
    } catch (Error) {
        res.status(500).send({ Error: 'Something has gone wrong' })
    }
},
    async Logout (req, res) {
    try {
        req.session.destroy();
        res.redirect('/')
    } catch (Error) {
        res.status(500).send({ Error: 'Something has gone wrong' })
    }
} 
}
