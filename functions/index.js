const functions = require('firebase-functions');
const {getMetadata} = require('page-metadata-parser');
const domino = require('domino');
const fetch = require('node-fetch');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.metadata = functions.https.onRequest((request, response) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    
    const url = request.body.link;
    fetch(url)
        .then(response => response.text())
        .then(html => domino.createWindow(html).document)
        .then(doc => response.send(getMetadata(doc, url)))
        .catch(doc => response.send('Error'));
});
