module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        copy: {
            images: {
                src: 'images/*',
                dest: 'public/'
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                jshintignore: '.jshintignore'
            },
            scripts: {
                src: [
                    'ng/**/*.js',
                    'view/**/.js'
                ]
            }
        },
        concat: {
            css: {
                files: [{
                    options: {
                        seperator: '\n'
                    },
                    src: [
                        'css/**/*.css',
                        'bower_components/bootstrap/dist/css/bootstrap.min.css',
                        'bower_components/bootstrap/dist/css/bootstrap-theme.min.css',
                    ],
                    dest: 'public/css/all.css'
                }]
            },
            js: {
                options: {
                    seperator: '\n'
                },
                src: [
                    'bower_components/angular/angular.min.js',
                    'bower_components/ngstorage/ngStorage.min.js',
                    'bower_components/angular-route/angular-route.min.js',
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/bootstrap/dist/js/bootstrap.min.js',
                    'bower_components/underscore/underscore-min.js',
                    'bower_components/angular-google-analytics/dist/angular-google-analytics.js',
                    'ng/**/*.js',
                    'views/**/*.js'
                ],
                dest: 'public/js/all.js'
            }
        },
        cssmin: {
            options: {
                keepSpecialComments: 0,
            },
            minify: {
                expand: true,
                cwd: 'public/css',
                src: 'all.css',
                dest: 'public/css'
            }
        },
        uglify: {
            script: {
                expand: true,
                cwd: 'public/js',
                src: 'all.js',
                dest: 'public/js'
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('build-test', ['jshint', 'concat:js', 'concat:css', 'copy:images']);
    grunt.registerTask('build-prod', ['jshint', 'concat:js', 'concat:css', 'cssmin', 'copy:images','uglify']);

};