//
// Create distribution, would include minification for production system.
// Run server on port 3010 and trigger browser reload on changes.
//
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var express = require('express');
var browserSync = require('browser-sync').create();
var minifyCss = require('gulp-minify-css');
var minify = require('gulp-minify');
var server;

gulp.task('html', function() {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist'))
});

gulp.task('images', function() {
    return gulp.src('src/images/**/*.png')
        .pipe(gulp.dest('dist/images'));
});

gulp.task('lib', function() {
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
        .pipe(minify())
        .pipe(gulp.dest('dist/js'));
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

gulp.task('build', ['html', 'images', 'styles', 'scripts', 'lib']);
gulp.task('default', ['serve']);


