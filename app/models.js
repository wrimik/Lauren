module.exports = function(db, fn){
    db.define('piece', {
        id: {type: 'serial', key: true}, // the auto-incrementing primary key
        name: {type: 'text'},
        desc: {type: 'text'},
        published: {type: 'boolean'}
    }, {
        methods: {
            //images: function() {
            //    return this.name + ' ' + this.surname;
            //}
        }
    });
    //db.load('models/User',    function(err){ if (err) { return fn(err); } });

    db.sync();
    return fn();
};