var gulp = require('gulp');
  plumber = require('gulp-plumber'), // Prevent pipe breaking caused by errors from gulp plugins.
  uglify = require('gulp-uglify'), // Minify JavaScript with UglifyJS.
  concat = require('gulp-concat'), // It concats files to a single file.
  sourcemaps = require('gulp-sourcemaps'), // Inline maps are embedded in the source file.
  sass = require('gulp-sass'),
  server = require('gulp-express');

var paths = {
  ui: [
    './www/js/src/ui/init.js',
    './www/js/src/ui/lib/**/*.js',
    './www/js/src/ui/end.js'
  ],
  sass: './www/sass/**/*.sass'
};

gulp.task('ui', function() {
  return gulp.src(paths.ui)
    .pipe(concat('ui.js'))
    .pipe(gulp.dest('./www/js/build/'));
});

gulp.task('sass', function () {
  gulp.src(paths.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./www/css'));
});

gulp.task('compile_3pjs', function () {
  gulp.src([
      './bower_components/angular/angular.js',
      './bower_components/angular-aria/angular-aria.js',
      './bower_components/angular-animate/angular-animate.js',
      './bower_components/angular-material/angular-material.js',
      './bower_components/angular-ui-router/release/angular-ui-router.js',
      './bower_components/satellizer/satellizer.js'
    ])
    .pipe(plumber())
    .pipe(concat('3p.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('www/build'));
});

gulp.task('compile_3pcss', function () {
  gulp.src([
    './bower_components/angular-material/angular-material.css'
    ])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat('3p.css'))
    //.pipe(uglify()) // Development mode.
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('www/build'));
});

gulp.task('server', function () {
    // Start the server at the beginning of the task 
    server.run(['app.js']);

    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.ui, ['ui', server.run]);
    gulp.watch(['app.js', 'routes/**/*.js'], [server.run]);
});
