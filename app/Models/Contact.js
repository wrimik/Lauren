var Contact = {
    schema: {
        id: {type: 'serial', key: true}, // the auto-incrementing primary key
        name: {type: 'text'},
        email: {type: 'text'},
        phone: {type: 'text'},
        message: {type: 'text'}
    },
    options: {
        methods: {
            //images: function() {
            //    return this.name + ' ' + this.surname;
            //}
        }
    }
};

module.exports = Contact;
