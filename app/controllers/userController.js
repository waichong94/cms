exports.viewAdmins = (req,res) => {
    let params = req.body;
    res.send("View admins..." + params.admin);
}

exports.editAdmin = (req,res) => {
    let params = req.body;
    res.send("Edit admins..." + params.admin);
}

exports.updateAdmin = (req,res) => {
    let params = req.body;
    res.send("Update admins..." + params.admin);
}

exports.addAdmin = (req,res) => {
    let params = req.body;
    res.send("Add admins..." + params.admin);
}