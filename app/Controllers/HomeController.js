var express  = require('express'),
     router  = express.Router();

var HomeController = {
    index: function (req, res){
        res.render('pages/home', {page: {
            title : 'Home'
        }});
    },
    portfolio: function (req, res) {
        req.models.Piece.all(function(err, pieces){
            res.render('pages/portfolio', {page: {
                title : 'Portfolio',
                pieces: pieces
            }});
        })
    },
    about: function (req, res) {
        res.render('pages/about', {page: {
            title : 'About'
        }});
    },

    contact: function (req, res) {
        res.render('pages/contact', {page: {
            title : 'Contact Me'
        }});
    }
};


/**
 * Public pages
 */
router.get('/', HomeController.index);
router.get('/portfolio', HomeController.portfolio);
router.get('/about', HomeController.about);
router.get('/contact', HomeController.contact);
router.post('/contact/create', HomeController.contact);


module.exports = router;
