module.exports = function(grunt) {
  grunt.initConfig({
    copy: {
      dist: {
        files: [
          {src: ['backbone-gcm.js'], dest: './', cwd:'lib/', expand: true} 
        ]
      }
    },
    uglify: {
      dist: {
        files: {
          'backbone-gcm.min.js': ['lib/backbone-gcm.js']
        }
      }
    },
    shell: {
      'mocha-phantomjs': {
        command: 'mocha-phantomjs -R spec http://localhost:8000/testrunner.html',
        options: {
          stdout: true,
          stderr: true
        }
      }
    },
    nodemon: {
      dev: {
        options: {
          file: 'util/web-server.js',
          watchedFolders: ['util']
        }
      }
    },
    watch: {
      js: {
        files: ['**/*.js'],
        tasks: ['shell:mocha-phantomjs']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('build', ['copy', 'uglify']);
  grunt.registerTask('default', ['nodemon']);
}