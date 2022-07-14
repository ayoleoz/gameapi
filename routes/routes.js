const gameRoutes = require('./games');
const appRouter = (app, fs) => {
    gameRoutes(app, fs);
};

module.exports = appRouter;