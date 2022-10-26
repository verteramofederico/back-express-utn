let newsModels = require('../../models/newsModels')
let usersModels = require('../../models/usersModels')
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");

let util = require('util')
let cloudinary = require('cloudinary').v2

const destroy = util.promisify(cloudinary.uploader.destroy)

module.exports = { 
    async getNews (req, res) {
        let news = await newsModels.getNews()
        news = news.map(thisNew => {
            if (thisNew.img_id) {
                const image = cloudinary.url(thisNew.img_id, { 
                    width: 460,
                    height: 300,
                    crop: 'fill'
                })
                console.log(image);
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
        res.status(200).json(news)
        },
    async Login (req, res) {
        try { 
            let user = req.body.user
            let password = req.body.password
            var data = await usersModels.getUserbyUsernameAndPassword(user, password);

            if (data != undefined) {
                req.session.id_user = data.id;
                req.session.name = data.name;
                // res.status(200).json(data)

            // jwt
            const payload = { id: data.id, name: data.name }
            jwt.sign(
                payload,
                process.env.SIGNATURE_TOKEN,
                { expiresIn: 86400 },
                (error, token) => {
                    if (error) {throw error, console.log(error)};
                    return res.status(201).json({ token, name: data.name, id: data.id })
                }) 
            }
            else {
                let errorMessage = {mensaje: 'credenciales incorrectas'}
                res.status(200).json(errorMessage)
            }           
        } catch (e) {
            console.log(e)
            res.status(500).send({ Error: e })
        }
    }, async Contact (req, res) {
        const mail = {
            to: 'verteramo.federico@gmail.com',
            subject: "Contacto web restaurant UTN",
            html: `${req.body.nombre} quiere mas informacion al correo:
            ${req.body.email} <br> 
            ${req.body.mensaje}`
        }  
        const transport = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        })
        await transport.sendMail(mail)
        res.status(201).json({
            error: false,
            message: "mensaje enviado"
        })
    }, async modifyNewById (req, res) {
        console.log(req.body)
        try {    
            let img_id = req.body.img_original
            let delete_img_old = false
            if (req.body.img_delete === '1') {
                img_id = null
                delete_img_old = true
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
            const data = await newsModels.modifyNewById(obj, req.body.id);
            res.status(201).json(data)
        }
        catch (Error) {
            console.log(Error, "error catch")
            res.render('modify', { 
                error: true, 
                message: 'No se modifico la novedad' 
            })
        }
    },  async Test (req, res) {
        res.status(200).json("ESTA INFORMACION ES ENVIADA DESDE EL BACK LUEGO DE CHEQUEAR EL TOKEN CON JWTTOKEN.")
    }
}