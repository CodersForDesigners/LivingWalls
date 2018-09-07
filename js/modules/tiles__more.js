
/*
 *
 * Project Tiles
 *
 */
/*
 * Add videos to the tiles
 */
$( function () {

// When all relevant data on the client has been collected, run this function.
// 	This is because some of this data gathering is asynchronous.
onceVariableIsSet( "__SETTINGS.client.baseExperience" ).then( function ( baseExperience ) {

	if ( baseExperience )
		return;

	var $videos = $( ".js_video" );
	$videos.each( function ( _i, el ) {
		var $video = $( el );
		var source = $video.data( "src" );
		$video.attr( "src", source );
	} );

	var $window = $( window );
	var screenWidth = $window.width();

	// On small screens
	if ( screenWidth < 640 ) {
		$videos.each( function ( _i, el ) {
			$( el ).get( 0 ).play();
		} )
		$videos.addClass( "done" );
	}

	$( ".js_tile" ).on( "mouseenter", function ( event ) {

		var $tile = $( event.target ).closest( ".js_tile" );
		var $video = $tile.find( "video" );
		$video.get( 0 ).play();
		$video.addClass( "done" );

	} );

	$( ".js_tile" ).on( "mouseleave", function ( event ) {

		var $tile = $( event.target ).closest( ".js_tile" );
		var $video = $tile.find( "video" );
		$video.get( 0 ).pause();
		$video.removeClass( "done" );

	} );

} )

} );
