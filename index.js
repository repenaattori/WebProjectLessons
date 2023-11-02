require('dotenv').config();
const express = require('express');
const userRoute = require('./routes/user');
const cors = require('cors');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

//Routes
app.use('/user', userRoute );


const PORT = process.env.PORT || 3001;

app.listen(PORT, function(){
    console.log('Server running on port ' + PORT);
} );

app.get('/', (req, res) => {

    const persons = [
        { fname: 'Reima', lname: 'Riihimäki', age: 23},
        { fname: 'Liisa', lname: 'Ihmemaa'},
        { fname: 'John', lname: 'Doe'},
    ];

    res.json(persons);
});


app.post('/info' ,(req,res) => {

    console.log(req.body.username);
    console.log(req.body.pw);

    res.send('Post working');
});