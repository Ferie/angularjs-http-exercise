/**
 * Gulp
 * 
 * Author: Riccardo Andreatta
 * 
 * Path variables that match the project structure:
 * 
 * 'pathHtml' this is the folder where there are all your HTML files,
 * 'pathSass' this is the root folder where there are all your SASS files,
 * 'pathJs' this is the root folder where there are all your JavaScript files,
 * 'jsLibs' this is the folder where there are all your JavaScripts libraries (they are not linted and concatenated before the other JS files),
 * 'distCssPath' this is the folder where you want the built CSS file be put,
 * 'distCssFile' and this is the name of the built CSS file,
 * 'distJsPath' this is the folder where you want the built JS file be put,
 * 'distJsFile' and this is the name of the built JS file.
 * 
 * Note: Running Gulp with the suffix '--type production' it minifies the distCssFile and uglifies the distJsFile
 * 
 */

'use strict';

/****************************************************/
/* GULP CONFIGURATION                               */
/****************************************************/

var pathHtml = 'app/',
    pathSass = 'assets/sass/',
    pathJs = 'app/',
    jsLibs = 'assets/js/libs/',
    distPath = 'dist/',
    distCssPath = 'dist/css/',
    distCssFile = 'riccardo.css',
    distJsPath = 'dist/js/',
    distJsFile = 'riccardo.js';

/****************************************************/
/*** You should leave the remaining part as it is ***/
/****************************************************/

