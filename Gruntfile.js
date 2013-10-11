module.exports = function(grunt){

    grunt.initConfig({

        concurrent: {
            dev: ['nodemon:dev', 'watch', 'jshint', 'copy:dev', 'assemble', 'lmd'],
            cscripts : ['watch', 'jshint', 'lmd'],
            options: {
                logConcurrentOutput: true
            }
        },

        jshint: {
            grunt:  ['Gruntfile.js'],
            all:    ['server/src/javascript/**/*.js'],
            options: {esnext : true}
        },

        lmd : {
            build_name : 'main'
        },

        assemble: {
            options: {
                layout: "server/src/templates/layouts/default.hbs",
                partials: "server/src/templates/partials/**/*.hbs" 
            },
            stats: {
                files : {
                    'server/public/stats/': ["server/src/templates/pages/**/*.hbs"]
                }
            }
        },

        copy: {
            dev: {
                expand: true,
                cwd: 'server/src/vendors/',
                src: '**',
                dest: 'server/public/vendors/'
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
                files: ['server/src/javascript/*.js', 'Gruntfile.js', '.lmd/*'],
                tasks: ['jshint:all', 'lmd'],
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

    /* --- */

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('assemble' );
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-lmd');
    grunt.loadNpmTasks('grunt-contrib-copy');

    /* --- */

    grunt.registerTask('default', ['concurrent:dev']);
    grunt.registerTask('cscripts', ['concurrent:cscripts']);

};