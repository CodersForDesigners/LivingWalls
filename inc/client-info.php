<?php

/*
 *
 * If the client,
 * 	1. Has "Data-Saver" mode turned on.
 * 	2. Does not have much charge on his/her device.
 *
 * Then, **do not** serve the "bells and whistles" features.
 *
 */

?>

<!-- Markup that is solely used for feature detection -->
<div class="can-hover hidden"></div>

<style type="text/css">

	div.can-hover:after { content: "dunno"; }
	@media ( max-width: 1040px ) {
		div.can-hover:after { content: "maybe"; }
	}
	@media ( pointer: coarse ) {
		div.can-hover:after { content: "no"; }
	}
	@media not ( pointer: coarse ) {
		div.can-hover:after { content: "yes"; }
	}

</style>

<script type="text/javascript">

	function batteryIsBelow ( level ) {

		level = ( level || 15 ) / 100;

		if ( ! ( "getBattery" in navigator ) )
			return Promise.resolve( false );

		// If battery is charging or battery level is high enough
		return navigator.getBattery().then( function ( battery ) {
			return ! ( battery.charging || battery.level > level );
		} );

	}

	__SETTINGS = { };
	__SETTINGS.client = { };

	__SETTINGS.client.saveData = <?php echo $request__saveData ? 'true' : 'false' ?>;
	__SETTINGS.client.batteryIsPoor = false;
		// This is the attribute that represents the collective decision on whether to offer a base experience to the user or not
	__SETTINGS.client.baseExperience = null;

	batteryIsBelow( 15 )
		.then( function ( batteryIsPoor ) {
			__SETTINGS.client.batteryIsPoor = batteryIsPoor;
			return __SETTINGS.client;
		} )
		.then( function ( client ) {
			client.baseExperience = client.saveData
									|| client.batteryIsPoor;
		} )


	__SETTINGS.user = { };
	/*
	 * Can user hover
	 */
	var userCanHover = getComputedStyle( document.getElementsByClassName( "can-hover" )[ 0 ], ":after" ).content.replace( /"/g, "" ).trim();
	__SETTINGS.user.canHover = [ "dunno", "yes" ].indexOf( userCanHover ) !== -1;
		// Add a flag in CSS as well
	if ( __SETTINGS.user.canHover )
		document.body.classList.add( "can-hover" );

</script>
