var	autoprefixer = require('gulp-autoprefixer'),
	babel = require('gulp-babel'),
	browserify = require('browserify'),
	babelify = require('babelify'),
	connect = require('gulp-connect'),
	concat = require('gulp-concat'),
	jshint = require('gulp-jshint'),
	imagemin = require('gulp-imagemin'),
	include = require("gulp-include"),
 	gulp = require('gulp'),
 	gutil = require('gulp-util'),
	less = require('gulp-less'),
	minifycss = require('gulp-minify-css'),
	notify = require('gulp-notify'),
	pngquant = require('imagemin-pngquant'),
	postcss = require('gulp-postcss'),
	rename = require('gulp-rename'),
	reload = require('gulp-livereload'),
	reporter = require('postcss-reporter'),
	sass = require('gulp-sass'),
	source = require('vinyl-source-stream'),
	sourcemaps = require('gulp-sourcemaps'),
	syntax_scss = require('postcss-scss'),
	stylelint = require('stylelint'),
	stylelintConfig = require('./stylelintConfig.js'),
	uglify = require('gulp-uglify'),
	watch = require('gulp-watch');


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
		.pipe(autoprefixer(['last 2 version', 'safari 5', 'safari 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']))
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



// jsx
gulp.task('jsx', function() {
	return browserify({
        entries: './build/js/my/app.jsx',
        extensions: ['.jsx'],
        debug: true
    })
    .transform('babelify', {
        presets: ['es2015', 'react'],
        plugins: ['transform-class-properties']
    })
    .bundle()
    .on('error', function(err){
        gutil.log(gutil.colors.red.bold('[browserify error]'));
        gutil.log(err.message);
        this.emit('end');
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./assets/js/'))
    .pipe(connect.reload())
	.pipe(notify({ message: 'jsx' }));;
});

//watcher
gulp.task('watch', function () {
	gulp.watch(['*.html'], ['html']);
	gulp.watch(['build/js/my/*.js'], ['scripts']);
	gulp.watch(['build/js/my/*.jsx'], ['jsx']);
	gulp.watch(['build/sass/*.scss'], ['scss-lint', 'sass']);
	gulp.watch(['build/less/*.less'], ['styles']);
	gulp.watch(['build/img/*'], ['img']);
});

gulp.task('default', ['connect', 'watch']);



