var gulp = require('gulp'),
	less = require('gulp-less'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer'),
	minifycss = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	notify = require('gulp-notify'),
	reload = require('gulp-livereload'),
	connect = require('gulp-connect'),
	uglify = require('gulp-uglify'),
	jshint = require('gulp-jshint'),
	concat = require('gulp-concat'),
	imagemin = require('gulp-imagemin'),
	include = require("gulp-include"),
	pngquant = require('imagemin-pngquant'),
	babel = require('gulp-babel'),
	watch = require('gulp-watch'),
	postcss = require('gulp-postcss'),
	reporter = require('postcss-reporter'),
	syntax_scss = require('postcss-scss'),
	stylelint = require('stylelint'),
	stylelintConfig = require('./stylelintConfig.js');


//scss lint
gulp.task('scss-lint', function() {

	var processors = [
		stylelint(stylelintConfig),
		reporter({
			cleanMessages: true,
			throwError: true
		})
	];

	return gulp.src(['build/sass/**/*.scss',
      // Ignore linting vendor assets
      // Useful if you have bower components
      '!build/sass/vendor/**/*.scss',
      '!build/sass/bootstrap/**/*.scss'])
	.pipe(postcss(processors, {syntax: syntax_scss}));
});

//sass
gulp.task('sass', function() {
	return gulp.src('build/sass/**/*.scss')  // Берем источник
		.pipe(sourcemaps.init())
		.pipe(sass()) // Проебразуем Sass в CSS посредством gulp-sass
		.pipe(autoprefixer({browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']}))
		.pipe(rename({suffix: '.min'}))
		.pipe(sourcemaps.write())
		.pipe(minifycss())
		.pipe(gulp.dest('assets/css')) // Выгружаем результат в папку assets/css
		.pipe(connect.reload())
		.pipe(notify({
			message: 'scss!'
		}));

});

//less
gulp.task('styles', function() {
	return gulp.src('build/less/style.less')
	.pipe(less())
	.pipe(autoprefixer(['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']))
	.pipe(rename({
		suffix: '.min'
	}))
	.pipe(minifycss())
	.pipe(gulp.dest('assets/css'))
	.pipe(connect.reload())
	.pipe(notify({
		message: 'css!'
	}));
});

gulp.task('img', function () {
	return gulp.src('build/img/*')
	.pipe(imagemin({
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	}))
	.pipe(gulp.dest('assets/img'))
	.pipe(connect.reload())
	.pipe(notify({
		message: 'img`s!'
	}));
});

//server
gulp.task('connect', function() {
	connect.server({
		root: '',
		livereload: true
	});
});

//html
gulp.task('html', function () {
	gulp.src('*.html')
	.pipe(connect.reload())
	.pipe(notify({
		message: 'html!'
	}));
});

//js
gulp.task('scripts', function() {
	return gulp.src('build/js/my/**/*.js')
	.pipe(include({
		 extensions: "js"
	}))
	.on('error', console.log)
	.pipe(babel({
		presets: ['es2015']
	}))
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
	.pipe(gulp.dest('assets/js'))
	.pipe(rename({suffix: '.min'}))
	.pipe(uglify())
	.pipe(gulp.dest('assets/js'))
	.pipe(connect.reload())
	.pipe(notify({ message: 'app.js' }));
});

//watcher
gulp.task('watch', function () {
	gulp.watch(['*.html'], ['html']);
	gulp.watch(['build/js/my/*.js'], ['scripts']);
	gulp.watch(['build/sass/*.scss'], ['scss-lint', 'sass']);
	gulp.watch(['build/less/*.less'], ['styles']);
	gulp.watch(['build/img/*'], ['img']);
});

gulp.task('default', ['connect', 'watch']);



