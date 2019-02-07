const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('sass',function(done){
    // 入力ファイル
    gulp.src('public/resource/design.scss')
    .pipe(sass())
    // 出力ファイル
    .pipe(gulp.dest('public'));
    // コールバックで終了（必須）
    done();
});

// watchで監視
gulp.task('watch',function(done){
    gulp.watch('public/resource/*.scss', gulp.series('sass'));
})

