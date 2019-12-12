var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/fixed_assets');

router.get('/', function(req, res) {
    var collection = db.get('persons'); //videos бере з БД Robo3t
    collection.find({}, function(err, persons){
        if (err) throw err;
        res.json(persons);
    });
});
 
router.post('/', function(req, res){
    var collection = db.get('persons');
    collection.insert({
        f_name: req.body.f_name,
        l_name: req.body.l_name,
        address: req.body.address,
        contact: req.body.contact

    }, function(err, person) {
        if(err) throw err;
        res.json(person);
    });
});

router.get('/:id5', function(req, res) {
    var collection = db.get('persons');
    collection.findOne({ _id: req.params.id5 }, function(err, person) { // req.params.id - доступ до значення
        if(err) throw err;
        res.json(person);
    });
}); 

router.put('/:id', function(req, res) {
    var collection = db.get('persons');
    collection.update({ _id: req.params.id },
    {
        $set: {
            f_name: req.body.f_name,
            l_name: req.body.l_name,
            address: req.body.address,
            contact: req.body.contact
        }
    }, function(err, person) {
        if(err) throw err;
        res.json(person);
    });
});

router.delete('/:id', function(req, res) {
    var collection = db.get('persons');
    collection.remove({ _id: req.params.id }, function(err, person) {
            if(err) throw err;
            res.json(person);
        });
});


module.exports = router;