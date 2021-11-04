const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs')
let app = express();
let router = express.Router();

let dataPath = path.join(__dirname, 'form-submissions.json');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use('/', (req, res, next) => {
    console.log(req.url)
    next();
})

app.post('/formsubmissions', (req, res, next) => {
    // console.log(req.body.name)
    // console.log(req.body.email)

    fs.readFile(dataPath, (err, data) => {
        if (err) throw err;
        let submissions = JSON.parse(data)
        submissions.push(req.body)
        fs.writeFile(dataPath, JSON.stringify(submissions), err => { if (err) throw err });
    });
    next();
    
    res.send('Thank you for submitting!')
})

app.use(express.static(path.join(__dirname, '../public')))

app.use(router)

app.listen(3000)