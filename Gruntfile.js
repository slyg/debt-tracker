module.exports = function(grunt){

	grunt.initConfig({
		assemble: {
			options: {
				layout: "server/src/layouts/default.hbs",
			 	partials: "server/src/partials/**/*.hbs" 
			},
			home: {
				files : {
			 		'server/public/home/': ["server/src/pages/**/*.hbs"]
			 	}
			}
		},
		nodemon: {
			dev: {
				watchedFolders : [
					'conf/',
					'jobs/',
					'server/'
				]
			}
		}
	});

	grunt.loadNpmTasks('assemble' );
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-nodemon');


	grunt.registerTask('default', ['assemble', 'nodemon']);

}