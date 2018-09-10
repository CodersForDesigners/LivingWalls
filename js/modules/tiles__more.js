
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

	// If the user *cannot* "hover", play the videos regardless
	if ( ! __SETTINGS.user.canHover ) {
		$videos.each( function ( _i, el ) {
			$( el ).get( 0 ).play();
		} )
		$videos.addClass( "done" );
	}

	// This var holds the return value (if any) of the call to the `video.play()`.
	var videoSetToPlay;

	$( ".js_tile" ).on( "mouseenter", function ( event ) {

		var $tile = $( event.target ).closest( ".js_tile" );
		var $video = $tile.find( "video" );

		// Depending on whether the play function returns a promise or not,
		// 	we have to deal with the situation accordingly
			// Only play the video if a playback hasn't already been scheduled
		if ( ! videoSetToPlay )
			videoSetToPlay = $video.get( 0 ).play();
			// If a promise was returned
		if ( videoSetToPlay && videoSetToPlay.then ) {
			videoSetToPlay.then( function () {
				videoSetToPlay = null;
			} )
			videoSetToPlay.catch( function () {
				videoSetToPlay = null;
			} )
		}
		else {
			videoSetToPlay = null;
		}

		$video.addClass( "done" );

	} );

	$( ".js_tile" ).on( "mouseleave", function ( event ) {

		var $tile = $( event.target ).closest( ".js_tile" );

		var $video = $tile.find( "video" );
		// If a promise was returned when the video was scheduled to play, then schedule a pause after that
		if ( videoSetToPlay && videoSetToPlay.then ) {
			videoSetToPlay.then( function () {
				$video.get( 0 ).pause();
			} )
			videoSetToPlay.catch( function () {
				$video.get( 0 ).pause();
			} )
		}
		else {
			$video.get( 0 ).pause();
		}

		$video.removeClass( "done" );

	} );

} )

} );
