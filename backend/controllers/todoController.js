const { Todo } = require('../models');

exports.getAll = (req, res) => {
    Todo.findAll().then(data=>{
        res.status(200).send(data);
    }).catch(e=>console.log(e));
}

exports.create = (req, res) => {
    const { todo, adress, dateStart, dateEnd, description, allDay, driver_id, user_id } = req.body;
    Todo.create({ todo, adress, dateStart, dateEnd, description, allDay, driver_id, user_id })
    .then((data)=>{
        res.status(200).send('Created new todos!')
    }).catch(e=>console.log(e))
}

exports.delete = (req, res) => {
    const { id } = req.params;
    Todo.destroy({
        where: { id }
    }).then((data)=>{
        if(data)
            res.status(200).send('Deleted!')
        res.sendStatus(500)
    }).catch(e=>console.log(e))
}