var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/fixed_assets');

router.get('/', function(req, res) {
    var collection = db.get('info'); //videos бере з БД Robo3t
    collection.find({}, function(err, infos){
        if (err) throw err;
        res.json(infos);
    });
});
 
router.post('/', function(req, res){
    var collection = db.get('info');
    collection.insert({
        fixed_asset_id: req.body.fixed_asset_id,
        person_id: req.body.person_id,
        type_move_id: req.body.type_move_id,
        date: req.body.date
        
    }, function(err, info) {
        if(err) throw err;
        res.json(info);
    });
});

router.get('/:id5', function(req, res) {
    var collection = db.get('info');
    collection.findOne({ _id: req.params.id5 }, function(err, info) { // req.params.id - доступ до значення
        if(err) throw err;
        res.json(info);
    });
}); 

router.put('/:id', function(req, res) {
    var collection = db.get('info');
    collection.update({ _id: req.params.id },
    {
        $set: {
            fixed_asset_id: req.body.fixed_asset_id,
            person_id: req.body.person_id,
            type_move_id: req.body.type_move_id,
            date: req.body.date
        }
    }, function(err, info) {
        if(err) throw err;
        res.json(info);
    });
});

router.delete('/:id', function(req, res) {
    var collection = db.get('info');
    collection.remove({ _id: req.params.id }, function(err, info) {
            if(err) throw err;
            res.json(info);
        });
});

router.get('/:id/persons', function(req, res) {
    var collection = db.get('info');
    collection.findOne({ _id: req.params.id }, function(err, info) { // req.params.id - доступ до значення
        if(err) throw err;

        var personsCollection = db.get('persons');
        personsCollection.find({'_id':info.person_id}, function(err, persons) {
           if (err) throw err;
           res.json(persons);
        });
    }); 
});


module.exports = router;