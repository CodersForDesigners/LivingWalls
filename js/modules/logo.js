
/*
 *
 * Logo Animation
 *
 */
$( function () {

	var $window = $( window );
	var screenWidth = $window.width();

	// if ( screenWidth < 640 ) {
		lottie.loadAnimation( {
			container: document.getElementById( "lw-logo-brand-rectangle" ),
			renderer: "svg",
			loop: false,
			autoplay: true,
			path: "/media/lw-logo-brand-rectangle.json"
		} )
	// }
	// else {
		lottie.loadAnimation( {
			container: document.getElementById( "lw-logo-brand-square" ),
			renderer: "svg",
			loop: false,
			autoplay: true,
			path: "/media/lw-logo-brand-square.json"
		} )
	// }

} );
