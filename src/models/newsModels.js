var pool = require('../database')

async function getNews() {
    try {
        var query = 'select * from news order by id desc';
        var rows = await pool.query(query);
        return rows;
    } catch (e) {
        throw e
    }
}

async function insertNews(obj) {
    try {
        var query = 'insert into news set ?';
        var rows = await pool.query(query, [obj]);
        return rows;
    } catch (e) {
        console.log(e)
        throw e
    }
}

async function deleteNewById(id) {
    try {
        var query = 'delete from news where id = ?';
        var rows = await pool.query(query, [id]);
        return rows;
    } catch (e) {
        console.log(e)
        throw e
    }
}

async function getNewById(id) {
    try {
        var query = 'select * from news where id = ?';
        var rows = await pool.query(query, [id]);
        return rows[0];
    } catch (e) {
        console.log(e)
        throw e
    }
}

async function modifyNewById(obj,id) {
    try {
        var query = 'update news set ? where id = ?';
        var rows = await pool.query(query, [obj, id]);
        return rows;
    } catch (e) {
        console.log(e)
        throw e
    }
}

module.exports = { getNews, insertNews, deleteNewById, getNewById, modifyNewById };