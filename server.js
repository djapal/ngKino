var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

var appDev  = 'dev/';
var appProd = 'app/';

var assetsDev  = 'assets/';
var assetsProd = 'src/';

var gulp        = require('gulp');
var sourcemaps  = require('gulp-sourcemaps');
var typescript  = require('gulp-typescript');
var ext_replace = require('gulp-ext-replace');
var jsuglify    = require('gulp-uglify');
var postcss     = require('gulp-postcss');

var autoprefixer = require('autoprefixer');
var precss = require('precss');
var cssnano = require('cssnano');

var tsProject = typescript.createProject('tsconfig.json');

var express = require('express');
var favicon = require('serve-favicon');

var app = express();

gulp.src(appDev + '**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(typescript(tsProject))
    .pipe(sourcemaps.write())
    .pipe(jsuglify())
    .pipe(gulp.dest(appProd));

gulp.src(assetsDev + 'scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(postcss([precss, autoprefixer, cssnano]))
        .pipe(sourcemaps.write())
        .pipe(ext_replace('.css'))
        .pipe(gulp.dest(assetsProd + 'css/'));


console.log("Starting web server at " + server_ip_address + ":" + server_port);

app.use('/', express.static(__dirname));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use(favicon(__dirname + '/favicon.ico'));

app.listen(server_port, server_ip_address, function() { console.log('listening'); });