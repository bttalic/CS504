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
            files: ["Scripts/*.js"],
            tasks: ["uglify"]
        },
        uglify: {
            target: {
                files: { "./app.js": "Scripts/app.js" }
            }
        }
    });


    grunt.registerTask("default", ["watch"]);
    grunt.registerTask("bower", ["bower:install"]);
    grunt.registerTask("uglify", ["uglify"]);

    // The following line loads the grunt plugins.
    // This line needs to be at the end of this this file.
    grunt.loadNpmTasks("grunt-bower-task");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");
};