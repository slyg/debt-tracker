module.exports = function(grunt){

    grunt.initConfig({

        concurrent: {
            dev: ['nodemon', 'watch', 'jshint', 'assemble'],
            cscripts : ['watch', 'jshint'],
            options: {
                logConcurrentOutput: true
            }
        },
        jshint: {
            grunt:  ['Gruntfile.js'],
            all:    ['server/src/javascript/**/*.js'],
            options: {esnext : true}
        },
        assemble: {
            options: {
                layout: "server/src/templates/layouts/default.hbs",
                partials: "server/src/templates/partials/**/*.hbs" 
            },
            home: {
                files : {
                    'server/public/home/': ["server/src/templates/pages/**/*.hbs"]
                }
            }
        },
        nodemon: {
            dev: {
                options : {
                    watchedFolders : ['conf/', 'jobs/']
                }
            }
        },
        watch: {
            scripts: {
                files: ['server/src/javascript/*.js', 'Gruntfile.js'],
                tasks: ['jshint:all'],
                options: {
                    spawn: false,
                }
            },
            templates: {
                files: ['server/src/templates/**/*.hbs'],
                tasks: ['assemble'],
                options: {
                    spawn: false,
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('assemble' );
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');


    grunt.registerTask('default', ['concurrent:dev']);
    grunt.registerTask('cscripts', ['concurrent:cscripts']);

};