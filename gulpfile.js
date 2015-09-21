//
// Create distribution, would include minification for production system.
// Run server on port 3010 and trigger browser reload on changes.
//
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var express = require('express');
var browserSync = require('browser-sync').create();
var jshint = require('gulp-jshint');
var w3cjs = require('gulp-w3cjs');

var replace = require('gulp-replace');
var minifyCss = require('gulp-minify-css');
var minifyHtml = require('gulp-minify-html');
var minify = require('gulp-minify');
var del = require('del');

var server;


gulp.task('html', function(){
    gulp.src(['src/index.html'])
        .pipe(replace(/info-window.js/g, 'info-window-min.js'))
        .pipe(replace(/places-list.js/g, 'places-list-min.js'))
        .pipe(replace(/view-model.js/g, 'view-model-min.js'))
        .pipe(replace(/model.js/g, 'model-min.js'))
        .pipe(replace(/yelp-search.js/g, 'yelp-search-min.js'))
        .pipe(replace(/meetup-search.js/g, 'meetup-search-min.js'))
        .pipe(minifyHtml())
        .pipe(gulp.dest('dist/'));
});


gulp.task('images', function() {
    return gulp.src('src/images/**/*.png')
        .pipe(gulp.dest('dist/images'));
});

gulp.task('libs', function() {
    return gulp.src('src/lib/**/*.js')
        .pipe(gulp.dest('dist/lib'));
});

gulp.task('styles', function() {
    return gulp.src('src/styles/**/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('scripts', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(minify({mangle: false}))
        .pipe(gulp.dest('dist/js'));
});


gulp.task('deljs', function() {
    return del(['dist/js/model.js', 'dist/js/places-list.js', 'dist/js/view-model.js', 'dist/js/yelp-search.js' ]);
});


gulp.task('w3cjs', function () {
    gulp.src('src/*.html')
        .pipe(w3cjs());
});

gulp.task('lint', function() {
    return gulp.src('./src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('serve', function() {
    browserSync.init({
        server: "./src",
        port: 3010
    });
    gulp.watch("src/*.html").on('change', browserSync.reload);
    gulp.watch("src/js/**/*.js").on('change', browserSync.reload);
    gulp.watch('src/styles/**/*').on('change', browserSync.reload);
});

gulp.task('build', ['styles', 'scripts', 'html', 'images', 'libs', 'deljs']);
gulp.task('default', ['serve']);


