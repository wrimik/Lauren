var express = require('express');
var router = express.Router();
var orm = require('orm');
/**
 * for file uploads
 */
var multer  = require('multer');
var upload = multer({ dest: './public/uploads/' });


/**
 * Admin pages
 */
router.post('/piece/create', upload.single('image'), function (req, res) {
    console.log(image);
    var p = req.body.piece;
    var piece = new req.models.piece({
        name: p.name,
        desc: p.desc,
        embed_code: p.embed_code,
        type: p.type,
        published: (p.published == 'published' ? true : false)
    });
    piece.save(function(err){
        image.mv('/public/uploads/' + piece.id + '.jpg', function(err) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.send('File uploaded!');
            }
        });
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

router.get('/admin/piece', function(req, res){
    var piece = req.models.piece;
    piece.all( function(err, pieces){
        res.render('admin/piece', {page: {
            title : 'Manage Pieces',
            pieces: pieces
        }});
    })
});

module.exports = router;
