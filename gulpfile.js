var gulp = require('gulp'),
    uglify  = require('gulp-uglify'),
    concat  = require('gulp-concat'),
    header  = require("gulp-header"),
    fs = require('fs'),

    PACKAGE = JSON.parse(fs.readFileSync('package.json', 'utf8')),

    FILES = [
      'src/main.js',
      'src/underscore.js',
      'src/meteor.js',
      'src/random.js',
      'src/base64.js',
      'src/ejson.js',
      'src/id-map.js',
      'src/ordered-dict.js',
      'src/tracker.js',
      'src/mongo-id.js',
      'src/geojson-utils.js',
      'src/diff-sequence.js',
      'src/minimongo.js',
      'src/check.js',
      'src/jquery.js',
      'src/htmljs.js',
      'src/html-tools.js',
      'src/blaze-tools.js',
      'src/observe-sequence.js',
      'src/reactive-var.js',
      'src/reactive-dict.js',
      'src/reactive-array.js',
      'src/spacebars-compiler.js',
      'src/blaze.js',
      'src/spacebars.js',
      'src/templating.js',
      'src/initialize.js'
    ];

    BANNER = ['/**',
      ' * <%= package.name %> - <%= package.description %>',
      ' * @version v<%= package.version %>',
      ' * @link <%= package.repository.url %>',
      ' */',
      ''].join('\n');

gulp.task('js', function () {
  gulp.src(FILES)
    .pipe(uglify())
    .pipe(concat('blaze.min.js'))
    .pipe(header(BANNER, { package : PACKAGE }))
    .pipe(gulp.dest('build'));
});

gulp.task('default', ['js']);
