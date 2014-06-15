mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('griddb', server, {safe: true});

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'griddb' database");
        //collection for grids
        db.collection('grids', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'grids' collection doesn't exist. Creating it with sample data...");
                //populateDB();
            }
            //console.log("populating");
            //populateDB();


        });
        //collection for cells
        db.collection('cells', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'cells' collection doesn't exist. Creating it with sample data...");
                //populateDB();
            }
            //console.log("populating");
            //populateDB();
        });
    }
});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving grid: ' + id);
    db.collection('grids', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('grids', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addGrid = function(req, res) {
    var grid = req.body;
    console.log('Adding grid: ' + JSON.stringify(grid));
    db.collection('grids', function(err, collection) {
        collection.insert(grid, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
};

exports.updateGrid = function(req, res) {
    var id = req.params.id;
    var grid = req.body;
    delete grid._id;
    console.log('Updating grid: ' + id);
    console.log(JSON.stringify(grid));
    db.collection('grids', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, grid, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating grid: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(grid);
            }
        });
    });
};

exports.deleteGrid = function(req, res) {
    var id = req.params.id;
    console.log('Deleting grid: ' + id);
    db.collection('grids', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
};


var populateDB = function() {
console.log("populating the grid db");
    var testgrids = [
        {
            title: "test grid 1"
        },
        {
            title: "test grid 2"
        }
    ];

    db.collection('grids', function(err, collection) {
        collection.insert(testgrids, {safe:true}, function(err, result) {});
    });

}