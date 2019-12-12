var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/fixed_assets');

router.get('/', function(req, res) {
    var collection = db.get('departments'); //videos бере з БД Robo3t
    collection.find({}, function(err, departments){
        if (err) throw err;
        res.json(departments);
    });
});
 
router.post('/', function(req, res){
    var collection = db.get('departments');
    collection.insert({
        name: req.body.name,
        employees: req.body.employees
        
    }, function(err, department) {
        if(err) throw err;
        res.json(department);
    });
});

router.get('/:id5', function(req, res) {
    var collection = db.get('departments');
    collection.findOne({ _id: req.params.id5 }, function(err, department) { // req.params.id - доступ до значення
        if(err) throw err;
        res.json(department);
    });
}); 

router.put('/:id', function(req, res) {
    var collection = db.get('departments');
    collection.update({ _id: req.params.id },
    {
        $set: {
            name: req.body.name,
            employees: req.body.employees
        }
    }, function(err, department) {
        if(err) throw err;
        res.json(department);
    });
});

router.delete('/:id', function(req, res) {
    var collection = db.get('departments');
    collection.remove({ _id: req.params.id }, function(err, department) {
            if(err) throw err;
            res.json(department);
        });
});

router.get('/:id/persons', function(req, res) {
    var collection = db.get('departments');
    collection.findOne({ _id: req.params.id }, function(err, department) { // req.params.id - доступ до значення
        if(err) throw err;

        var personsCollection = db.get('persons');
        personsCollection.find({'_id':{$in:department.employees}}, function(err, persons) {
           if (err) throw err;
           res.json(persons);
        });
    });
});


module.exports = router;