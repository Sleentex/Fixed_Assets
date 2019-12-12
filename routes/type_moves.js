var app = require('express');
var router = app.Router();

var monk = require('monk');
var db = monk('localhost:27017/fixed_assets');

router.get('/', function(req, res) {
    var Type_Moves = db.get('type_moves');
    Type_Moves.find({}, function(err, type_move) {
        if(err) throw err;
        res.json(type_move);
    })
})

router.get('/:id', function(req, res) {
    var Type_Moves = db.get('type_moves');
    Type_Moves.findOne({_id:req.params.id}, function(err, type_move) {
        if (err) throw err;
        res.json(type_move);
    });
});

module.exports = router;