const moment = require('moment');
const authorizationCheck = (input) => {
    let authorization = "chongkahwai";

    if(input.headers.authorization === undefined || input.headers.authorization != authorization){
        return {
            "status" : false,
            "msg" : "Unauthorized access."
        };
    }

    return {
        "status" : true,
    };
}

const logging = async (input, output) => {
    try {
        let db = input.db;
        let respondedDatetime = moment().format("YYYY-MM-DD HH:mm:ss");
        return await new Promise((resolve,reject) => {
            let loggingSql = "INSERT INTO log_saga (apiname, ip_address, input, response, created, responded_at) VALUES (?,?,?,?,?,?)"; 
            db.query(loggingSql , [input.url, input.ip, JSON.stringify(input.body), JSON.stringify(output), input.startTime, respondedDatetime], (err, data) =>{
                if(err){
                    return resolve({
                        "status" : false,
                        "msg" : err.message
                    })
                }

                return resolve({
                    "status" : true,
                })
            })
        })
        
    }
    catch(e){
        return {
            "status" : false,
            "msg" : e.msg
        }
    }
}

module.exports = {
    authorizationCheck,
    logging
};