let gulp = require('gulp');
let ejs = require('gulp-ejs');
let browserSync = require('browser-sync').create();
let reload = browserSync.reload;

gulp.task('css', function () {
    gulp.src('src/css/**/*')
        .pipe(gulp.dest('dist/css'));
});
gulp.task('js', function () {
    gulp.src('src/js/**/*')
        .pipe(gulp.dest('dist/js'));
});
gulp.task('image', function () {
    gulp.src('src/image/**/*')
        .pipe(gulp.dest('dist/image'));
});
gulp.task('favicon', function () {
    gulp.src('src/favicon.ico')
        .pipe(gulp.dest('dist/'));
});
gulp.task('ejs', ['css', 'js', 'image', 'favicon'], function () {
    gulp.src('src/**.ejs')
        .pipe(ejs({prefix: ''}, {}, {ext: '.html'}))
        .pipe(gulp.dest('dist'))
        .pipe(reload({stream: true}));
});

// 浏览器重载
gulp.task('ejs-watch', ['ejs']);

// 静态服务器
gulp.task('browser-sync', ['ejs'], function () {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        reloadDebounce: 0
    });
    // 无论是数据文件更改还是模板更改都会触发页面自动重载
    gulp.watch('src/**/*', ['ejs-watch']);
});

gulp.task('default', ['browser-sync']);
