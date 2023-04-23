

exports.view = async (params,db) => {
    return await new Promise((resolve, reject) => {
        let sql = "SELECT * FROM users";
        db.query(sql, (err, data) => {
            if (err) throw err;
            resolve(
                {"status" : true,
                data}
            )
        })
    });
    
}

exports.edit = async (params,db) => {
    return await new Promise((resolve, reject) => {
        let sql = "SELECT * FROM users WHERE id = ?";
        db.query(sql, [params['user_id']], (err, data) => {
            if (err) throw err;
            resolve(
                {"status" : true,
                data}
            )
        })
    });
}

exports.update = async (params,db) => {
    return await new Promise((resolve, reject) => {
        let sql = "UPDATE users SET name = ? WHERE id = ?";
        db.query(sql, [params['name'], params['user_id']], (err, data) => {
            if (err) throw err;

            if(data.changedRows == 0){
                return resolve(
                    {
                        "status" : false,
                        "msg" : "No changes."
                    }
                )
            }
            return resolve(
                {
                    "status" : true,
                    "msg" : "Success"
                }
            )
        })
    });
}

exports.add = async (params,db) => {
    try{
        return await new Promise((resolve, reject) => {
            let sql = "INSERT INTO users (username, password, name, mobileno) VALUES (?, ?, ?, ?)";
            db.query(sql, [params['username'], params['password'], params['name'], params['mobileno']], (err, data) => {
                if (err) {
                    return resolve(
                        {
                            "status" : false,
                            "msg" : err.message
                        }
                    )
                }
    
                if(data.affectedRows == 0){
                    return resolve(
                        {
                            "status" : false,
                            "msg" : "No changes."
                        }
                    )
                }
                return resolve(
                    {
                        "status" : true,
                        "msg" : "Success",
                    }
                )
            })
        });
    }catch(e){
        return {
            "status" : false,
            "msg" : err.msg
        }
    }
   
}