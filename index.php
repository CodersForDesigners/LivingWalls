<?php

	// :: ONLY DURING DEVELOPMENT ::
	// debugging
	ini_set( "display_errors", "On" );
	ini_set( "error_reporting", E_ALL );

	/*
	 * Versioning Assets to invalidate the browser cache
	 */
	$ver = '?v=20180912_2';

	// included external php files with functions.
	require ('inc/head.php');
	require ('inc/lazaro.php'); /* -- Lazaro disclaimer and footer -- */

	/*
	 *
	 * Minimal Version
	 * 	Should a base minimal version be served to the client?
	 *
	 */
	// Data Saver flag
	$request__saveData = false;
	if (
		isset( $_SERVER[ 'HTTP_SAVE_DATA' ] )
		and strtolower( $_SERVER[ 'HTTP_SAVE_DATA' ] ) === 'on'
	)
		$request__saveData = true;

?>

<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" prefix="og: http://ogp.me/ns# fb: http://www.facebook.com/2008/fbml">

<head>


	<!-- Nothing Above This -->
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

	<!-- Page Title | Page Name -->
	<title>LivingWalls</title>

	<?php echo gethead(); ?>

</head>

<body id="body" class="body">

<!--  ★  MARKUP GOES HERE  ★  -->

<?php
	/*
	 * Determine the user's (client's) device and browser situation,
	 * 	in order to determine the level of experience of serve to them
	 */
	require_once __DIR__ . '/inc/client-info.php';
?>

<div id="page-wrapper"><!-- Page Wrapper -->

	<div class="welcome">
		<div class="container">
			<div class="projects row">
				<div class="columns small-12 medium-6 large-4 large-offset-2 xlarge-3 xlarge-offset-3">
					<div class="logo text-center show-for-mobile">
						<!-- <img src="/media/lw-logo-brand-small.svg"> -->
						<div id="lw-logo-brand-rectangle" class="image"></div>
					</div>
					<a href="secret-soil/pricing" class="tile x2 fill-dark slow-reveal fade-up js_tile js_tile_1">
						<div class="tile-background secret-soil">
							<video class="fade-in-on-hover js_video" data-src="media/tile-secret-soil.mp4" preload="auto" muted playsinline loop></video>
						</div>
						<div class="tile-content">
							<div class="p text-uppercase">Secret Soil</div>
							<div class="h2 thin"><strong class="no-wrap">Secretly Kick-ass</strong><br><span class="h3">4 BHK</span> <strong>Houses</strong></div>
							<div class="enter">
								<div class="icon">
									<img src="/media/icon-enter.svg">
								</div>
								<div class="h4 text-uppercase">Learn More</div>
							</div>
						</div>
					</a>
				</div>
				<div class="columns small-12 medium-6 large-4 xlarge-3">
					<div class="logo hide-for-mobile">
						<!-- <img src="/media/lw-logo-brand-large.svg"> -->
						<div id="lw-logo-brand-square" class="image"></div>
					</div>
					<a href="/another-sky" class="tile x1 fill-dark slow-reveal fade-right delay-40 js_tile js_tile_2">
						<div class="tile-background another-sky">
							<video class="fade-in-on-hover js_video" data-src="media/tile-another-sky.mp4" preload="auto" muted playsinline loop></video>
						</div>
						<div class="tile-content">
							<div class="p text-uppercase">Another Sky</div>
							<div class="h2 thin"><strong>Obscenely Awesome</strong><br><span class="h3">3 & 4 BHK</span> <strong>Apartments</strong></div>
							<div class="enter">
								<div class="icon">
									<img src="/media/icon-enter.svg">
								</div>
								<div class="h4 text-uppercase">Learn More</div>
							</div>
						</div>
					</a>
				</div>
			</div>
			<div class="action row">
				<div class="columns small-12 medium-6 large-4 large-offset-2 xlarge-3 xlarge-offset-3">
					<a href="tel:+919663396979" class="tile slow-reveal fade-down delay-80 js_contact_text">
						<div class="h3 thin">Call <strong>+91 96633 96979</strong></div>
					</a>
				</div>
			</div>
		</div>
	</div>


	<!-- Lazaro Signature -->
	<?php lazaro_signature(); ?>
	<!-- END : Lazaro Signature -->

</div><!-- END : Page Wrapper -->







<!--  ☠  MARKUP ENDS HERE  ☠  -->

<?php // lazaro_disclaimer(); ?>









<!-- Plugins -->
<script type="text/javascript" src="/plugins/lodash/lodash-v4.17.10-custom.min.js"></script>
<script type="text/javascript" src="/plugins/lottie/lottie-light.v5.2.1.min.js"></script>

<script type="text/javascript">

	var __UI = { };
	__UI.initialTileAnimationDuration = 3000;

</script>

<!-- JS Modules -->
<script type="text/javascript" src="/js/modules/util.js"></script>
<script type="text/javascript" src="/js/modules/disclaimer.js"></script>
<script type="text/javascript" src="js/modules/logo.js"></script>
<script type="text/javascript" src="js/modules/tiles.js"></script>
<script type="text/javascript" src="js/modules/tiles__more.js" defer></script>

</body>

</html>
