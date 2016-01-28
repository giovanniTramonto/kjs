module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        preserveComments: 'some'
      },
      build: {
        src: [  'node_modules/jquery/dist/jquery.min.js'
                //, 'script/js/main.js'
        ],
        dest: 'public/script/js/<%= pkg.name %>.min.js'
      }
    },
    stylus: {
      compile: {
        options: {
        },
        files: {
          'public/css/style.css': ['stylus/**/*.styl'] // compile and concat into single file 
        }
      }
    },
    watch: {
      files: ['stylus/*.styl'],
      tasks: ['stylus']
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  // Default task(s).
  grunt.registerTask('default', ['uglify','stylus']);

};