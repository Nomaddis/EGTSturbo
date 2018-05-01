var gulp                 = require('gulp');
var concat               = require('gulp-concat');
var plumber              = require('gulp-plumber');
var autoprefixer         = require('gulp-autoprefixer');
var imagemin             = require('gulp-imagemin');
var imageminJpegtran     = require('imagemin-jpegtran');
var pngquant             = require('imagemin-pngquant');
var imageminOptipng      = require('imagemin-optipng');
var less                 = require('gulp-less');
// var less                 = require('gulp-less-sourcemap');
var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var autoprefix           = new LessPluginAutoPrefix({browsers: ["> 0%"]});
var path                 = require('path');
var uglifyCss            = require('gulp-uglifycss');
var uglifyJs             = require('gulp-uglify');
var spritesmith          = require('gulp.spritesmith');
var gutil                = require('gulp-util');
var html2jade            = require('gulp-html2jade');
var jadeInheritance      = require('gulp-jade-inheritance');
var jade                 = require('gulp-jade');
var changed              = require('gulp-changed');
var cached               = require('gulp-cached');
var gulpif               = require('gulp-if');
var filter               = require('gulp-filter');
var connect              = require('gulp-connect');
var htmlhint             = require("gulp-htmlhint");
var urlAdjuster          = require('gulp-css-url-adjuster');
var fs                   = require('fs');
var notifier             = require('node-notifier');
var useref               = require('gulp-useref');
var imageop = require('gulp-image-optimization'); 
var ftp = require( 'vinyl-ftp' );




/*==================================
=            deploy-ftp            =
==================================*/

/** Configuration **/
// FTP_USER=test FTP_PWD=qgX3bret gulp

var user = process.env.FTP_USER;  
var password = process.env.FTP_PWD;  
var host = '5.101.114.45';  
var port = 21;
var localFilesGlob = ['www/**/*'];
var remoteFolder = '/www/test.canvart.com.ua/(project-folder)'

// helper function to build an FTP connection based on our configuration
function getFtpConnection() {  
    return ftp.create({
        host: host,
        port: port,
        user: user,
        password: password,
        parallel: 5,
        log: gutil.log
    });
}

/**
 * Watch deploy task.
 * Watches the local copy for changes and copies the new files to the server whenever an update is detected
 *
 * Usage: `FTP_USER=someuser FTP_PWD=somepwd gulp ftp-deploy-watch`
 */
/*gulp.task('ftp-deploy-watch', function() {

    var conn = getFtpConnection();

    gulp.watch(localFilesGlob)
    .on('change', function(event) {
      console.log('Changes detected! Uploading file "' + event.path + '", ' + event.type);

      return gulp.src( [event.path], { base: 'www/', buffer: false } )
        .pipe( conn.newer( remoteFolder ) ) // only upload newer files 
        .pipe( conn.dest( remoteFolder ) )
      ;
    });
});*/


/*=====  End of deploy-ftp  ======*/

/*===============================
=            connect            =
===============================*/
gulp.task('connect', function() {
  connect.server({
    livereload: true
  });
});
/*=====  End of connect  ======*/

/*===============================
=            plumber            =
===============================*/

// error function for plumber
var onError = function (err) {
  // gutil.beep();
  // console.log(err);
  gutil.log(gutil.colors.red(error.message))
  // Notify on error. Uses node-notifier 
  notifier.notify({
      title: 'Less compilation error',
      message: error.message
  });
  this.emit('end');
};

/*=====  End of plumber  ======*/


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
    .pipe(connect.reload());
});
/*=====  End of jade  ======*/

/*===================================
=            spritesmith            =
===================================*/

gulp.task('sprite', function () {
  var spriteData = gulp.src('./www/img/userful/png-ico/footer-soc/*.*').pipe(
    spritesmith({
      imgName: 'footer-soc-sprite.png',
      cssName: 'footer-soc-sprite.less',
      imgPath: '../img/userful/footer-soc-sprite.png',
      algorithm: 'binary-tree',
      padding: 2,
      sort: false
    })
  );
  return spriteData.pipe(gulp.dest('./www/img/userful/'));
});

/*=====  End of spritesmith  ======*/


/*=====================================
=            sprote retina            =
=====================================*/


gulp.task('sprite-retina', function () {
  var spriteData = gulp.src('./www/img/png-ico/*.png').pipe(

    spritesmith({
      retinaSrcFilter: './www/img/png-ico/*-2x.png',
      imgName: 'ico-sprite.png',
      retinaImgName: 'ico-sprite-2x.png',
      cssName: 'ico-sprite.less',
      imgPath: '../img/',
      algorithm: 'binary-tree',
      padding: 2,
      sort: false
    })
  )

  .pipe(imagemin({
      use: [imageminPngquant()]
  }));
  return spriteData.pipe(gulp.dest('./www/img/'));
});


/*=====  End of sprote retina  ======*/

/*====================================
=            autoprefixer            =
====================================*/

// Browser definitions for autoprefixer
var AUTOPREFIXER_BROWSERS = [
  '> 0%'
];

