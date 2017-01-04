var gulp = require('gulp'),
    rollup = require('gulp-rollup'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    gutil = require('gulp-util');

gulp.task('clean', function () {
    return gulp.src('./build')
        .pipe(clean());
});


gulp.task('dev', ['build'], function () {
    gulp.watch(['./src/**/**/*.js'], ['build']);
});

gulp.task('build', ['clean'], function () {
    gulp.src('./src/**/**/*.js')
        .pipe(plumber(function (error) {
            gutil.log(gutil.colors.red(error.message));
            this.emit('end');
        }))
        .pipe(rollup({
            entry: './src/index.js',
            format: 'umd',
            moduleName: 'DiffRender',
            useStrict: false
        }))
        .pipe(rename('diffRender.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(uglify())
        .pipe(rename('diffRender-min.js'))
        .pipe(gulp.dest('./dist'));
});
