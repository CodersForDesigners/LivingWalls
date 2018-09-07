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

</script>
