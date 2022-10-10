let usersModels = require('../../models/usersModels')
let newsModels = require('../../models/newsModels')

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
        let news = await newsModels.getNews()
        try {
            res.status(200).render('news', {
                news, 
                user: req.session.name
            })
        } catch (Error) {
            res.status(500).send({ Error: 'Something has gone wrong' })
        }
},
async NewsAddPage (req, res) {
    try {
        res.status(200).render('newsAdd')
    } catch (Error) {
        res.status(500).send({ Error: 'Something has gone wrong' })
    }
},
async NewsAddPost (req, res) {
    try {
        if (
            req.body.titulo != "" && 
            req.body.subtitulo != "" &&
            req.body.cuerpo != "" 
        ) {
            await newsModels.insertNews(req.body);
            res.redirect('/admin/novedades')
        } else {
            res.render('newsAdd', {
                error: true, message: 'Todos los campos son obligatorios'
        })}
    } catch (Error) {
        res.status(500).render('newsAdd', {
            error: true, message: 'No se cargo la novedad'
        })
    }
},async getNewById (req, res) {
    let id = req.params.id;
    let newToModify = await newsModels.getNewById(id)
    res.status(200).render('modify', {
        newToModify: newToModify
    })
}, async modifyNewById (req, res) {
    try {
        let obj = {
            title: req.body.title,
            subtitle: req.body.subtitle,
            body: req.body.body
        }
        await newsModels.modifyNewById(obj, req.body.id);
        console.log("ok")
        res.redirect('/admin/novedades')
    }
    catch (Error) {
        console.log(Error, "error catch")
        res.render('modify', { 
            error: true, 
            message: 'No se modifico la novedad' 
        })
    }
}
,
async deleteNewById (req, res) {
    let id = req.params.id;
    await newsModels.deleteNewById(id);
    res.redirect('/admin/novedades')
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