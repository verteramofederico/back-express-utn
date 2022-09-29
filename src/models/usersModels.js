var pool = require('../database')
var md5 = require('md5')

async function getUserbyUsernameAndPassword(name, password) {
    try {
        var query = 'select * from users where name = ? and password = ? limit 1';
        var rows = await pool.query(query, [name, md5(password)]);
        console.log(rows, 'console log rows')
        return rows[0];
    } catch (e) {
        throw e
    }
}

module.exports = { getUserbyUsernameAndPassword }