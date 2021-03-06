var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var mainBowerFiles = require('main-bower-files');

var paths = {
    scripts: 'app/**/*.js',
    styles: ['app/**/*.{css,scss}'],
    index: 'app/index.html',
    partials: ['app/**/*.html', '!app/index.html'],
    dest: './dest'
};

var pipes = {};

pipes.cleanDest = function () {
    return gulp.src('dest/', {read: false})
        .pipe(plugins.clean());
};


pipes.builtPartialScripts = function() {
    return gulp.src(paths.partials)
        .pipe(gulp.dest(paths.dest));
};

pipes.builtAppStyles = function() {
    return gulp.src(paths.styles)
        .pipe(plugins.concat('app.css'))
        .pipe(gulp.dest(paths.dest));
};

pipes.builtVendorStyles = function() {
    return gulp.src(mainBowerFiles('**/*.css'))
        .pipe(plugins.concat('vendor.css'))
        .pipe(gulp.dest(paths.dest));
};

pipes.builtVendorScripts = function() {
    return gulp.src(mainBowerFiles('**/*.js'))
        .pipe(pipes.orderVendorScripts())
        .pipe(plugins.concat('vendor.js'))
        // .pipe(plugins.uglify())
        .pipe(gulp.dest(paths.dest));
};

//built app acripts
pipes.builtAppScripts = function() {
    return gulp.src(paths.scripts)
        .pipe(pipes.orderAppScripts())
        .pipe(plugins.concat('app.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(paths.dest));
};

//order vendor scripts
pipes.orderVendorScripts = function() {
    return plugins.order(['jquery.js', 'angular.js']);
};

//put index.js into first order
pipes.orderAppScripts = function() {
    return plugins.order(['app/index.js', paths.scripts]);
};

//copy bower-components into app folder
pipes.bowerFiles = function() {
    return gulp.src(mainBowerFiles())
        .pipe(gulp.dest(paths.dest + '/bower_components'));
};

pipes.builtIndex = function() {

    var vendorStyles = pipes.builtVendorStyles();
    var vendorScripts = pipes.builtVendorScripts();
    var appScripts = pipes.builtAppScripts();
    var appStyles = pipes.builtAppStyles();
    pipes.builtPartialScripts();

    return gulp.src('app/index.html')
        .pipe(gulp.dest(paths.dest))
        .pipe(plugins.inject(vendorScripts, {relative:true, name:'bowerjs'}))
        .pipe(plugins.inject(vendorStyles, {relative:true, name:'bowercss'}))
        // .pipe(plugins.inject(gulp.src(mainBowerFiles()), {relative:true, name:'bower'}))
        .pipe(plugins.inject(appScripts, {relative:true}))
        .pipe(plugins.inject(appStyles, {relative:true}))
        .pipe(gulp.dest(paths.dest));
};

gulp.task('clean-app', pipes.cleanDest);
gulp.task('build-app', ['clean-app'], pipes.builtIndex);

gulp.task('build-app', ['clean-app'], pipes.builtIndex);


gulp.task('watch', ['build-app'], function() {

    gulp.watch(paths.index, function() {
        return pipes.builtIndex();
    });

    gulp.watch(paths.scripts, function() {
        return pipes.builtAppScripts();
    });

    gulp.watch(paths.styles, function() {
        return pipes.builtAppStyles();
    });

    gulp.watch(paths.partials, function() {
        return pipes.builtPartialScripts();
    });

});
