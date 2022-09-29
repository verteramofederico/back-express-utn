let usersModels = require('../../models/usersModels')

module.exports = { 
    async LoginPage (req, res) {
        try {
            res.status(200).render('login')
        } catch (Error) {
            res.status(500).send({ Error: 'Something has gone wrong' })
        }
},
    async Login (req, res, next) {
        try { 
            let user = req.body.user
            let password = req.body.password
            var data = await usersModels.getUserbyUsernameAndPassword(user, password);

            if (data != undefined) {
                req.session.id_user = data.id;
                req.session.name = data.name;
                res.redirect('/admin/novedades')
            }
            else {
                res.render('login', { 
                    error: true, 
                    message: 'Las credenciales son incorrectas' 
                })
            }           
        } catch (e) {
            res.status(500).send({ Error: e })
        }
    },
    async NewsPage (req, res) {
        try {
            res.status(200).render('news', { 
                user: req.session.name
            })
        } catch (Error) {
            res.status(500).send({ Error: 'Something has gone wrong' })
        }
},
async Logout (req, res) {
    try {
        req.session.destroy();
        res.render('login')
    } catch (Error) {
        res.status(500).send({ Error })
    }
}
}