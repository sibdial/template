var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var ts = require("gulp-typescript"),
    tsProject = ts.createProject("app/src/ts/tsconfig.json");

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        proxy: "site.loc",
        notify: false,
        open: false,
        port: 9000
    });

    gulp.watch("app/src/scss/*.scss", ['sass']);
    gulp.watch("app/*.php").on('change', browserSync.reload);
    gulp.watch(['./app/src/ts/*.ts'], ['tstojs']);
    gulp.watch("app/js/*.js").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/src/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});

gulp.task("tstojs", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("./app/js/"));
});

gulp.task('default', ['serve']);