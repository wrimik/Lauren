var piece = {
    schema: {
        id: {type: 'serial', key: true}, // the auto-incrementing primary key
        name: {type: 'text'},
        desc: {type: 'text'},
        embed_code: {type: 'text'},
        type: {type: 'text'},
        published: {type: 'boolean'}
    },
    options: {
        methods: {
            //images: function() {
            //    return this.name + ' ' + this.surname;
            //}
        }
    }
};

module.exports = piece;
