const userModels = require("../models/Users")

exports.viewAdmins = async (req,res) => {
    let params = req.body;
    let db     = req.db;
    let response = await userModels.view(params, db);
    res.send(response);
}

exports.editAdmin = async (req,res) => {
    let params = req.body;
    let db = req.db;

    if(typeof params['user_id'] === 'undefined' || params['user_id'] == ""){
        return res.send({
            "status" : false,
            "msg" : "Missing parameter user ID."
        });
    }

    let response = await userModels.edit(params, db);
    return res.send(response);
}

exports.updateAdmin = async (req,res) => {
    let params = req.body;
    let db = req.db;

    if(typeof params['user_id'] === 'undefined' || params['user_id'] == ""){
        return res.send({
            "status" : false,
            "msg" : "Missing parameter user ID."
        });
    }

    let response = await userModels.update(params, db);
    res.send(response);
}

exports.addAdmin = async (req,res) => {
    let params = req.body;
    let db = req.db;
    if(typeof params['username'] === 'undefined' || params['username'] == ""){
        return res.send({
            "status" : false,
            "msg" : "Missing parameter Username."
        });
    }
    if(typeof params['password'] === 'undefined' || params['password'] == ""){
        return res.send({
            "status" : false,
            "msg" : "Missing parameter Password."
        });
    }
    if(typeof params['name'] === 'undefined' || params['name'] == ""){
        return res.send({
            "status" : false,
            "msg" : "Missing parameter Name."
        });
    }
    if(typeof params['mobileno'] === 'undefined' || params['mobileno'] == ""){
        return res.send({
            "status" : false,
            "msg" : "Missing parameter Mobileno."
        });
    }
    let response = await userModels.add(params, db);
    res.send(response);
}