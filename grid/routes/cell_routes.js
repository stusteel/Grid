var mongo = require('mongodb');


var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

//var server = new Server('localhost', 27017, {auto_reconnect: true});
//db = new Db('celldb', server, {safe: true});
/*
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'celldb' database");
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
*/
exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving cell: ' + id);
    db.collection('cells', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('cells', function(err, collection) {
        collection.find({gid: req.query.gid }).toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addCell = function(req, res) {
    var cell = req.body;
    console.log('Adding cell: ' + JSON.stringify(cell));
    db.collection('cells', function(err, collection) {
        collection.insert(cell, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
};

exports.updateCell = function(req, res) {
    var id = req.params.id;
    var cell = req.body;
    delete cell._id;
    console.log('Updating cell: ' + id);
    console.log(JSON.stringify(cell));
    db.collection('cells', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, cell, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating cell: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(cell);
            }
        });
    });
};

exports.deleteCell = function(req, res) {
    var id = req.params.id;
    console.log('Deleting cell: ' + id);
    db.collection('cells', function(err, collection) {
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
console.log("populating the cell db");
    var testcells = [
        {
            title: "test cell 1"
        },
        {
            title: "test cell 2"
        }
    ];

    db.collection('cells', function(err, collection) {
        collection.insert(testcells, {safe:true}, function(err, result) {});
    });

}