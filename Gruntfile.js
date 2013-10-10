module.exports = function(grunt){

    grunt.initConfig({

        concurrent: {
            dev: ['nodemon', 'watch', 'assemble', 'jshint', 'concat'],
            cscripts : ['watch', 'jshint', 'concat'],
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
            stats: {
                files : {
                    'server/public/stats/': ["server/src/templates/pages/**/*.hbs"]
                }
            }
        },

        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: [
                    'server/src/javascript/D.js',
                    'server/src/javascript/ScatterPlotChart.js',
                    'server/src/javascript/BarChart.js',
                    'server/src/javascript/user-handler.js',
                    'server/src/javascript/bar-chart.js',
                    'server/src/javascript/init.js'
                ],
                dest: 'server/public/javascript/main.js',
            },
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
                tasks: ['jshint:all', 'concat'],
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

    /* --- */

    grunt.registerTask('default', ['concurrent:dev']);
    grunt.registerTask('cscripts', ['concurrent:cscripts']);

};