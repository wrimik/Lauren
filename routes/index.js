var express = require('express');
var router = express.Router();

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

module.exports = router;
