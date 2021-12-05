const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const Machine = require('./models/machspecs');
const fs = require('fs');


//express app
const app = express();

//connect to mongodb and listen for requests
const dbURI = 'mongodb+srv://chedly-user:azerty@joe.smy5x.mongodb.net/appdb?retryWrites=true&w=majority'

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true} )
    .then((result) => {
        app.listen(5000);
        console.log('connected to db');
    })
    .catch((err) => {
        console.log(err);
    })

//register view engine
app.set('view engine', 'ejs');


//middleware and static files
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));


//routes
app.get('/', (req, res) => {
    res.redirect('/welcome')
})
app.get('/welcome', (req, res) => {
    res.render('welcome');
})
app.get('/generate', (req, res) => {
    res.render('generate')
})
app.get('/thanks', (req, res) => {
    res.render('thanks')
})
app.post('/thanks', (req, res) => {
    const machine = new Machine(req.body);
    console.log(req.body.machineName, req.body.machineDistro, req.body.machineRam);


    let vagrantfile = './vagrantfile';
    if (fs.existsSync(vagrantfile)){
        console.log("FILE EXISTS");
        fs.unlink(vagrantfile, err => console.log(err));
    }  
      
    fs.appendFile('./vagrantfile', `Vagrant.configure("2") do |config|`, err => console.log(err));
    fs.appendFile('./vagrantfile', req.body.machineDistro, (err) => {
        if(err) throw err;
        console.log('updated!');
    })
    
    
    const file = `${__dirname}/vagrantfile`;
    console.log(__dirname);
    res.download(file); 
    

    machine.save()
        .then((result) => {
            res.redirect('/thanks');
        })
        .catch((err) => {
            console.log(err);
        })
})

    /*-----------------------------------------------------------
    just trying to test how to write in the database
    
const Test = mongoose.model('test' , new mongoose.Schema({name: String}));

const bruh = new Test({name: 'chedly'});

bruh.save((err) => {
    if(err) {
        console.log('bruh moment for sure');
    }
}) */