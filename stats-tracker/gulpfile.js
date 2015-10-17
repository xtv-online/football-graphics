'use strict';

var _ = require('lodash'),
    assetsConfig = require('./config/gulp-assets.config'),
    watchLocations = require('./config/watch-locations.config'),
    gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    runSequence = require('run-sequence'),
    plugins = gulpLoadPlugins(),
    path = require('path');

// Set NODE_ENV to 'development'
gulp.task('env:dev', function() {
    process.env.NODE_ENV = 'development';
});

// Set NODE_ENV to 'production'
gulp.task('env:prod', function() {
    process.env.NODE_ENV = 'production';
});

// Nodemon task
gulp.task('nodemon', function() {
    return plugins.nodemon({
        script: 'index.js',
        nodeArgs: ['--debug'],
        ext: 'js,html',
        watch: watchLocations.server
    });
});

// Watch Files For Changes
gulp.task('watch', function() {
    // Start livereload
    plugins.livereload.listen();

    // Add watch rules
    gulp.watch(watchLocations.html).on('change', plugins.livereload.changed);
    gulp.watch(watchLocations.js, ['js']).on('change', plugins.livereload.changed);
    gulp.watch(watchLocations.less, ['less']).on('change', plugins.livereload.changed);
});

gulp.task('less', function() {
    return gulp.src(watchLocations.less)
        .pipe(plugins.less())
        .pipe(plugins.concat('client.css'))
        .pipe(gulp.dest('public/css'));
});

gulp.task('vendorCSS', function() {
    return gulp.src(assetsConfig.css)
        .pipe(plugins.concat('vendor.css'))
        .pipe(gulp.dest('public/css'));
});

gulp.task('js', function () {
    return gulp.src(watchLocations.js)
        .pipe(plugins.sourcemaps.init())
            .pipe(plugins.concat('application.js'))
            .pipe(plugins.ngAnnotate())
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest('public/js'));
});

gulp.task('vendorJS', function () {
    return gulp.src(assetsConfig.js)
        .pipe(plugins.concat('vendor.js'))
        .pipe(gulp.dest('public/js'));
});

gulp.task('fonts', function () {
    return gulp.src(assetsConfig.fonts)
        .pipe(gulp.dest('public/fonts'));
});

gulp.task('vendor', function (done) {
    runSequence('vendorJS', 'vendorCSS', done);
});

// Lint CSS and JavaScript files.
gulp.task('build', function(done) {
    runSequence('less', 'js', 'fonts', 'vendor', done);
});

// Run the project in development mode
gulp.task('default', function(done) {
    runSequence('build', ['nodemon', 'watch'], done);
});