/*=====  End of autoprefixer  ======*/

/*==============================
=            Concat            =
==============================*/


/*----------  LESS COMPILE START and concat from less/css/*.less  ----------*/


// Gulpfile is placed in project/
// LESS files are placed in project/www/less/
var lessSourceFilesBasePath = path.join('www', 'less')
var lessSourceFiles = path.join(fs.realpathSync(lessSourceFilesBasePath), 'all.less')
 
// gulp.task('less', function () {
//     var cssDestination = path.dirname(lessSourceFiles)
//
//     return gulp
//         .src(lessSourceFiles)
//             .pipe(changed(cssDestination, {extension: '.css'}))
//             .pipe(
//                 less({
//                   sourceMap: {
//                       // sourceMapURL: sourceMapFileName,
//                       // sourceMapBasepath: lessFile.base,
//                       sourceMapRootpath: '../../less', // Optional absolute or relative path to your LESS files
//                       sourceMapFileInline: false
//                   }
//                   // plugins: [autoprefix]
//                 })
//             )
//             .on('error', function (error) {
//                 gutil.log(gutil.colors.red(error.message))
//                 // Notify on error. Uses node-notifier
//                 notifier.notify({
//                     title: 'Less compilation error',
//                     message: error.message
//                 })
//             })
//             .pipe(gulp.dest('./www/css/concat/'));
// });
gulp.task('less', function() {
    return gulp.src('less/all.less')
        .pipe(less())
        .pipe(gulp.dest('www/css/'));
});
gulp.task('autoprefixertask', function() {
    return gulp.src("www/css/concat/*.css")
    .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('./www/css/'))
    .pipe(connect.reload());
});

/*----------  LESS COMPILE END and concat from less/css/*.less  ----------*/


gulp.task('jsConcat', function() {
  return gulp.src([
      './www/js/concat/retina.min.js',
      './www/js/concat/main.js'
     ])
    .pipe(plumber({ errorHandler: onError }))
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./www/js/'));
});

gulp.task('cssConcat', function() {
  return gulp.src([
          './www/css/concat/ion.rangeSlider.css',
          './www/css/concat/ion.rangeSlider.skinHTML5.css',
          './www/css/concat/owl.carousel.css',
          './www/css/concat/all.css'
      ])
    .pipe(plumber({ errorHandler: onError }))
    .pipe(concat('all.css'))
    .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('./www/css/'));
});

/*=====  End of Concat  ======*/


/*=================================
=            html2jade            =
=================================*/

var html2jade__options = {
  nspaces:4,
  tabs: true,
  donotencode: true
};
gulp.task('html2jade', function(){
  gulp.src('www/index.html')
    .pipe(html2jade(html2jade__options))
    .pipe(gulp.dest('template/'));
});

/*=====  End of html2jade  ======*/


/*===============================
=            img min            =
===============================*/
gulp.task('imgMin', function() {
  return gulp.src('www/img/not-compressed/*.jpg')
  .pipe(imageminJpegtran({progressive: true})())
    .pipe(gulp.dest('www/img/compressed/'));
});

/*=====  End of img min  ======*/

gulp.task('compress', function() {
  return gulp.src('./www/js/all.min.js')
    .pipe(uglifyJs())
    .pipe(gulp.dest('./www/js/'));
});

gulp.task('jsConcat-min', function() {
  return gulp.src([
      './www/js/concat/jquery-1.11.3.min.js',
      './www/js/concat/bs-js/*.js',
      './www/js/concat/main.js'
     ])
    .pipe(plumber())
    .pipe(concat('all.min.js'))
    .pipe(uglifyJs())
    .pipe(gulp.dest('./www/js/'));
});


/*==========================================
=            chenge path to img            =
==========================================*/

gulp.task('cssRaplace', function() {
 return gulp.src('www/css/all.css').
    pipe(urlAdjuster({
      replace:  ['../img/','images/'],
    }))
    .pipe(gulp.dest('www/css/'));
});

/*=============================
=            watch            =
=============================*/

gulp.task('setWatch', function() {
    global.isWatching = true;
});


// if project add here "ftp-deploy-watch"
gulp.task('watch', ['setWatch', 'jade', /*'ftp-deploy-watch'*/], function() {
    gulp.watch('www/less/**/*.less', ['less']);
    gulp.watch('www/css/concat/all.css');
    // gulp.watch('www/css/concat/all.css', ['autoprefixertask']);
    // gulp.watch('www/js/**/*.js',[ 'userefWatch']);
    gulp.watch('template/**/*.jade', ['jade']); 
});

/*=====  End of watch  ======*/


gulp.task('imagesOpti', function(cb) {
    gulp.src(['www/img/not-compressed/**/*.png','www/img/not-compressed/**/*.jpg','www/img/not-compressed/**/*.gif','www/img/not-compressed/**/*.jpeg']).pipe(imageop({
        optimizationLevel: 10,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('www/img/compressed/')).on('end', cb).on('error', cb);
});



/*===============================
=            default            =
===============================*/

gulp.task('default', ['connect', 'watch']);

/*=====  End of default  ======*/