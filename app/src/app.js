const express = require("express");
const path    = require("path");
const db      = require("./static/js/dbconnector.js");

var bodyParser = require('body-parser');

const influxdb = require("./static/js/influxdb-connector.js");

const app = express();

const tableRoute = require('./routes/tableRouter.js')
const guageRoute = require('./routes/guageRouter.js')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/public', express.static(path.join(__dirname, './static')));

app.use('/users', tableRoute);
app.use('/temp', guageRoute);

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phoneNumber VARCHAR(20) NOT NULL,
        minTemp INT NOT NULL,
        maxTemp INT NOT NULL
    );
`;

db.query(createTableQuery, (err, result) => {
    if (err) {
        console.error("Error creating 'users' table:", err);
    } else {
        console.log("Table 'users' created or already exists.");
    }
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "static", "index.html"));
})

const port = process.env.PORT || 3000

app.get('/delete', (req, res) => {

});

app.post('/delete', (req, res) => {
    const id = req.body.idValue;
    console.log("getting here");
    db.query('DELETE FROM users WHERE id = $1', [id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        };
    });

})
 
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

app.get('/submit-form', (req, res) => {
});  

app.post('/send-temp', (req, res) => {  
    const temp = req.body.temp;
    console.log("Temperature: " + temp);
    influxdb.writeTemp(temp);
    res.redirect('/');
});

app.post('/submit-form', (req, res) => {
    const username = req.body.name;
    const number = req.body.number; 
    const minTemp = req.body.minTemp;
    const maxTemp = req.body.maxTemp;
    console.log("Username: " + username);
    console.log("Password: " + number);
    db.query('INSERT INTO users (name, phonenumber, mintemp, maxtemp) VALUES ($1, $2, $3, $4)', [username, number, minTemp, maxTemp], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    }); 
})

