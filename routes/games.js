const gameRoutes = (app, fs) => {
    const dataPath = './data/games.json';

    // home page
    app.get('/', (req, res) => {
        res.send("Hello, this is a simple server demo with some API calls!");
    })

    // Get a list of games
    app.get('/getAll', (req, res) => {
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(app.get('gameInfo'), null, 4));
    });

    // Get a game by name
    app.use('/searchName/:name', (req, res) => {
        let gameInfo = app.get('gameInfo');
        let filtered = gameInfo.find(game => game.Name === req.params['name']);
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(filtered, null, 4));
    })

    // General Search
    app.use('/search', (req, res) => {
        let filterArr = []
        const filters = req.query;
        filterArr.push(filters);
        let gameInfo = app.get('gameInfo');
        let result = gameInfo.filter(function(i) {
            return filterArr.some(function(j) {
                return !Object.keys(j).some(function(prop) {
                    return i[prop] != j[prop];
                });
            });
        });
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(result, null, 4));
    })

    // Get the top n "popular" game
    app.get('/top/:rank', (req, res) => {
        let gameInfo = app.get('gameInfo');
        let result = gameInfo.sort(({Popularity:a}, {Popularity:b}) => b - a);
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(result.slice(0, req.params['rank']), null, 4));
    })

    // Add a game to JSON file
    app.all('/addGame/:id', (req, res) => {
        let gameId = parseInt(req.params.id);
        let gameObject = req.body;
        let gameInfo = app.get('gameInfo');
        console.log(gameObject);
        if (Object.keys(gameObject).some(attr => attr === "")) {
            res.send(`The attribute ${attr} is empty. Check your input again.`);
            console.log(`The attribute ${attr} is empty. Check your input again.`);
        }
        if (!gameInfo.some(game => game.Id === gameId)) {
            gameInfo.push(gameObject);
            let data = JSON.stringify(gameInfo);
            fs.writeFileSync('./data/games.json', data);
            console.log(`Successfully saved the new game: ${gameObject.Name}`);
            res.send(`Successfully saved the new game: ${gameObject.Name}`);
        } else {
            console.log(`The game with id ${gameId} already exists!`);
            res.send(`The game with id ${gameId} already exists!`);
        }
    })
};

module.exports = gameRoutes;