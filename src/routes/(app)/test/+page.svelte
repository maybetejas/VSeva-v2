<script>
	src =
		'https://maps.googleapis.com/maps/api/js?key=AIzaSyBCCuFHc12yj9pGQ1-DA_DqCXKbPqf7mKc&callback=myMap';

	function myMap() {
		var mapProp = {
			center: new google.maps.LatLng(51.508742, -0.12085),
			zoom: 5
		};
		var map = new google.maps.Map(document.getElementById('googleMap'), mapProp);
	}
</script>

<h1>My First Google Map</h1>

<div id="googleMap" class="w-11/12 h-full" />
