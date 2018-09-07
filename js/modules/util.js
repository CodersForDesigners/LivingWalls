
/*
 *
 * This functions periodically polling a given variable,
 * 	checking to see if it is set.
 * 	Once the given variable is set, the funtion resolves the promise with the value
 *
 * ::USAGE::
 * The variable should be passed as a string, optionally dot-delimited if it is a nested object attribute.
 * The variable should be globally accessible through the `window` object.
 *
 */
function onceVariableIsSet ( path, interval ) {

	var pathParts = path.split( "." );
	interval = interval || 1500;

	return new Promise( function ( resolve, reject ) {

		function isVariableSet () {

			var _i;
			var currentVar = window;
			for ( _i = 0; _i < pathParts.length; _i += 1 ) {
				currentVar = currentVar[ pathParts[ _i ] ];
				if ( currentVar === null || currentVar === void 0 )
					return setTimeout( isVariableSet, interval );
			}

			resolve( currentVar );

		}

		isVariableSet();

	} );

}
