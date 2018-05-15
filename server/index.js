var express = require('express');
var mysql = require('mysql');

var app = express();

const PORT = process.env.PORT || 5000;

var connection = mysql.createConnection({
    host     : 'dev.spatialdatacapture.org',
    user     : 'ucfnssa',
    password : 'nohagepucu',
    database : 'ucfnssa'
});
 
connection.connect(err => {
    if (err) {
        console.log(err);
    }
});

app.use(express.static('../client/'))

app.get('/', (req, res) => {
    res.sendFile('index.html')
});

app.get('/get/:geoid', (req, res) => {
    connection.query('SELECT * FROM ucfnssa.blocks2 WHERE tract=' + req.params.geoid + ';', function (error, results, fields) {
        if (error) {
            console.log(error);
        }
        console.log(results[0]);
        res.json(results[0]);
      });
})

/*******************************
 * CENSUS ENDPOINT             *
 ******************************/
app.get('/census', (req, res) => {
    connection.query('SELECT * FROM ucfnssa.blocks2;', function (error, results, fields) {
        if (error) {
            console.log(error);
        }
        console.log(results);
        res.json(results);
      });
});

app.get('/census/population', (req, res) => {

    connection.query('SELECT TotalPop, Men, Women, Tract FROM ucfnssa.blocks2;', function (error, results, fields) {
        if (error) {
            console.log(error);
        }
        console.log(results);
        res.json(results);
      });
});

app.get('/census/ethnicity', (req, res) => {

    connection.query('SELECT Hispanic, White, Black, Asian, Native, Tract FROM ucfnssa.blocks2;', function (error, results, fields) {
        if (error) {
            console.log(error);
        }
        console.log(results);
        res.json(results);
      });

});

app.get('/census/income', (req, res) => {

    connection.query('SELECT Income, Tract FROM ucfnssa.blocks2;', function (error, results, fields) {
        if (error) {
            console.log(error);
        }
        console.log(results);
        res.json(results);
      });

});

app.get('/census/unemployment', (req, res) => {
    connection.query('SELECT Unemployment, Tract FROM ucfnssa.blocks2;', function (error, results, fields) {
        if (error) {
            console.log(error);
        }
        console.log(results);
        res.json(results);
      });

});

/*******************************
 * TAXI                        *
 ******************************/
app.get('/taxi', (req, res) => {

});

/*******************************
 * HOSPITALS                   *
 ******************************/
app.get('/hospitals', (req, res) => {

    connection.query('SELECT Unemployment, Tract FROM ucfnssa.blocks2;', function (error, results, fields) {
        if (error) {
            console.log(error);
        }
        console.log(results);
        res.json(results);
      });
});


var server = app.listen(PORT, _ => {
    console.log('Server listening on port: ', PORT);
});