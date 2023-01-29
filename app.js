const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.post('/', function (req, res) {
	const query = req.body.category;
	const url = 'https://v2.jokeapi.dev/joke/' + query + '?type=single';
	https.get(url, function (response) {
		console.log(response.statusCode);
		response.on('data', function (data) {
			const jokeData = JSON.parse(data);
			const joke = jokeData.joke;
			res.write('<h1>Type of joke: ' + jokeData.category + '</h1>');
			res.write('<h2>' + joke + '</h2>');
			res.send();
		});
	});
});

app.listen(3000, function () {
	console.log('Server is running on port 3000.');
});
