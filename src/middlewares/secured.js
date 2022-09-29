secured = async(req, res, next) => {
    try {
        if (req.session.id_user) {
            next();
        } else {
            res.redirect('/admin/login')
        }
    } catch (err) {
        console.error(err)
    }
}

module.exports = secured 