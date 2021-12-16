var conn = require('./db');

module.exports = {

    render(req, res, error, sucess){

        res.render('reservations', {title: 'Reservation - Restaurante Saboroso!', background: 'images/img_bg_2.jpg', h1: 'Reserve uma Mesa!', body: req.body, error, sucess });

    },

    save(fields){

        return new Promise((resolve, reject)=>{

            if (fields.date.indexOf('/') > -1) {

                let date = fields.date.split('/');
                fields.date = `${date[2]}-${date[1]}-${date[0]}`;

            }

            let query, params = [

                fields.name,
                fields.email,
                fields.people,
                fields.date,
                fields.time
            ];

            if (parseInt(fields.id) > 0 ) {

                query = `UPDATE tb_reservations
                        SET
                            name = ?,
                            email = ?,
                            people = ?,
                            date = ?,
                            time = ?
                        WHERE id =?
                        `;

                params.push(fields.id);

            }else {

                query = `

                insert into tb_reservations (name, email, people, date, time) 
                VALUES (?, ?, ?, ?, ?)
                
                `;
        
            }

            conn.query(query, params, (err, results) =>{

            console.log(err);

            if(err) {

                reject(err);

            }else {

                resolve(results);

            }

            });

        });
    },

    delete(id){

        return new Promise((resolve, reject)=>{

            conn.query(`DELETE FROM tb_reservations WHERE id = ?`,[

                id

            ], (err, results) =>{

                if (err) {
                    
                    reject(err);

                }else {

                    resolve(results);

                }

            });

        });

    },

    getReservations(){

        return new Promise((resolve, reject) => {

            conn.query(`SELECT * FROM tb_reservations ORDER BY date DESC
            `,(err, results)=>{

                if (err) {

                    reject(err);

                }

                resolve(results);

            });

        });
    }

};