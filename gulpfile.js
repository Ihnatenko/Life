'use strict';

var gulp        = require('gulp'),
    watch       = require('gulp-watch'),
    prefixer    = require('gulp-autoprefixer'),
    uglify      = require('gulp-uglify-es').default,
    notify      = require('gulp-notify'),
    // cssmin      = require('gulp-minify-css'),
    scss        = require('gulp-sass'),
    //sourcemaps  = require('gulp-sourcemaps'),
    cleanCSS    = require('gulp-clean-css'),
    livereload  = require('gulp-livereload'),
    args        = require('yargs').argv,
    sftp        = require('gulp-sftp'),
    iconfont    = require('gulp-iconfont'),
    iconfontCss = require('gulp-iconfont-css');
    // replace     = require('gulp-replace');

var path = {
    build: {
        js:   'js/',
        css:  'css/',
        icon: 'font/Icons/fonts/'
    },
    src: {
        js:     'assets/js/*.js',
        scss:   'assets/scss/**/*.scss',
        css:    'assets/css/**/*.css',
        icon:   'assets/icon/**/*.svg',
        icon_tc: 'assets/icon/templates/template.css',
        icon_th: 'assets/icon/templates/template.html'
    },
    watch: {
        js:   'assets/js/**/*.js',
        scss: 'assets/scss/**/*.scss',
        css:  'assets/css/**/*.css',
        html: 'assets/templates/**/*.php',
        snip: 'assets/snippets/**/*.php',
        icon: 'assets/icon/**/*.svg'
    }
};

gulp.task('icon:build', function(){
  gulp.src([path.src.icon])
    .pipe(iconfontCss({
      fontName: 'icomoon',
      path: path.src.icon_tc,
      targetPath: '../style.css',
      fontPath: path.build.icon,
    }))
    .pipe(iconfont({
      fontName: 'icomoon',
      formats: ['ttf', 'eot', 'woff', 'svg'],
      prependUnicode: true,
      normaize: true,
     }))
    .pipe(gulp.dest(path.build.icon));

  gulp.src([path.src.icon])
    .pipe(iconfontCss({
      fontName: 'icomoon',
      path: path.src.icon_th,
      targetPath: '../demo.html',
      fontPath: path.build.icon,
    }))
    .pipe(gulp.dest(path.build.icon));
});


gulp.task('js:build', function () {
  gulp.src(path.src.js)
    // .pipe(uglify())
    .pipe(gulp.dest(path.build.js));
});

gulp.task('js:build:prod', function () {
  gulp.src(path.src.js)
      .pipe(uglify())
      .pipe(gulp.dest(path.build.js));
});

var scss_current;
gulp.task('scss:build:small', function () {
    return gulp.src(scss_current)
               .pipe(scss())
               .on('error', notify.onError())
               .pipe(prefixer())
               .pipe(cleanCSS({compatibility: 'ie8'}))
               .pipe(gulp.dest(path.build.css));
});

gulp.task('scss:build', function () {
    return gulp.src(path.src.scss)
               .pipe(scss())
               .on('error', notify.onError())
               .pipe(prefixer())
               .pipe(cleanCSS({compatibility: 'ie8'}))
               .pipe(gulp.dest(path.build.css));
});

gulp.task('css:build', function(){
    gulp.src(path.src.css)
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(path.build.css));
});

gulp.task('build', [
          'js:build',
          'scss:build',
          'css:build',
          'icon:build'
]);


gulp.task('watch', function(){

  // livereload.listen();
  watch([path.watch.scss], function(event, cb) {
    var eventJSON = JSON.stringify(event);
    var eventObj = JSON.parse(eventJSON);
    // console.log(a.history);
    scss_current = eventObj.history[0];

    gulp.start('scss:build:small');
  });

  watch([path.watch.js],   function(event, cb) {
      gulp.start('js:build');
  });

  watch([path.watch.icon],  function(event, cb){
    gulp.start('icon:build');
  })

});

gulp.task('default', ['build', 'watch']);

gulp.task("live", function() {
  livereload.listen();
  gulp.watch(path.watch.scss, ['reload']);
  gulp.watch(path.watch.html, ['reload']);
  gulp.watch(path.watch.js,   ['reload']);
  gulp.watch(path.watch.snip, ['reload']);
});

gulp.task("reload", function() {
  gulp.src([path.watch.scss])
  .pipe(livereload());
})
