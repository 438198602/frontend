/*
 * @Author: 438198602
 * @Date: 2017-02-22 17:21:55
 * 安装命令：npm install gulp del gulp-autoprefixer gulp-minify-css gulp-htmlmin gulp-rename gulp-babel gulp-uglify gulp-concat browser-sync babel-preset-es2015 babel-preset-stage-3 gulp-rev gulp-rev-collector gulp-imagemin gulp-cache gulp-strip-debug --save-dev
 * @Last Modified by: 438198602
 * @Last Modified time: 2017-04-05 16:09:05
 */
'use strict';

// gulp插件
var gulp = require('gulp'),
    del = require('del'),  // 清理目录
    autoprefixer = require('gulp-autoprefixer'),  // 自动添加浏览器前缀
    minifyCss = require('gulp-minify-css'),  // css压缩
    htmlmin = require("gulp-htmlmin"),  // HTML压缩
    rename = require('gulp-rename'),  // 重命名
    babel = require('gulp-babel'),  // ES6转换
    uglify = require('gulp-uglify'),  // js压缩
    stripDebug = require('gulp-strip-debug'),  // 除去javascript代码中的console,alert,debugger声明
    concat = require("gulp-concat"),  // 合并文件
    imagemin = require('gulp-imagemin'),  // 压缩图片
    cache = require('gulp-cache'),  // 图片缓存，只有图片替换了才压缩
    rev = require('gulp-rev'),  // md5
    revCollector = require('gulp-rev-collector'),  // md5文件关联
    browserSync = require('browser-sync').create();  // 自动刷新


// 合并、压缩公共和外部引用的css
gulp.task('baseCss', function(){
    return gulp.src('src/common/css/*.css')
        .pipe(minifyCss())
        .pipe(concat('base.min.css'))
        .pipe(gulp.dest('dist/css'));
});

// 编译项目css
gulp.task('css', function() {
    return gulp.src(['src/**/*.css', '!src/common/css/*.css'])
        .pipe(autoprefixer())
        .pipe(minifyCss())
        // .pipe(rename({suffix: '.min'}))  //rename压缩后的文件名
        .pipe(concat('main.min.css'))
        .pipe(gulp.dest('dist/css'));
});


// 合并、压缩公共和外部引用的js
gulp.task('baseJs', function(){
    return gulp.src('src/common/js/*.js')
        .pipe(uglify())
        .pipe(concat('base.min.js'))
        .pipe(gulp.dest('dist/js'));
});

// 编译项目js
gulp.task('js', function() {
    return gulp.src(['src/**/*.js', '!src/common/js/*js'])
        .pipe(babel({
            presets: ['es2015', 'stage-3'],
            plugins: ["transform-async-generator-functions"]
        }))  // babel转码
        .pipe(uglify())
        .pipe(stripDebug())
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest('dist/js'));
});


// 移动HTML到dist
gulp.task('html', function() {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist'));
});


// css、js添加MD5后缀
gulp.task('md5', ['css', 'js'], function() {
    return gulp.src(['dist/**/main.min.css', 'dist/**/main.min.js'])
        .pipe(rev())  //- 文件名加MD5后缀
        .pipe(gulp.dest('dist'))  //- 输出文件本地
        .pipe(rev.manifest())  //- 生成一个rev-manifest.json
        .pipe(gulp.dest('dist'));  //- 将 rev-manifest.json 保存到 dist 目录内
});
// 替换HTML文件引用的css、js文件名
gulp.task('rev', ['md5', 'html'], function() {
    return gulp.src(['dist/rev-manifest.json', 'dist/**/*.html'])  //- 读取 rev-manifest.json 文件以及需要进行css js名替换的文件
        .pipe(revCollector())  //- 执行文件内css js名的替换
        .pipe(htmlmin({
            removeComments: true,  // 清除HTML注释
            collapseWhitespace: true,  // 压缩HTML
            collapseBooleanAttributes: true,  // 省略布尔属性的值 <input checked="true"/> ==> <input />
            removeEmptyAttributes: true,  // 删除所有空格属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes: true,  // 删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true,  // 删除<style>和<link>的type="text/css"
            minifyJS: true,  // 压缩页面JS
            minifyCSS: true  // 压缩页面CSS
        }))  //- 压缩HTML
        .pipe(gulp.dest('dist'));  //- 替换后的文件输出的目录
});
// 清理多余文件夹
gulp.task('cleanCache', ['rev'], function() {
    return del(['dist/rev-manifest.json', 'dist/css/main.min.css', 'dist/js/main.min.js']);
});


// 压缩图片
gulp.task('imagemin', function() {
    return gulp.src('src/common/images/*')
        .pipe(cache(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        })))
        .pipe(gulp.dest('dist/images'));
});


// 清理dist文件夹
gulp.task('clean', function() {
    return del('dist');
});


// 监听任务
gulp.task('watch', ['clean'], function() {
    // 建立浏览器自动刷新服务器
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });
    // 预处理
    gulp.watch('src/common/css/*.css', ['baseCss']);
    gulp.watch('src/common/js/*.js', ['baseJs']);
    gulp.watch(['src/**/*.html', 'src/**/*.js', 'src/**/*.css'], ['cleanCache']);
    gulp.watch('src/common/images/*', ['imagemin']);
    // 自动刷新
    gulp.watch('src/**', function() {
        browserSync.reload();
    });
});


// 默认任务 编译js，css，html等；运行语句 gulp
gulp.task('default', ['clean', 'watch'], function() {
    gulp.start('baseCss', 'baseJs', 'cleanCache', 'imagemin');
});
