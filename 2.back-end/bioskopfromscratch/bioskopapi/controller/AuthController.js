const hashpassword = require('./../helper/encrypt')
const {db} = require('./../connection')
const {createJWTToken}=require('./../helper/jwt')

module.exports={
    Authlogin:(req,res)=>{
        const {id} = req.params
        const {username, password}=req.query
        if (req.query.username && req.query.password) {
            // var encryptpass=hashpassword(password)
            var sql = `select * from users where username=${username} and password=${password}`
            db.query(sql,(err,result)=>{
                if (err) res.status(500).send({status:'error',err})
                const token=createJWTToken({userid:result[0].id, username:result[0].username})
                console.log(token)
                return res.status(200).send(result)
            })
        } else if (id) {
            var sql = `select * from users where id=${id}`
            db.query(sql, (err, result) => {
                if (err) res.status(500).send({ status: 'error', err })
                const token = createJWTToken({ userid: result[0].id, username: result[0].username })
                // console.log(token)
                return res.status(200).send(result)
            })
        }
    },
    register:(req,res)=>{
        
    }
}