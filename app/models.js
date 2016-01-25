/**
 * This serves as the loader for my models into the application.
 * Everything in modelDefs will be added to req.models and is asssumed to
 * be a database model.
 * @type {exports}
 */

module.exports = {
    Piece: require('./models/Piece'),
    Contact: require('./models/Contact')
};
