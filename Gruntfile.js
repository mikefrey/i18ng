module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: true,
        reporter: 'checkstyle'
      },
      all: [
        'Gruntfile.js',
        'i18ng.js',
        'test/**/*.js'
      ]
    },
    uglify: {
      build: {
        options: {
          mangle: true,
          compress: true
        },
        files: {
          'i18ng.min.js': ['i18ng.js']
        }
      }
    }

  })

  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-contrib-uglify')

  grunt.registerTask('default', ['jshint', 'uglify'])

}