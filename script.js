document.getElementsByClassName('mycoords').textContent = 'heelo';

// IP & Geolocation
let getIp = async function () {
	const res = await fetch('https://api.ipify.org/?format=json');
	const data = await res.json();

	return data;
};

getIp();

let getGeoLoc = async function () {
	const ip = await getIp();
	const response = await fetch(
		`https://geo.ipify.org/api/v1?apiKey=at_eRmLCyubP4MeszApnDYC2JUl4oTFK&ipAddress=${ip['ip']}`
	);
	const data = await response.json();

	return data;
};

getGeoLoc();

// Map & Marker

let mymap, marker;
async function setMap() {
	const coords = await getGeoLoc();
	const { lat, lng } = coords.location;

	mymap = L.map('mapid', { dragging: true }).setView([lat, lng], 13);
	marker = L.marker([lat, lng])
		.addTo(mymap)
		.bindPopup('<b>This is your location.</b>', {
			closeButton: false,
			closeOnClick: false,
		})
		.openPopup();

	// Setting Tileset
	L.tileLayer(
		'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
		{
			attribution:
				'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
			maxZoom: 18,
			id: 'mapbox/streets-v11',
			tileSize: 512,
			zoomOffset: -1,
			accessToken:
				'pk.eyJ1IjoiZGV2dGhld2ViIiwiYSI6ImNrcng5cGdiaDA2eW4ycW85ZGtwMGJ6dXcifQ.IuOYl0OynwwarSXBr2LVyw',
		}
	).addTo(mymap);
}

setMap();

// fetch('https://api.ipify.org/?format=json')
// 	.then((response) => response.json())
// 	.then((data) => (userIp = data['ip']), console.log(userIp));
// let geoloc = fetch(
// 	`https://geo.ipify.org/api/v1?apiKey=at_eRmLCyubP4MeszApnDYC2JUl4oTFK&ipAddress=${ip}`
// )
// 	.then((response) => response.json())
// 	.then((data) =>
// 		console.log(
// 			`Location: ${data['location']['lat']}, ${data['location']['lng']}`
// 		)
// 	);

// var marker = L.marker([19.0724, 72.8825], {
// 	title: 'test',
// 	riseOnHover: true,
// 	riseOffset: 250,
// 	draggable: true,
// }).addTo(mymap);

// var coords = marker.getLatLng();
// console.log(coords);
