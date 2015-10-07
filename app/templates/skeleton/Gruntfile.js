/// <binding ProjectOpened='watch' />
'use strict';

module.exports = function (grunt) {

    var bower_components = grunt.file.readJSON("bower_components.json");

    require('load-grunt-tasks')(grunt);

    //Using exclusion patterns slows down Grunt significantly
    //instead of creating a set of patterns like '**/*.js' and '!**/node_modules/**'
    //this method is used to create a set of inclusive patterns for all subdirectories
    //skipping node_modules, bower_components, dist, and any .dirs
    //This enables users to create any directory structure they desire.
    var createFolderGlobs = function (fileTypePatterns) {
        fileTypePatterns = Array.isArray(fileTypePatterns) ? fileTypePatterns : [fileTypePatterns];
        var ignore = ['node_modules', 'bower_components', 'dist', 'temp', 'Scripts', 'obj'];
        var fs = require('fs');
        return fs.readdirSync(process.cwd())
            .map(function (file) {
                if (ignore.indexOf(file) !== -1 ||
                    file.indexOf('.') === 0 ||
                    !fs.lstatSync(file).isDirectory()) {
                    return null;
                } else {
                    return fileTypePatterns.map(function (pattern) {
                        return file + '/**/' + pattern;
                    });
                }
            })
            .filter(function (patterns) {
                return patterns;
            })
            .concat(fileTypePatterns);
    };

    // Project configuration.
    grunt.initConfig({
        ngAnnotate: {
            appScripts: {
                options: {
                    sourceMap: true
                },
                files: [{
                    expand: true,
                    src: ["app/**/*.js", "!app/**/*-spec.js"],
                    dest: 'temp/annotated/',
                    ext: '.annotated.js'
                }]
            }
        },
        concat: {
            options: {
                separator: ';\n',
                sourceMap: true
            },
            vendorScripts: {
                src: bower_components.vendor,
                dest: 'temp/bower_scripts.js'
            },
            vendorDevScripts: {
                src: bower_components.dev,
                dest: 'temp/vendor_dev_scripts.js'
            },
            appScripts: {
                src: ['temp/annotated/app/app.js', "temp/annotated/app/**/*.js"],
                dest: 'temp/app_scripts.js'
            }
        },
        uglify: {
            app: {
                options: {
                    sourceMap: true,
                    sourceMapIn: 'temp/app_scripts.js.map'
                },
                files: {
                    'temp/app_scripts.min.js': ['temp/app_scripts.js']
                }
            }
        },
        less: {
            app: {
                options: {
                    compress: true,
                    sourceMap: true,
                    sourceMapFileInline: true
                },
                files: {
                    'temp/app.css': 'app/app.less'
                }
            },
            appDist: {
                options: {
                    compress: true,
                    sourceMap: false
                },
                files: {
                    'dist/app.css': 'app/app.less'
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
            },
            teamcity: {
                options: {
                    force: true,
                    reporter: 'checkstyle',
                    reporterOutput: 'temp/reports/jshint_checkstyle.xml'
                },
                files: { src: [createFolderGlobs('*.js')] }
            },
            app: {
                options: {
                    force: true
                },
                files: { src: [createFolderGlobs('*.js')] }
            }
        },
        // lesslint: { //This includes bootstrap, need to figure out how to not include bootstrap.
        //     options: {
        //         csslint: { csslintrc: '.csslintrc' },
        //         force: true
        //     },
        //     teamcity: {
        //         options: {
        //             formatters: [{ id: 'checkstyle-xml', dest: 'temp/reports/csslint_checkstyle.xml' }]
        //         },
        //     },
        //     app: {
        //         src: ["app/app.less"]                
        //     }
        // },
        jasmine: {
            tests: {
                src: ['temp/app_scripts.min.js'],
                options: {
                    junit: {path:"temp/reports/jasmine_junit"},
                    specs: 'app/**/*-spec.js',
                    vendor: ["temp/bower_scripts.js", "temp/vendor_dev_scripts.js"],
                    outfile: 'temp/specrunner.html',
                    keepRunner: true
                }
            }
        },
        connect: {
            tests: {
                options: {
                    port: 9001,
                    open: 'http://localhost:9001/temp/specrunner.html'
                }
            },
            app: {
                options: {
                    port: 9000,
                    open: 'http://localhost:9000/index.html'
                }
            }
        },
        watch: {
            options: {
                livereload: true,
                atBegin: true
            },
            less: {
                files: [createFolderGlobs(['*.less'])],
                tasks: ['less:app'],
                options: {
                    livereload: false
                }
            },
            js: {
                files: [createFolderGlobs(['*.js'])],
                tasks: ['ngAnnotate', 'concat:appScripts', 'uglify']
            },
            devJs: {
                files: [createFolderGlobs('bower_components/*.js')],
                tasks: ['concat:vendorScripts','concat:vendorDevScripts']
            },
            html: {
                files: [createFolderGlobs('*.html'), createFolderGlobs('*.cshtml')],
                tasks: []
            },
            css: {
                files: ['temp/app.css'],
                tasks: []
            },
            bower: {
                files: ['bower.json'],
                tasks: ['bowerinstall']
            },
            tests: {
                files: [createFolderGlobs(['*-spec.js'])],
                tasks: ['jasmine:tests:build']
            }
        },
        concurrent: {
            buildAll: ['buildApp', 'concat:vendorScripts', 'concat:vendorDevScripts', 'less:app', 'jasmine:tests:build']
        }
    });

    grunt.registerTask('bowerinstall', 'install the backend and frontend dependencies', function () {
        var exec = require('child_process').exec;
        var cb = this.async();
        exec('bower install', { cwd: '' }, function (err, stdout, stderr) {
            console.log(stdout);
            cb();
        });
    });

    grunt.registerTask('buildApp', ['ngAnnotate' ,'concat:appScripts', 'uglify']);
    grunt.registerTask('build', ['concurrent:buildAll']);
    grunt.registerTask('serve', ['build', 'connect:app', 'watch']);
    grunt.registerTask('fewer', ['less:app']);
    grunt.registerTask('lintApp', ['jshint:app']);
    grunt.registerTask('lintTeamcity', ['jshint:teamcity']);
    grunt.registerTask('tests', ['build', 'jasmine:tests']);
    grunt.registerTask('debugTests', ['build', 'connect:tests', 'watch:tests']);
};
