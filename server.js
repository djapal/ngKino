// A very basic web server in node.js
// Stolen from: Node.js for Front-End Developers by Garann Means (p. 9-10) 

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

var appDev = 'dev/';
var appProd = 'app/';

var assetsDev = 'assets/';
var assetsProd = 'src/';

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var typescript = require('gulp-typescript');
var ext_replace = require('gulp-ext-replace');

var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var cssnano = require('cssnano');

var tsProject = typescript.createProject('tsconfig.json');

var http = require("http");
var path = require("path"); 
var fs = require("fs"); 		

console.log("Starting web server at " + server_ip_address + ":" + server_port);

gulp.src(appDev + '**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(typescript(tsProject))
    .pipe(sourcemaps.write())
    //.pipe(jsuglify())
    .pipe(gulp.dest(appProd));

gulp.src(assetsDev + 'scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(postcss([precss, autoprefixer, cssnano]))
        .pipe(sourcemaps.write())
        .pipe(ext_replace('.css'))
        .pipe(gulp.dest(assetsProd + 'css/'));

http.createServer( function(req, res) {

	var now = new Date();

	var filename = req.url || "index.html";
	var ext = path.extname(filename);
	var localPath = __dirname;
	var validExtensions = {
		".html" : "text/html",			
		".js": "application/javascript", 
		".css": "text/css",
		".txt": "text/plain",
		".jpg": "image/jpeg",
		".gif": "image/gif",
		".png": "image/png"
	};
	var isValidExt = validExtensions[ext];

	if (isValidExt) {
		
		localPath += filename;
		fs.exists(localPath, function(exists) {
			if(exists) {
				console.log("Serving file: " + localPath);
				getFile(localPath, res, ext);
			} else {
				console.log("File not found: " + localPath);
				res.writeHead(404);
				res.end();
			}
		});

	} else {
		console.log("Invalid file extension detected: " + ext)
	}

}).listen(server_port, server_ip_address);

function getFile(localPath, res, mimeType) {
	fs.readFile(localPath, function(err, contents) {
		if(!err) {
			res.setHeader("Content-Length", contents.length);
			res.setHeader("Content-Type", mimeType);
			res.statusCode = 200;
			res.end(contents);
		} else {
			res.writeHead(500);
			res.end();
		}
	});
}