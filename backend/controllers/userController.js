const { User } = require('../models');

exports.getAll = (req, res) => {
    User.findAll().then(data => {
        res.status(200).send(data);
    }).catch(e=>console.log(e));
}

exports.create = (req, res) => {
    const { name, role, login, password } = req.body;
    User.findOrCreate({
        where: { login },
        defaults: { name, role, password }
    }).then((data)=>{
        if(data[1])
            res.status(200).send('Created new user!')
        res.sendStatus(500)
    }).catch(e=>console.log(e))
}

exports.delete = (req, res) => {
    const { id } = req.params;
    User.destroy({
        where: { id }
    }).then((data)=>{
        if(data)
            res.status(200).send('Deleted!')
        res.sendStatus(500)
    }).catch(e=>console.log(e))
}