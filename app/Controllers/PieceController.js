var express = require('express'),
    router = express.Router(),
    fs     = require('fs'),
    multer  = require('multer'),
    upload = multer({ dest: 'public/uploads/' });

var PieceController = {
    index: function (req, res) {
        var piece = req.models.Piece;
        piece.all(function (err, pieces) {
            res.render('admin/piece', {
                page: {
                    title: 'Manage Pieces',
                    pieces: pieces
                }
            });
        })
    },
    create: function (req, res) {
        var p = req.body.Piece;
        var Piece = new req.models.Piece({
            name: p.name,
            desc: p.desc,
            embed_code: p.embed_code,
            type: p.type,
            published: (p.published == 'published' ? true : false)
        });
        Piece.save(function (err) {

            //image.mv('/public/uploads/' + piece.id + '.jpg', function(err) {
                if (err) {
                    res.status(500).send(err);
                }
            //    else {
            //        res.send('File uploaded!');
            //    }
            //});
            res.json({'success':1, 'id' : Piece.id })
        });
    },
    update: function (req, res) {
        var p = req.body.Piece;
        req.models.Piece.get(req.params.id, function (err, piece) {
            piece.name = p.name;
            piece.desc = p.desc;
            piece.published = p.published;
            piece.save();
            res.json({'success': 1});
        });
    },
    delete: function (req, res) {
        req.models.Piece
            .get(req.params.id, function(err, piece){
                piece.remove(function (err) {
                    console.log("removed!");
                });
                res.json({success:1})
            });
    },
    addImages: function(req, res){
        //res.json(req.file)
        var file = req.file;
        var piece_id = parseInt(req.body.piece_id);
        if(file.mimetype.substr(0, 5) == 'image'){
            var path = 'public/uploads/'+piece_id;
            var newName = path + '/img.' + file.originalname.substr(-3);
            if(fs.exists(newName)){ fs.unlinkSync(newName); }
            if(fs.exists(path)){ fs.rmdirSync(path); }
            fs.mkdirSync(path);
            fs.rename(file.path, newName);
        }
        res.send('Image Created!')
    }
};

router.get('/piece', PieceController.index);
router.post('/piece/create', PieceController.create);
router.post('/piece/add-images', upload.single('file'), PieceController.addImages);
router.post('/piece/:id', PieceController.update);
router.post('/piece/:id/delete', PieceController.delete);

module.exports = router;