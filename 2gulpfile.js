var gulp = require('gulp'),
    less = require('gulp-less');
    browserSync = require("browser-sync"),
    path = require('path'),
    reload = browserSync.reload,
    uglify = require('gulp-uglify');
var jade   = require('gulp-jade');
var cached  = require('gulp-cached');
var changed = require('gulp-changed');
var gulpif = require('gulp-if');
var jadeInheritance = require('gulp-jade-inheritance');
var filter  = require('gulp-filter');
const autoprefixer = require('gulp-autoprefixer');
var config = {
    server: {
        baseDir: "./www"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend_Devil"
};
gulp.task('less', function() {
    return gulp.src('www/less/all.less')
        .pipe(less())
        .pipe(gulp.dest('www/css/'));
});

gulp.task('browser-sync', function () {
    browserSync(config);
});
/*============================
 =            jade            =
 ============================*/
'use strict';

gulp.task('htmlhint', function() {
    return gulp.src("www/*.html")
        .pipe(htmlhint())
});

gulp.task('jade', function() {
    return gulp.src('template/**/*.jade')

    //only pass unchanged *main* files and *all* the partials
        .pipe(changed('dist', {extension: '.html'}))

        //filter out unchanged partials, but it only works when watching
        .pipe(gulpif(global.isWatching, cached('jade')))

        //find files that depend on the files that have changed
        .pipe(jadeInheritance({basedir: 'template'}))

        //filter out partials (folders and files starting with "_" )
        .pipe(filter(function (file) {
            return !/\/_/.test(file.path) && !/^_/.test(file.relative);
        }))
        //process jade templates
        // .pipe(plumber({ errorHandler: onError }))
        .pipe(jade({
            pretty: true
        }))
        // concat links, scripts in one publish file without minification
        // .pipe(useref({ searchPath: 'www/' }))
        //save all the files
        .pipe(gulp.dest('www/'))
        .pipe(browserSync.reload());
});
/*=====  End of jade  ======*/

gulp.task('autoprefixer', function() {
    gulp.src('www/css/all.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('www/css/'));
});

gulp.task('watch', ['browser-sync'], function(){
    gulp.watch('www/less/**/*.less', ['less', browserSync.reload]);
    gulp.watch('template/**/*.jade', ['jade', browserSync.reload]);
    // gulp.watch('web/js/*.js', ['babel', browserSync.reload]);
    // gulp.watch('www/css/**/*.css', ['autoprefixer', browserSync.reload]);
    // Other watchers
});

gulp.task('default', ['browser-sync', 'watch']);