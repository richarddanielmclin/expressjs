const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs')
let app = express();
let router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.post('/formsubmissions', (req, res, next) => {
    console.log(req.body.name)
    console.log(req.body.email)
    fs.writeFile('form-submissions.json', JSON.stringify(req.body), err => { if (err) throw err });
    res.redirect('/form-submissions');
    next();
})

app.get("/form-submissions", (req, res, next) => {
    fs.readFile('form-submissions.json', (err, data) => {
        if (err) throw err;
        let submissions = JSON.parse(data)
        res.send(submissions)
    });
    next();
})

app.use('/', (req, res, next) => {
    console.log(req.url)
    next();
})

app.use(express.static('/public'))

app.use(router)

app.listen(3000)