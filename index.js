'use strict';

const Hapi   = require( 'hapi' );
const config = require( './config' );

// Create a server with a host and port
const server = new Hapi.Server();

server.connection( {
	'host'   : config.host,
	'port'   : config.port,
	'labels' : 'static'
} );

const staticFiles = server.select( 'static' );

server.register( require( 'inert' ), () => {
	staticFiles.route( {
		'method'  : 'GET',
		'path'    : '/{param*}',
		'handler' : function ( request, reply ) {
			return reply( 'hello World' );
		}
	} );

	// Start the Server
	server.start( ( err ) => {
		if ( err ) {
			throw err;
		}
		console.log( 'Server running at : ', server.info.uri );
	} );
} );
