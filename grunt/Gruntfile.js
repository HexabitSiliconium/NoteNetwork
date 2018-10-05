module.exports = function(grunt)
{
// Project configuration.
    grunt.initConfig({
    concat: {
      js: {
        src: ['js/1.js', 'js/2.js'],
        dest: 'build/js/scripts.js',
      },
      css: {
        src: ['css/main.css', 'css/theme.css'],
        dest: 'build/css/styles.css',
      },
    },
  });

    grunt.loadNpmTasks('grunt-contrib-concat');
}