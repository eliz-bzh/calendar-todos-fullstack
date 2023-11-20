const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const port = process.env.PORT || 3001;
const db = require('./models');
const cookieSession = require('cookie-session');
const { userRoutes, driverRoutes, todoRoutes } = require('./routes');

app.use(cookieSession({
    name: 'session',
    keys: ['privet liz'],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//connect static
app.use(express.static(path.join(__dirname, '/../frontend/build')));


app.get('/not_authorized', function (request, response) {
    response.render('/login');
});

app.get('/', (req, res, next) => {
    if(req.session.user) {
        return res.status(200).send('Authorized');
    }else{
        return res.status(401).send('Unauthorized');
    }
})

app.use('/api/users', userRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/todos', todoRoutes);


//add static files with working routes
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/../frontend/build/index.html'));
});

db.sequelize.sync().then(()=>{
    app.listen(port, ()=>{
        console.log(`Server running on port: ${port}`);
    });
}).catch((e)=>console.log(e));