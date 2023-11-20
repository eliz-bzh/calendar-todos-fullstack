const { Driver } = require('../models');

exports.getAll = (req, res) => {
    Driver.findAll().then((data)=>{
        res.status(200).send(data);
    }).catch(e=>console.log(e));
}

exports.create = (req, res) => {
    const { name } = req.body;
    Driver.findOrCreate({
        where: { name },
        defaults: { name }
    }).then((data)=>{
        if(data[1])
            res.status(200).send('Create driver!');
        res.sendStatus(500);
    }).catch(e=>console.log(e))
}

exports.delete = (req, res) => {
    const { id } = req.params;
    Driver.destroy({
        where: { id }
    }).then(data=>{
        if(data)
            res.status(200).send('Deleted!')
        res.sendStatus(500);
    }).catch(e=>console.log(e))
}