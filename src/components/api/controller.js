let newsModels = require('../../models/newsModels')
let usersModels = require('../../models/usersModels')
const jwt = require('jsonwebtoken')


let cloudinary = require('cloudinary').v2

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
    },  async Test (req, res) {
        res.status(200).json("ESTA INFORMACION ES ENVIADA DESDE EL BACK LUEGO DE CHEQUEAR EL TOKEN CON JWTTOKEN.")
    }
}