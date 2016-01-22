var express = require('express');
var router = express.Router();
var orm = require('orm');
var fileUpload = require('express-fileupload');

/**
 * Public pages
 */

router.get('/', function (req, res) {
    res.render('pages/home', {page: {
        title : 'Home'
    }});
});
router.get('/portfolio', function (req, res) {
    var piece = req.models.piece;
    piece.all(function(err, pieces){
        res.render('pages/portfolio', {page: {
            title : 'Portfolio',
            pieces: pieces
        }});
    })
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
        embed_code: req.body.embed_code,
        type: req.body.type,
        published: (req.body.published == 'published' ? true : false)
    });
    piece.save(function(err){
        //TODO: check if file is image
        //TODO: create folder like public/upoads/piece.id/n++.original-ext
        if(req.files && piece.type == 'image'){
            var image = req.files.image;
            image.mv('/public/uploads/' + piece.id + '.jpg', function(err) {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    res.send('File uploaded!');
                }
            });
        }
        res.json({'success':1, 'id' : piece.id })
    });
});
router.post('/piece/:id', function (req, res) {
    var id = req.params.id;
    req.models.piece.get(id, function (err, piece) {
        piece.name = req.body.name;
        piece.desc = req.body.desc;
        piece.published = (req.body.published == 'published' ? true : false);
        piece.save();
        res.json({'success':1});
    });
});
router.post('/piece/:id/delete', function (req, res) {
    var id = req.params.id;
    req.models.piece.get(id, function (err, piece) {
        piece.remove(function(err){
            res.json({'success':1})
        });
    });
});


module.exports = router;
