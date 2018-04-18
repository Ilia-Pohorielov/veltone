'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    iconfont = require('gulp-iconfont'),
    iconfontCss = require('gulp-iconfont-css'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    spritesmith  = require('gulp.spritesmith'),
    rename  = require('gulp-rename'),
    pug = require('gulp-pug'),
    newer = require('gulp-newer'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    gulpPugBeautify = require('gulp-pug-beautify');

var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img_content: 'build/images/',
        img_icons: 'build/images/',
        fonts: 'build/css/fonts/',
        assets: 'build/assets/'
    },
    src: { //Пути откуда брать исходники
        pug: 'app/templates/**/*.pug', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: 'app/js/main.js',//В стилях и скриптах нам понадобятся только main файлы
        js_plugin: 'app/js/all-plugins.js',//В стилях и скриптах нам понадобятся только main файлы
        style_sass: 'app/sass/**/*.scss',
        style_css: 'app/css/all-plugins.css',
        img_content: 'app/assets/**/*.*', //Синтаксис images/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        img_icons: 'app/images/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        fonts: 'app/css/fonts/**/*.*'
    },
    clean: './build'
};

// собираем иконки в шрифт
var fontName = 'Icons';
gulp.task('iconfont', function(){
    return gulp.src(['app/images/icons/*.svg'])
        .pipe(iconfontCss({
            fontName: fontName,
            targetPath: '../../sass/_icons.scss',
            fontPath: 'fonts/'
        }))
        .pipe(iconfont({
            fontName: fontName,
            formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
            normalize: true,
            centerHorizontally: true,
            fontHeight: 1001
        }))
        .pipe(gulp.dest('app/css/fonts/'));
});

gulp.task('sprite:build', function() {
    var spriteData =
        gulp.src('./app/images/sprite/*.*')
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: '_sprite.scss',
                imgPath: '../images/sprite.png'
            }));

    spriteData.img.pipe(gulp.dest('./app/images/'));
    spriteData.css.pipe(gulp.dest('./app/sass/'));
});
gulp.task('html:build', function () {
    return gulp.src([path.src.pug, '!app/templates/**/_*.pug'])
        .pipe(plumber({
            errorHandler: notify.onError(function (err) {
                return {
                    title: 'PUG ERROR',
                    message: err.message
                }
            })
        }))
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest(path.build.html)) // указываем gulp куда положить скомпилированные HTML файлы
});

gulp.task('js:build', function () {
    return gulp.src(path.src.js) //Найдем наш main файл
        .pipe(plumber({
            errorHandler: notify.onError(function (err) {
                return {
                    title: 'JS ERROR',
                    message: err.message
                }
            })
        }))
        .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
        .pipe(uglify()) //Сожмем наш js
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
});

gulp.task('js-plugin:build', function () {
    return gulp.src(path.src.js_plugin) //Найдем наш main файл
        .pipe(plumber({
            errorHandler: notify.onError(function (err) {
                return {
                    title: 'JS PLUGIN ERROR',
                    message: err.message
                }
            })
        }))
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
        .pipe(uglify()) //Сожмем наш js
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
});

gulp.task('style-sass:build', function () {
    return gulp.src(path.src.style_sass)
        .pipe(plumber({
            errorHandler: notify.onError(function (err) {
                return {
                    title: 'STYLE ERROR',
                    message: err.message
                }
            })
        }))
        .pipe(sass({outputStyle: 'expended'})) //Скомпилируем
        .pipe(prefixer()) //Добавим вендорные префиксы
        .pipe(gulp.dest(path.build.css)) //И в build
        .pipe(cssmin()) //Сожмем
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.build.css)) //И в build
});

gulp.task('style-css:build', function () {
    return gulp.src(path.src.style_css)
        .pipe(plumber({
            errorHandler: notify.onError(function (err) {
                return {
                    title: 'STYLE PURE CSS',
                    message: err.message
                }
            })
        }))
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(path.build.css)) //И в build
        .pipe(cssmin()) //Сожмем
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.build.css)) //И в build
});

gulp.task('image-content:build', function () {
    return gulp.src(path.src.img_content) //Выберем наши картинки
        .pipe(imagemin())
        .pipe(gulp.dest(path.build.assets)) //И бросим в build
});

gulp.task('image-icon:build', function () {
    return gulp.src([path.src.img_icons, '!app/images/icons/**/*.*']) //Выберем наши картинки
        .pipe(imagemin())
        .pipe(gulp.dest(path.build.img_icons)) //И бросим в build
});

gulp.task('fonts:build', function() {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('style_sass:watch', function () {
    gulp.watch(path.src.style_sass, ['style-sass:build']);
});
gulp.task('style_css:watch', function () {
    gulp.watch(path.src.style_css, ['style-css:build']);
});
gulp.task('html:watch', function () {
    gulp.watch(path.src.pug, ['html:build']);
});
gulp.task('js:watch', function () {
    gulp.watch(path.src.js, ['js:build']);
});
gulp.task('js-plugin:watch', function () {
    gulp.watch(path.src.js_plugin, ['js-plugin:build']);
});
gulp.task('fonts:watch', function () {
    gulp.watch(path.src.fonts, ['fonts:build']);
});
gulp.task('image-content:watch', function () {
    gulp.watch(path.src.img_content, ['image-content:build']);
});
gulp.task('iconfont:watch', function () {
    gulp.watch(path.src.img_icons, ['image-icon:build']);
});
gulp.task('image-icon:watch', function () {
    gulp.watch(path.src.img_icons, ['image-icon:build']);
});
gulp.task('watch',
    [
        'html:build',
        'html:watch',
        'fonts:build',
        'fonts:watch',
        'image-content:build',
        'image-content:watch',
        'image-icon:build',
        'image-icon:watch',
        'style-sass:build',
        'style_sass:watch',
        'style-css:build',
        'style_css:watch',
        'js:build',
        'js:watch',
        'js-plugin:build',
        'js-plugin:watch',
        'iconfont',
        'iconfont:watch'
]);