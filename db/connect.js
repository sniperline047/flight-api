var mysql  = require('mysql');
require('dotenv').config();

var db_config = {
	host: '127.0.0.1',
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: 'FlightDB',
};

var connection;

function handleConnection() {
	connection = mysql.createConnection(db_config);
	connection.connect((err) => {
		if(err) {
			console.log("Connection to the database failed!");
			setTimeout(handleConnection, 2000);
		} else {
			console.log("Connection established!");
		}
	});
	connection.on('error', (err) => {
		if(err.code === "PROTCOL_CONNECTION_LOST") {
			handleConnection();
		} else {
			throw err;
		}
	});
}

handleConnection();

module.exports = connection; 
