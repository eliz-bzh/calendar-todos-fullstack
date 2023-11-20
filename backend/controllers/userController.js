const { User } = require('../models');
const bcrypt = require('bcrypt');

const generateHash = (password) => {
    return new Promise(resolve => {
      bcrypt.hash(password, 10, function (err, hash) {
        // Store hash in your password DB.
        resolve(hash);
      });
    });
  }

const checkPasswordHash = (password, hash) => {
return new Promise(resolve => {
    bcrypt.compare(password, hash, function (err, result) {
    // Store hash in your password DB.
    resolve(result);
    });
});
}


const verifyUser = async (login, password) => {
    const potentionalUser = await User.findOne({ where: { login: login } });
    if (potentionalUser) {
        const isTruePassword = await checkPasswordHash(password, potentionalUser.password);
        if (isTruePassword) {
        return potentionalUser;
        }
    }
    return null;
}
  
  

exports.getAll = (req, res) => {
    User.findAll().then(data => {
        res.status(200).send(data);
    }).catch(e=>console.log(e));
}

exports.create = async (req, res) => {
    const { name, role, login, password } = req.body;
    const hash = await generateHash(password);
    User.findOrCreate({
        where: { login },
        defaults: { name, role, password: hash }
    }).then((data)=>{
        if(data[1])
            res.status(200).send('Created new user!');
        res.sendStatus(400).send('User with this login already exists')
    }).catch(e=>console.log(e))
}

exports.login = async (req, res) => {
    const { login, password } = req.body;
    const user = await verifyUser(login, password);
    if (user) {
      //token
      req.session.user = user;
      res.send('ok')
      return;
    }
    res.sendStatus(403);
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