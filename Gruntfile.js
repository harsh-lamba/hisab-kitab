/*
# Author : Harsh Kumar Lamba
# Date : 
# Description : Grunt file handling different task to automate tasks via sass compile, watch files, concatenate, htmllint.
*/

'use strict';


module.exports = function(grunt) {
  //Loading packages using matchdep package
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),
    
    project : {
      app : 'app', 
      pages : '<%= project.app %>/pages',
      assets : '<%= project.app %>/assets',
      stylesheets : '<%= project.assets %>/sass'
    },
    
    //Watch
    watch: {
      css : {
        files : '<%= project.stylesheets %>/**/*.css'
      },
      sass: {
        files: ['<%= project.stylesheets %>/**/*.scss', '<%= project.stylesheets %>/main.scss', '<%= project.pages %>/**/*.scss'],
        //files: ['sass/**/*.{scss,sass}','sass/_partials/**/*.{scss,sass}'],
        tasks: ['sass:dev']
      },
      livereload: {
        files: ['*.html', '*.php', 'js/**/*.{js,json}', 'css/*.css','img/**/*.{png,jpg,jpeg,gif,webp,svg}'],
        options: {
          livereload: true
        }
      }
    },
    
    //Sass Compiling
    sass: {
      options: {
        sourceMap: true,
        // loadPath: require('node-bourbon').with('other/path', 'another/path')
        includePaths: require('node-bourbon').includePaths
        //outputStyle: 'compressed'
      },
      dev: {
        options: {
          style : 'expanded',
        },
        files : {
          'app/build/build.css' : '<%= project.stylesheets %>/main.scss'
        }
      },
      dist: {
        options : {
          outputStyle: 'compressed'  
        },
        files: {
          'app/build/build.css' : '<%= project.stylesheets %>/main.scss'
        }
      }
    }, 
    
    cssmin: {
      target: {
        files: {
          'app/build/build.css': ['<%= project.stylesheets %>/**/*.css', 'app/build/build.css']
        }
      }
    },

    
    concat_css: {
      options: {
        // Task-specific options go here.
      },
      all: {
        src: ["<%= project.stylesheets %>/**/*.css", "app/build/build.css"],
        dest: "app/build/build.css"
      },
    },

    htmlhint: {
        build: {
          options: {
              'tag-pair': true,
              'tagname-lowercase': true,
              'attr-lowercase': true,
              'attr-value-double-quotes': true,
              'doctype-first': true,
              'spec-char-escape': true,
              'id-unique': true,
              'head-script-disabled': true,
              'style-disabled': true
          },
          src: ['app/index.html']
        }
    },

    connect: {
      server: {
        options: {
          port: 9001,
          keepalive : true,
          directory: ' ',
          debug : true
        }
      }
    }
  });

  grunt.registerTask('default', [
    'sass:dev',
    'concat_css',
    'htmlhint',
    'watch'
  ]);
  grunt.registerTask('server', [
    'connect'
  ]);

};