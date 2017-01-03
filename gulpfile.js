var gulp = require('gulp'),
    rollup = require('gulp-rollup'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    uglify = require('gulp-uglify');

gulp.task('clean', function () {
    return gulp.src('./build')
        .pipe(clean());
});


gulp.task('dev', function () {
    gulp.watch(['./src/**/**/*.js'], ['build']);
});

gulp.task('build', ['clean'], function () {
    gulp.src('./src/**/**/*.js')
        .pipe(rollup({
            entry: './src/index.js',
            format: 'umd',
            moduleName: 'DiffRender'
        }))
        .pipe(rename('diffRender.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(uglify())
        .pipe(rename('diffRender-min.js'))
        .pipe(gulp.dest('./dist'));
});
