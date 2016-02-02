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
        dest: 'assets/script/js/<%= pkg.name %>.min.js'
      }
    },
    imagemin: {
      dynamic: {                          // Another target
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'src/',                   // Src matches are relative to this path
          src: ['stylus/i/img/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: 'assets/css/i/img/'                  // Destination path prefix
        }]
      }
    },
    stylus: {
      compile: {
        options: {
        },
        files: {
          'assets/css/style.css': ['stylus/**/*.styl'] // compile and concat into single file 
        }
      }
    },
    postcss: {
      options: {
        //map: {
        //  inline: false, // save all sourcemaps as separate files...
        //  annotation: 'dist/css/maps/' // ...to the specified directory
        //},
      
        processors: [
          //require('pixrem')(), // add fallbacks for rem units
          require('autoprefixer')({browsers: 'last 2 versions'}) // add vendor prefixes
          //require('cssnano')() // minify the result
        ]
      },
      dist: {
        src: 'assets/css/style.css'
      }
    },
    watch: {
      files: ['stylus/*.styl'],
      tasks: ['stylus']
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  // Default task(s).
  grunt.registerTask('default', ['uglify', 'imagemin', 'stylus', 'postcss' ]);
  
  // Events
  grunt.event.on('watch', function(action, filepath) {});

};