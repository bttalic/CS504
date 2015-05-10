module.exports = function (grunt) {
    grunt.initConfig({
        bower: {
            install: {
                options: {
                    targetDir: "./lib",
                    layout: "byComponent",
                    cleanTargetDir: false
                }
            }
        },
        watch: {
            files: ["Scripts/*.js", "Stylesheets/*.css"],
            tasks: ["uglify", "cssmin"]
        },
        uglify: {
            scripts: {
                files: { "./app.js": ["./Scripts/**/*.js"] }
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'style.css': ["./Stylesheets/**/*.css"]
                }
            }
        }
    });


    grunt.registerTask("default", ["watch"]);
    grunt.registerTask("bower", ["bower:install"]);
    grunt.registerTask("uglify", ["uglify"]);
    grunt.registerTask("cssmin", ["cssmin"]);

    // The following line loads the grunt plugins.
    // This line needs to be at the end of this this file.
    grunt.loadNpmTasks("grunt-bower-task");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-contrib-cssmin');
};