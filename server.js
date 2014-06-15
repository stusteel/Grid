var express = require('express'),
    path = require('path'),
    http = require('http'),
    server, db;
    grid = require('./grid/routes/grid_routes');
    cell = require('./grid/routes/cell_routes');

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser()),
    app.use(express.static(path.join(__dirname, 'grid')));
});

app.get('/grids', grid.findAll);
app.get('/grids/:id', grid.findById);
app.post('/grids', grid.addGrid);
app.put('/grids/:id', grid.updateGrid);
app.delete('/grids/:id', grid.deleteGrid);


app.get('/cells', cell.findAll);
app.get('/cells/:id', cell.findById);
app.post('/cells', cell.addCell);
app.put('/cells/:id', cell.updateCell);
app.delete('/cells/:id', cell.deleteCell);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});