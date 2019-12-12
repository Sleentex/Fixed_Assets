var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/fixed_assets');

router.get('/', function(req, res) {
    var collection = db.get('fixed_assets'); //videos бере з БД Robo3t
    collection.find({}, function(err, fixed_assets){
        if (err) throw err;
        res.json(fixed_assets);
    });
});
 
router.post('/', function(req, res){
    var collection = db.get('fixed_assets');
    collection.insert({
        name: req.body.name,
        details: req.body.details
        
    }, function(err, fixed_asset) {
        if(err) throw err;
        res.json(fixed_asset);
    });
});

router.get('/:id5', function(req, res) {
    var collection = db.get('fixed_assets');
    collection.findOne({ _id: req.params.id5 }, function(err, fixed_asset) { // req.params.id - доступ до значення
        if(err) throw err;
        res.json(fixed_asset);
    });
}); 

router.put('/:id', function(req, res) {
    var collection = db.get('fixed_assets');
    collection.update({ _id: req.params.id },
    {
        $set: {
            name: req.body.name,
            details: req.body.details
        }
    }, function(err, fixed_asset) {
        if(err) throw err;
        res.json(fixed_asset);
    });
});

router.delete('/:id', function(req, res) {
    var collection = db.get('fixed_assets');
    collection.remove({ _id: req.params.id }, function(err, fixed_asset) {
            if(err) throw err;
            res.json(fixed_asset);
        });
});

module.exports = router;