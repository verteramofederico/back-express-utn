let newsModels = require('../../models/newsModels')

let cloudinary = require('cloudinary').v2

module.exports = { 
    async getNews (req, res) {
        let news = await newsModels.getNews()

        news = news.map(thisNew => {
            if (thisNew.img_id) {
                const image = cloudinary.image(thisNew.img_id, { 
                    width: 960,
                    height: 200,
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
        res.status(200).json(news)
        }
}