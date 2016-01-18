var express = require('express');
var router = express.Router();
var orm = require('orm');

/**
 * Public pages
 */

router.get('/', function (req, res) {
    res.render('pages/home', {page: {
        title : 'Home'
    }});
});
router.get('/portfolio', function (req, res) {
    res.render('pages/portfolio', {page: {
        title : 'Portfolio'
    }});
});
router.get('/about', function (req, res) {
    res.render('pages/about', {page: {
        title : 'About'
    }});
});
router.get('/contact', function (req, res) {
    res.render('pages/contact', {page: {
        title : 'Contact Me'
    }});
});


/**
 * Admin pages
 */
router.get('/admin/piece', function(req, res){
    var piece = req.models.piece;
    console.log(piece);
    piece.all( function(err, pieces){
        res.render('admin/piece', {page: {
            title : 'Manage Pieces',
            pieces: pieces
        }});
    })
});
router.get('/wtf', function(req, res){
});
router.post('/piece/create', function (req, res) {
    var piece = new req.models.piece({
        name: req.body.name,
        desc: req.body.desc,
        published: (req.body.published == 'published' ? true : false)
    });
    piece.save(function(err){
        res.json(piece);
    });
});


module.exports = router;
