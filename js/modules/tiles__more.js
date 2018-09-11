
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

	// Set the source attributes of the videos
	var $videos = $( ".js_video" );
	$videos.each( function ( _i, el ) {
		var $video = $( el );
		var source = $video.data( "src" );
		$video.attr( "src", source );
	} );

	// If the user *cannot* "hover", play the videos regardless
	if ( ! __SETTINGS.user.canHover && $( window ).width() > 640 ) {
		$videos.each( function ( _i, el ) {
			$( el ).get( 0 ).play();
		} )
	}

	/*
	 *
	 * If users can hover,
	 * 	when they do hover over the project tile,
	 * 		play the video
	 *
	 */
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

		$tile.addClass( "js-tile-on-hover" );
		$video.addClass( "js-fade-in" );

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

		$tile.removeClass( "js-tile-on-hover" );
		$video.removeClass( "js-fade-in" );

	} );




	/*
	 *
	 * If users *cannot* hover, and if they're on a small screen
	 * 	then selectively fade in and play a Project Tile video when that tile
	 * 	is taking a prominent space on the screen
	 *
	 */
	/*
	 *
	 * 1. Get a list of all the tiles in reverse order.
	 * 2. As the user scrolls, iterate through the tiles
	 * 3. If 75% of the current tile is contained in the viewport
	 * 4. Then, A. fade the tile to color, and B. play the tile video
	 * 5. And for the rest of the tiles, A. grey them, and B. pause their videos
	 *
	 */
	if ( __SETTINGS.user.canHover || $( window ).width() > 640 )
		return;

	function selectivelyPlayProjectTileOnScroll ( event ) {

		var $window = $( window );

		if ( $window.width() > 640 )
			return;

		var domTiles = $( ".js_tile" ).toArray().reverse();
		for ( var _i = 0; _i < domTiles.length; _i += 1 ) {

			var $element = $( domTiles[ _i ] );

			var scrollTop = $window.scrollTop();
			var scrollBottom = $window.height() + scrollTop;
			var elementHeight = $element.outerHeight();
			var elementTop = $element.position().top;
			var elementBottom = elementTop + elementHeight;

			// If the element is not even in the viewport, move on
			if ( scrollTop > elementBottom )
				continue;
			if ( scrollBottom < elementTop )
				continue;

			var amountVisibile = elementHeight;
			if ( scrollTop - elementTop > 0 )
				amountVisibile -= scrollTop - elementTop;
			if ( elementBottom - scrollBottom > 0 )
				amountVisibile -= elementBottom - scrollBottom;

			if ( amountVisibile / elementHeight < 0.75 ) {
				continue;
			}

			$( domTiles ).trigger( "mouseleave" )
			$element.trigger( "mouseenter" )
			return;

		}

	}
		// Only perform this selective playback after the initial tile animation
	setTimeout( function () {

		var selectivelyPlayProjectTileOnScroll__Throttled = _.throttle( selectivelyPlayProjectTileOnScroll, 500, { leading: false, trailing: true } );

		$( window ).on( "scroll", selectivelyPlayProjectTileOnScroll__Throttled );

		// Call the function once on startup as well
		selectivelyPlayProjectTileOnScroll();

	}, __UI.initialTileAnimationDuration + 1500 );

} )

} );