// Require Gulp and other plugins
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    connect = require('gulp-connect'),
    modRewrite = require('connect-modrewrite'),
    del = require('del'),
    sass = require('gulp-sass'),
    csslint = require('gulp-csslint'),
    cssmin = require('gulp-cssmin'),
    htmlhint = require('gulp-htmlhint'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify');

var handleError = function (error) {
    gutil.beep();
    gutil.log(gutil.colors.red('ERROR: ' + error));
    this.emit('end');
};

// Remove all file in distribution folder
gulp.task('clean', function() {
    gutil.log('Gulp is deleting the files inside folders:\n', distCssPath, '\n', distJsPath);
    return del([distCssPath, distJsPath]);
});

// Validate HTML
gulp.task('html', function() {
    gutil.log('Gulp is validating the HTML...');
    return gulp.src([
            pathHtml + '*.html',
            pathHtml + '**/*.html'
        ])
        .pipe(htmlhint({
            "alt-require": true,
            "attr-unsafe-chars": false,
            'doctype-first': false,
            "inline-script-disabled": true,
            "inline-style-disabled": true,
            "spec-char-escape": false,
            "tag-pair": false,
            "tagname-lowercase": true
        }))
        .pipe(htmlhint.reporter('htmlhint-stylish'));
});

// Compile Sass & Minify CSS
gulp.task('sass', function() {
    gutil.log('Gulp is compiling the SASS');
    return gulp.src(pathSass + '*.scss')
        .pipe(sourcemaps.init()) // Process the original sources
            .pipe(sass())
            .on('error', handleError)
            .pipe(concat(distCssFile))
            .on('error', handleError)
            // Only minify if Gulp is ran with '--type production'
            .pipe(gutil.env.type === 'production' ? cssmin() : gutil.noop())
            .on('error', handleError)
        .pipe(sourcemaps.write()) // Add the map to modified source
        .pipe(gulp.dest(distCssPath))
        .pipe(connect.reload());
});

// Validate CSS
gulp.task('css', ['sass'], function() {
    gutil.log('Gulp is validating the CSS...');
    return gulp.src([distCssPath + distCssFile])
        .pipe(csslint({
            'order-alphabetical': false,
            'outline-none': false,
            'box-sizing': false,
            'adjoining-classes': false,
            'compatible-vendor-prefixes': true,
            'vendor-prefix': true
        }))
        .pipe(csslint.formatter());
});

// Validate JS
gulp.task('js', function() {
    gutil.log('Gulp is validating the JavaScripts...');
    return gulp.src([
            pathJs + '*.js',
            pathJs + '**/*.js',
            '!' + jsLibs + '*.*'
        ])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

// Concatenate & Minify JS
gulp.task('scripts', ['js'], function() {
    gutil.log('Gulp is concatenating the JavaScripts');
    return gulp.src([
            jsLibs + '*.js',
            pathJs + '*.js',
            pathJs + '**/*.js'
        ])
        .pipe(sourcemaps.init()) // Process the original sources
            .pipe(concat(distJsFile))
            .on('error', handleError)
            // only uglify if gulp is ran with '--type production'
            .pipe(gutil.env.type === 'production' ? uglify({mangle: false}) : gutil.noop())
            .on('error', handleError)
        .pipe(sourcemaps.write()) // Add the map to modified source
        .pipe(gulp.dest(distJsPath))
        .pipe(connect.reload());
});

// Lint Task
gulp.task('lint', ['html', 'css', 'js'], function() {
    return;
});

// Server Task with Livereload
gulp.task('server', ['watch'], function () {
    connect.server({
        root: __dirname,
        livereload: true,
//        livereload.port: 35729,
        fallback: 'app/index.html',
        port: process.env.PORT || 9050,
        host: 'localhost',
        middleware: function () {
            return [
                modRewrite([
                    '^/api/(.*)$ http://localhost:9050/api/v1/$1 [P]'
                ])
            ];
        }
    });
});

// Watch Task
gulp.task('watch', ['sass', 'scripts'], function() {
    gulp.watch([
        pathHtml + '*.html',
        pathHtml + '**/*.html'],
    ['html'])
    .on('change', function(event) {
        gutil.log('File ' + event.path + ' was ' + event.type);
        gutil.log('===============');
        gutil.log('| Building... |');
        gutil.log('===============');
    });
    gulp.watch([
        pathJs + '*.js',
        pathJs + '**/*.js'],
    ['scripts'])
    .on('change', function(event) {
        gutil.log('File ' + event.path + ' was ' + event.type);
        gutil.log('===============');
        gutil.log('| Building... |');
        gutil.log('===============');
    });
    gulp.watch([
        pathSass + '*.*',
        pathSass + '**/*.*'],
    ['sass'])
    .on('change', function(event) {
        gutil.log('File ' + event.path + ' was ' + event.type);
        gutil.log('===============');
        gutil.log('| Building... |');
        gutil.log('===============');
    });
    gutil.log('===========================');
    gutil.log('| Gulp is now watching... |');
    gutil.log('===========================');
});

// Default Task
gulp.task('default', ['clean'], function() {
    gutil.log('===========================');
    gutil.log('| Gulp is now building... |');
    gutil.log('===========================');
    gulp.start('html', 'sass', 'scripts');
});


/****************************************************/
/* ADD HEADER TO MINIMIZED FILES                    */
/****************************************************/

var header = require('gulp-header');
var fs = require('fs');
var pkg = JSON.parse(fs.readFileSync('package.json'));
var opts = {
    banner: [
        '/**',
        ' * <%= description %> - <%= homepage %>',
        ' * Version - <%= version %>',
        ' *',
        ' * Copyright (c) <%= new Date().getFullYear() %> <%= author.company %>',
        ' */\n\n'
    ].join('\n')
};


/****************************************************/
/* CLOUD PRODUCTION ENVIRONMENT TASKS               */
/****************************************************/

// Compile Sass & Minify CSS for cloud production environment
gulp.task('production:styles', function() {
    gutil.log('Gulp is compiling the SASS and concatenating and minifying the CSS');
    return gulp.src(pathSass + '*.scss')
        .pipe(sass())
        .pipe(concat(distCssFile))
        .pipe(cssmin())
        .pipe(header(opts.banner, pkg))
        .pipe(gulp.dest(distCssPath));
});

// Concatenate & Minify JS for cloud production environment
gulp.task('production:scripts', function() {
    gutil.log('Gulp is concatenating and minifying the JavaScripts');
    return gulp.src([
            jsLibs + '*.js',
            pathJs + '*.js',
            pathJs + '**/*.js'
        ])
        .pipe(concat(distJsFile))
        .pipe(uglify({mangle: false}))
        .pipe(header(opts.banner, pkg))
        .pipe(gulp.dest(distJsPath));
});

// Default cloud production task
gulp.task('production:default', ['clean'], function() {
    gutil.log('===========================');
    gutil.log('| Gulp is now building... |');
    gutil.log('===========================');
    gulp.start('production:styles', 'production:scripts');
});
