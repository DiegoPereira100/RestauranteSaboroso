var conn = require('./db');

module.exports = {

    render(req, res, error, sucess) {

        res.render('contacts', {title: 'Contact - Restaurante Saboroso!', background: 'images/img_bg_3.jpg', h1: 'Diga um oi!', body: req.body, error, sucess });

    },

    save(fields) {

        return new Promise((resolve, reject)=>{

            conn.query(`

        insert into tb_contacts (name, email, message) values
        (?, ?, ?)

    `, [
            fields.name,
            fields.email,
            fields.message
        ], (err, results)=>{

            if(err) {

                reject(err);

            }else {

                resolve(results);

            }

            });

        });

    },

    getContacts(){

        return new Promise((resolve, reject) => {

            conn.query(`SELECT * FROM tb_contacts ORDER BY register DESC
            `,(err, results)=>{

                if (err) {

                    reject(err);

                }

                resolve(results);

            });

        });
    },

    delete(id){

        return new Promise((resolve, reject)=>{

            conn.query(`DELETE FROM tb_contacts WHERE id = ?`,[

                id

            ], (err, results) =>{

                if (err) {
                    
                    reject(err);

                }else {

                    resolve(results);

                }

            });

        });

    }

};