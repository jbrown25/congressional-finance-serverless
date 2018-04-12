const express = require('express');
const serverless = require('serverless-http');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PROPUBLICA_KEY = process.env.PROPUBLICA_KEY;
const OPENSECRETS_KEY = process.env.OPENSECRETS_KEY;
const PROPUBLICA_ENDPOINT = 'https://api.propublica.org/congress/v1/115/house/members.json';	
const OPENSECRETS_ENDPOINT = 'http://www.opensecrets.org/api/?method=';

app.use(cors());

app.get('/members', (req, res) => {
	axios.get(PROPUBLICA_ENDPOINT, {
			headers: {
				'X-API-Key': PROPUBLICA_KEY
			}
		})
		.then((response) => {
			res.send(response.data);
		})
		.catch((error) => {
			res.send(error);
		});
});

app.get('/:cid/:method', (req, res) => {
	const opensecrets_path = `${OPENSECRETS_ENDPOINT + req.params.method}&cid=${req.params.cid}&output=json&apikey=${OPENSECRETS_KEY}`;
	
	axios.get(opensecrets_path)
		.then((response) => {
			res.send(response.data);
		})
		.catch((error) => {
			res.send(error);
		});
});


module.exports.handler = serverless(app);