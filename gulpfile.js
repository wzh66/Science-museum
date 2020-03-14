const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const minifyCSS = require('gulp-minify-css');
const ngHtml2Js = require('gulp-ng-html2js');
const minifyHtml = require('gulp-minify-html');
const runSequence = require('run-sequence');
const version = '1.0.0';


gulp.task('html2js', function () {
    return gulp.src('public/html/**/*.html')
        .pipe(minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(ngHtml2Js({
            moduleName: 'appTemplates'
        }))
        .pipe(concat('template.tpl.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/components/' + version + '/'));
});
//sass合并,压缩
gulp.task('sass', function () {
    return gulp.src(['public/html/**/*.scss', 'sass/**/*.scss'])
        .pipe(autoprefixer())
        .pipe(sass())
        .pipe(concat('app.css'))
        .pipe(gulp.dest('public/css/' + version + '/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifyCSS())
        .pipe(gulp.dest('public/css/' + version + '/'));
});

/*//语法检查
 gulp.task('jshint', function () {
 return gulp.src(['js/!**!/!*.js', 'html/!**!/!*.js'])
 .pipe(jshint())
 .pipe(jshint.reporter('default'));
 });*/

//合并,压缩 app、controllers、Directives、filters
gulp.task('public', function () {
    return gulp.src(['public/js/**/*.js', 'public/html/**/*.js'])      //需要操作的文件
        .pipe(concat('public.js'))    //合并所有js到public.js
        .pipe(gulp.dest('public/components/' + version + '/'))       //输出到文件夹
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(gulp.dest('public/components/' + version + '/'));  //输出
});

/*//合并,压缩 app、controllers、Directives、filters
gulp.task('js', function () {
    return gulp.src(['public/plugs/app_iframe.js'])      //需要操作的文件
        .pipe(concat('public.js'))    //合并所有js到public.js
        .pipe(gulp.dest('public/plugs/' + version + '/'))       //输出到文件夹
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('public/plugs/' + version + '/'));  //输出
});

//合并,压缩 app、controllers、Directives、filters
gulp.task('css', function () {
    return gulp.src(['public/plugs/AdminLTE.css'])
        .pipe(autoprefixer())
        .pipe(concat('app.css'))
        .pipe(gulp.dest('public/plugs/' + version + '/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifyCSS())
        .pipe(gulp.dest('public/plugs/' + version + '/'));
});*/

gulp.task('watch', function () {
    //gulp.watch(['public/plugs/app_iframe.js'], gulp.series('js'));
    //gulp.watch(['public/plugs/AdminLTE.css'], gulp.series('css'));
    gulp.watch(['public/js/**/*.js', 'public/html/**/*.js'], gulp.series('public'));
    gulp.watch(['public/html/**/*.html'], gulp.series('html2js'));
    gulp.watch(['public/html/**/*.scss', 'public/sass/**/*.scss'], gulp.series('sass'));
});

gulp.task('default', async () => {
    await gulp.series(['sass', 'public', 'html2js', 'watch']);
})