module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            stylesheets: {
                src:['node_modules/bootstrap/dist/css/bootstrap.min.css'],
                dest: 'public/stylesheets/dist/libs.min.css'
            },
            libs: {
                // the files to concatenate
                src: [
                    'resources/js/jquery-tmp.min.js',
                    'node_modules/bootstrap/dist/js/bootstrap.min.js',
                    'node_modules/angular/angular.min.js'
                ],
                // the location of the resulting JS file
                dest: 'public/javascripts/dist/libs.js'
            },
            scripts: {
                // the files to concatenate
                src: ['resources/js/admin/login.js', 'resources/js/admin/pieces.js' ],
                // the location of the resulting JS file
                dest: 'public/javascripts/dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['concat']); //, 'uglify'
};