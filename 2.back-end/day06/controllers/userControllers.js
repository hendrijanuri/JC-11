const { mysqldb } = require('./../connection')
const { uploader } = require('./../helper/uploader')
const fs = require('fs')


module.exports = {
    getUsers: (req, res) => {
        mysqldb.query(`select u.*,r.nama as rolename from users u left join roles r on u.roleid=r.id`, (err, result) => {
            if (err) res.status(500).send(err)
            mysqldb.query('select * from roles', (err, result1) => {
                if (err) res.status(500).send(err)
                res.status(200).send({ datauser: result, datarole: result1 })
            })
        })
    },
    updateUsers: (req, res) => {
        mysqldb.query(`update users set ? where id=${req.params.id}`, req.body, (err, result) => {
            if (err) res.status(500).send(err)
            mysqldb.query(`select u.*,r.nama as rolename from users u left join roles r on u.roleid=r.id`, (err, result1) => {
                if (err) res.status(500).send(err)
                mysqldb.query('select * from roles', (err, result2) => {
                    if (err) res.status(500).send(err)
                    res.status(200).send({ datauser: result1, datarole: result2 })
                })
            })
        })
    },
    postUsers: (req, res) => {
        try {
            const path = '/post/images'; //file save path
            const upload = uploader(path, 'USERS').fields([{ name: 'image' }]); //uploader(path, 'default prefix')

            upload(req, res, (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Upload picture failed !', error: err.message });
                }
                console.log('masuk')
                const { image } = req.files;
                console.log(image)
                const imagePath = image ? path + '/' + image[0].filename : null;
                console.log(imagePath)

                console.log(req.body.data)
                const data = JSON.parse(req.body.data);
                console.log(data)
                data.image = imagePath;
                // data.userId=req.user.userid

                var sql = 'INSERT INTO users SET ?';
                mysqldb.query(sql, data, (err, results) => {
                    if (err) {
                        console.log(err.message)
                        fs.unlinkSync('./public' + imagePath);
                        return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err.message });
                    }

                    console.log(results);
                    mysqldb.query(`select u.*,r.nama as rolename from users u left join roles r on u.roleid=r.id`, (err, result4) => {
                        if (err) res.status(500).send(err)
                        mysqldb.query('select * from roles', (err, result5) => {
                            if (err) res.status(500).send(err)
                            res.status(200).send({ datauser: result4, datarole: result5 })
                        })
                    })
                })
            })
        } catch (err) {
            return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err.message });
        }
    },

    deleteUsers: (req, res) => {
        console.log(req.params)
        let sql = `select * from users where id=${req.params.id}`
        mysqldb.query(sql, (err, result) => {
            if (err) res.status(500).send(err)
            if (result.length) {
                sql = `delete from users where id=${req.params.id}`
                mysqldb.query(sql, (err, result1) => {
                    if (err) res.status(500).send(err)
                    sql = `select * from users`
                    console.log(result1)
                    mysqldb.query(sql, (err, result2) => {
                        if (err) res.status(500).send(err)
                        return res.status(200).send(result2)
                    })
                })
            } else {
                return res.status(500).send({ message: 'nggak ada woy idnya' })
            }
        })
    }
}