'use strict';

const koa = require('koa')
const router = require('koa-route')
const fs = require('fs')
const mime = require('mime')
const Jade = require('koa-jade')

const app = koa()

var PORT = process.env.port || 5555;
var pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));


const jade = new Jade({
  viewPath: './views',
  debug: true,
  pretty: false,
  compileDebug: false,
  locals: {
    name: pkg.name,
    base: __dirname,
    title: 'New Site'
  },
  basedir: __dirname,
  //helperPath: [
  //  'path/to/jade/helpers',
  //  { random: 'path/to/lib/random.js' },
  //  { _: require('lodash') }
  //],
  app: app // equals to jade.use(app) and app.use(jade.middleware) 
})
 
//Jade.locals.someKey = 'some value' 



app.use( router.get('/', function* () {
  this.render('index', "", true);
    //this.render('index', locals_for_this_page, true)
}));

app.use( router.get('*', function* () {
    var _this = this;
    var mType = mime.lookup( _this.url ), cType;
    var hasFile = true;
    
    
    try {
      fs.statSync( __dirname + _this.url );
    }
    catch(err) {
      if(err.code == 'ENOENT') hasFile = false;
    }

    if( hasFile ) {
      
      // set ContentType
      switch ( mType ) {
        case 'text/css':
          cType = 'text/css'; break;
        case 'text/javascript':
          cType = 'text/javascript'; break;
        case 'image/x-icon':
          cType = 'image/x-icon'; break;
        default:
          cType = 'text/plain';
      }
    
      // Bypass KOA
      // TODO: Refactor with Thunks: http://blog.stevensanderson.com/2013/12/21/experiments-with-koa-and-javascript-generators/
      _this.respond = false;
      
      fs.readFile( __dirname + _this.url , "utf8", function(err, data) {
        if (err) throw err;
        _this.res.writeHead(200, {'Content-Type': cType });
        _this.res.write( data );
        _this.res.end();
      });
     
    }
    else {
      this.render('404', "", true);
      console.log( 'File does not exist: ' + _this.url  );
    }
     
  })
);


app.listen(PORT);
console.log('Server running on Port: ' + PORT + ' … ');