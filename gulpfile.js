var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var strip = require('gulp-strip-comments');

gulp.task('minify', function() {
	return gulp.src('src/logaxe.js')
		.pipe(rename({prefix: 'angular-', suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});

gulp.task('full', function() {
	return gulp.src('src/logaxe.js')
		.pipe(rename({prefix: 'angular-'}))
		.pipe(strip())
		.pipe(gulp.dest('dist'));
});

// Default Task
gulp.task('default', ['minify', 'full']);