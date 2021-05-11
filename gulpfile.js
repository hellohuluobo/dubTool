const gulp = require('gulp');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sass = require('gulp-sass');
const clean = require('gulp-clean');
const eslint = require('gulp-eslint');
const gulpsync = require('gulp-sync')(gulp);

// 项目路径
const option = { base: 'src' };
const dist = `${__dirname}/dist`;
const copyPath = ['src/**/*.*', '!src/**/*.scss'];
const sassPath = [
  'src/pages/**/*.scss',
  'src/app.scss'
];

// 清空目录
gulp.task('clean', () => {
  return gulp.src(dist).pipe(clean());
});

// 复制不包含sass的文件
gulp.task('copy', () => {
  return gulp.src(copyPath, option).pipe(gulp.dest(dist));
});

// 编译sass
gulp.task(
  'sass',
  () =>
    gulp
      .src(sassPath, option)
      .pipe(
        sass().on('error', function (e) {
          console.error(e.message);
          this.emit('end');
        })
      )
      .pipe(postcss([autoprefixer]))
      .pipe(
        rename(function (path) {
          path.extname = '.wxss';
        })
      )
      .pipe(gulp.dest(dist))
);

// 代码规范检测
gulp.task('lint', () =>
  gulp
    .src('src/**/*.js')
    // .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

// 监听
gulp.task('watch', () => {
  gulp.watch(copyPath, ['copy']);
  gulp.watch(sassPath, ['sass']);
  gulp.watch(['src/**/*.js']);
});

// dev模式
gulp.task('default', gulpsync.sync(['clean', ['copy', 'sass'], 'watch']));

// 生产模式
gulp.task('dist', gulpsync.sync(['clean', ['copy', 'sass']]));
