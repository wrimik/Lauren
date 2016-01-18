/**
 * This serves as the loader for my models into the application.
 * Everything in modelDefs will be added to req.models and is asssumed to
 * be a database model.
 * @type {exports}
 */
var piece = require('./models/Piece');

var modelDefs = {
    piece: piece
};
module.exports = modelDefs;
