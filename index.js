var express = require('express');
var mysql = require('mysql2');

var app = express();

const PORT = process.env.PORT || 5000;

var connection = mysql.createPool({
	connectionLimit: 10,
	host     : 'eu-cdbr-west-02.cleardb.net',
	user     : 'ba2d6a75473f25',
	password : '0b4b5035',
	database : 'heroku_6b92845af2eee79'
});

connection.getConnection((err, connection) => {
	if (err) {
		if (err.code === 'PROTOCOL_CONNECTION_LOST') {
			console.log('Database connection was closed.');
		}
		if (err.code === 'ER_CON_COUNT_ERROR') {
			console.error('Database has too many connections.');
		}
		if (err.code === 'ECONNREFUSED') {
			console.error('Database connection was refused.');
		}
	}
	if (connection) {
		console.log('Succesfully connected to database');
		connection.release();
	}
});

app.use(express.static('client/'))

app.get('/', (req, res) => {
	res.sendFile('index.html')
});

app.get('/get/:geoid', (req, res) => {
	connection.query('SELECT * FROM blocks2 WHERE tract=' + req.params.geoid + ';', function (error, results, fields) {
		if (error) {
			console.log('Error in /get/:geoid route: ', error);
		}
		res.json(results[0]);
	});
})

/*******************************
 * CENSUS ENDPOINT             *
 ******************************/
app.get('/census', (req, res) => {
	connection.query('SELECT * FROM blocks2;', function (error, results, fields) {
		if (error) {
			console.log('Error in /census route: ', error);
		}
		res.json(results);
	});
});

app.get('/census/population', (req, res) => {

	connection.query('SELECT TotalPop, Men, Women, Tract FROM blocks2;', function (error, results, fields) {
		if (error) {
			console.log('Error in /census/population route: ', error);
		}
		res.json(results);
	});
});

app.get('/census/ethnicity', (req, res) => {

	connection.query('SELECT Hispanic, White, Black, Asian, Native, Tract FROM blocks2;', function (error, results, fields) {
		if (error) {
			console.log('Error in /census/ethnicity route: ', error);
		}
		res.json(results);
	});

});

app.get('/census/income', (req, res) => {

	connection.query('SELECT Income, Tract FROM blocks2;', function (error, results, fields) {
		if (error) {
			console.log('Error in /census/income route: ', error);
		}
		res.json(results);
	});

});

app.get('/census/unemployment', (req, res) => {
	connection.query('SELECT Unemployment, Tract FROM blocks2;', function (error, results, fields) {
		if (error) {
			console.log('Error in /census/unemployment route: ', error);
		}
		res.json(results);
	});

});

/*******************************
 * TAXI                        *
 ******************************/
app.get('/taxi', (req, res) => {
	connection.query('SELECT * FROM hospital_trips;', function (error, results, fields) {
		if (error) {
			console.log('Error in /taxi route: ', error);
		}
		res.json(results);
	});
});

/*******************************
 * HOSPITALS                   *
 ******************************/
app.get('/hospitals', (req, res) => {

	connection.query('SELECT * FROM hospitals;', function (error, results, fields) {
		if (error) {
			console.log('Error in /hospitals route: ', error);
		}
		res.json(results);
	});
});

app.get('/hospitals/age', (req, res) => {

	connection.query('SELECT per_0_17, per_18_29, per_30_49, per_50_69, per_70, latitude, longitude, fac_id FROM hospitals;', function (error, results, fields) {
		if (error) {
			console.log('Error in /hospitals/age route: ', error);
		}
		res.json(results);
	});

});
app.get('/hospitals/severity', (req, res) => {

	connection.query('SELECT per_extremeseverity, per_majorseverity, per_minorseverity, per_moderateseverity, latitude, longitude, fac_id FROM hospitals;', function (error, results, fields) {
		if (error) {
			console.log('Error in /hospitals/severity route: ', error);
		}
		res.json(results);
	});

});

app.get('/hospitals/race', (req, res) => {

	connection.query('SELECT per_black, per_multiracial, per_otherrace, per_white, latitude, longitude, fac_id FROM hospitals;', function (error, results, fields) {
		if (error) {
			console.log('Error in /hospitals/race route: ', error);
		}
		res.json(results);
	});

});
app.get('/hospitals/payment', (req, res) => {

	connection.query('SELECT per_bluecross_blueshield, per_depofcorrections, federal_state_local_va, per_managedcare, per_medicaid, per_medicare, per_miscpayment, per_private, per_selfpayment, per_unknownpayment, latitude, longitude, fac_id FROM hospitals;', function (error, results, fields) {
		if (error) {
			console.log('Error in /hospitals/payment route: ', error);
		}
		res.json(results);
	});

});
app.get('/hospitals/gender', (req, res) => {

	connection.query('SELECT per_male, per_females,  patients, latitude, longitude, fac_id FROM hospitals;', function (error, results, fields) {
		if (error) {
			console.log('Error in /hospitals/gender route: ', error);
		}
		res.json(results);
	});

});
app.get('/hospitals/ethnicity', (req, res) => {

	connection.query('SELECT per_hispanic, per_nonHispanic,  per_multi_ethnic, per_unknown, latitude, longitude, fac_id FROM hospitals;', function (error, results, fields) {
		if (error) {
			console.log('Error in /hospitals/ethnicity route: ', error);
		}
		res.json(results);
	});

});

app.get('/hospitals/charges', (req, res) => {

	connection.query('SELECT total_charges, latitude, longitude, fac_id FROM hospitals;', function (error, results, fields) {
		if (error) {
			console.log('Error in /hospitals/charges route: ', error);
		}
		res.json(results);
	});

});

var server = app.listen(PORT, _ => {
	console.log('Server listening on port: ', PORT);
});
