import gulp from "gulp";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import browserSync from "browser-sync";

const { src, dest, series, watch } = gulp;
const sass = gulpSass(dartSass);
const browserSyncInstance = browserSync.create();

const globs = {
  sass: {
    src: "./**/*.scss",
    dest: "./",
  },
};

function compileSass() {
  return src(globs.sass.src).pipe(sass()).pipe(dest(globs.sass.dest));
}

async function startWatchers() {
  watch(globs.sass.src, compileSass);
}

async function startServer() {
  browserSyncInstance.init({ server: "./" });
  browserSyncInstance
    .watch([globs.sass.src])
    .on("change", browserSyncInstance.reload);
}

export default series(compileSass, startServer, startWatchers);
