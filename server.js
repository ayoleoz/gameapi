const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const PORT = 3000;
const dataPath = './data/games.json';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require('./routes/routes.js')(app, fs);

const server = app.listen(PORT, () => {
    console.log('listening on port %s...', server.address().port);
    // On server starts, can read a list of game info from a local JSON file
    fs.readFile(dataPath, (err, data) => {
        if (err) throw err;
        let gameInfo = JSON.parse(data);
        app.set('gameInfo', gameInfo);
    })
})