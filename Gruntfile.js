'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            js: {
                options: {
                    separator: ';'
                },
                src: [
                    'bower_components/angular/angular.min.js',
                    'bower_components/angular-route/angular-route.min.js',
                    'bower_components/angulartics/dist/angulartics.min.js',
                    'bower_components/angulartics/dist/angulartics-ga.min.js',
                    'js/**/*.js'
                ],
                dest: 'build/<%= pkg.name %>.js'
            },
            css: {
                options: {
                    separator: ''
                },
                src: [
                    'bower_components/unsemantic/assets/stylesheets/unsemantic-grid-responsive-no-ie7.css',
                    'style/**/*.css'
                ],
                dest: 'build/<%= pkg.name %>.css'
            }
        },
        uglify: {
            js: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
                },
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.js.dest %>']
                }
            }
        },
        copy: {
            main: {
                src: ['img/*', 'view/*', 'favicon.ico', 'font/*', 'CNAME'], dest: 'dist/', filter: 'isFile'
            },
            index: {
                src: 'index.html',
                dest: 'dist/',
                options: {
                    process: function (content) {
                        content = content.replace(/<script src=.*script>\n/g, "");
                        content = content.replace(/<\/body>/, "<script src=\"hack-cup.min.js\"></script>\n</body>");
                        content = content.replace(/<link rel="stylesheet" href="bower_components.*>/, "");
                        content = content.replace(/<link rel="stylesheet" href="style.*>/, "<link rel=\"stylesheet\" href=\"hack-cup.css\"/>");
                        return content;
                    }
                }
            },
            css: {
                files: [
                    {src: 'build/<%= pkg.name %>.css', dest: 'dist/<%= pkg.name %>.css'},
                    {src: 'dist/view/footer.html', dest: 'dist/view/footer.html'}
                ],
                options: {
                    process: function (content) {
                        content = content.replace(/..\/img/g, "img");
                        content = content.replace(/..\/font/g, "font");
                        return content;
                    }
                }
            }
        },
        'gh-pages': {
            options: {
                base: 'dist'
            },
            src: ['**']
        },
        'clean': ['build', 'dist']
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('dist', ['clean', 'concat', 'uglify', 'copy']);

}
;