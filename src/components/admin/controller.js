let usersModels = require('../../models/usersModels')
let newsModels = require('../../models/newsModels')

let util = require('util')
let cloudinary = require('cloudinary').v2

const uploader = util.promisify(cloudinary.uploader.upload)
const destroy = util.promisify(cloudinary.uploader.destroy)

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

        news = news.map(thisNew => {
            if (thisNew.img_id) {
                const image = cloudinary.image(thisNew.img_id, { 
                    width: 100,
                    height: 100,
                    crop: 'fill'
                });
                return {
                    ...thisNew,
                    image
                }
            } else {
                return {
                    ...thisNew,
                    image: ''
                }
            }
        })

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

        var img_id = '';
        if (req.files && Object.keys(req.files).length > 0) {
            image = req.files.image
            img_id = (await uploader(image.tempFilePath)).public_id
        }

        if (
            req.body.titulo != "" && 
            req.body.subtitulo != "" &&
            req.body.cuerpo != "" 
        ) {
            await newsModels.insertNews({
                ...req.body, // title, subt, body
                img_id // image if exist
            });
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

        let img_id = req.body.img_original
        let delete_img_old = false
        if (req.body.img_delete === '1') {
            img_id = null
            delete_img_old = true
        } else {
            if (req.files && Object.keys(req.files).length > 0 ) {
                image = req.files.image
                img_id = (await uploader(image.tempFilePath)).public_id;
                delete_img_old = true
            }
        }
        if (delete_img_old && req.body.img_original) {
            await (destroy(req.body.img_original))
        }

        let obj = {
            title: req.body.title,
            subtitle: req.body.subtitle,
            body: req.body.body,
            img_id
        }
        await newsModels.modifyNewById(obj, req.body.id);
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

    // delete image in external server
    let newToDelete = await newsModels.getNewById(id)
    if (newToDelete.img_id) {
        await (destroy(newToDelete.img_id))
    }

    // delete info in db
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