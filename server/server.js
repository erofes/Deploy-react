import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom';
import bodyParser from 'body-parser';
import cors from 'cors';
import App from '../client/components/App.jsx';
import { MongoClient } from 'mongodb';
const db = { url : "mongodb://kirill:kirill@ds151908.mlab.com:51908/my-database" };

const AppExpress = express();

AppExpress.get('/', (req,res) => {
	res.send('<h1>ok!</h1>');
});

AppExpress.use(cors({ origin: '*' }));

AppExpress.set('port', (process.env.PORT || 5000));

const PORT = 3001;

AppExpress.use(bodyParser.urlencoded({ extended: true }));


MongoClient.connect(db.url, (err, database) => {
if (err) return console.log(err)
	routing(AppExpress, database);
	AppExpress.listen(AppExpress.get('port'), () => {
		console.log(`Server listening on:`, AppExpress.get('port'));
	});             
})

var ObjectID = require('mongodb').ObjectID;
const routing = function(app, db) {
	const myAwesomeDB = db.db('my-database')

	app.get('/notes/:id', (req, res) => {
		const id = req.params.id;
	    const details = { '_id': new ObjectID(id) };
	    myAwesomeDB.collection('notes').findOne(details, (err, item) => {
			if (err) {
		      	res.send({'error':'An error has occurred'});
			} else {
		      	res.send(item);
			}
    	});
  	});

  	app.get('/notes', (req, res) => {
	    myAwesomeDB.collection('notes').find({}).toArray( (err, item) => {
			if (err) {
		      	res.send({'error':'An error has occurred'});
			} else {
		      	res.send(item);
			}
    	});
  	});

  	app.get('/work', (req, res) => {
	    myAwesomeDB.collection('work').find({}).toArray( (err, item) => {
			if (err) {
		      	res.send({'error':'An error has occurred'});
			} else {
		      	res.send(item);
			}
    	});
  	});

  	app.post('/work', (req, res) => {
		const work = { title:req.body.title, priority:req.body.priority, status:req.body.status, deadline:req.body.deadline};
		myAwesomeDB.collection('work').insert(work, (err, result) => {
			if (err) {
				res.send({'error':'Cant add new work'});
			} else {
				res.send(result.ops[0]);
			}
		});
	});
};