// document.getElementsByClassName('mycoords').textContent = 'heelo';

let btn = document.querySelector('.lookup');
let map = document.querySelector('#mapid');
let replaceThese = Array.prototype.slice.call(
	document.querySelectorAll('.replace')
);
let instruct = document.querySelector('.instruct');

// console.log(data);
// data.forEach((item) => console.log(item.textContent));

btn.addEventListener('click', getData);

function getData() {
	// IP & Geolocation
	const getIp = async function () {
		const res = await fetch('https://api.ipify.org/?format=json');
		const data = await res.json();

		return data;
	};

	const getGeoLoc = async function () {
		const ip = await getIp();
		const response = await fetch(
			`https://geo.ipify.org/api/v1?apiKey=at_eRmLCyubP4MeszApnDYC2JUl4oTFK&ipAddress=${ip['ip']}`
		);
		const data = await response.json();
		const display = [];
		display.push(
			data.ip,
			data.location.region,
			data.location.lat,
			data.location.lng,
			data.isp
		);

		replaceThese.forEach((item, index) => (item.innerText = display[index]));

		return data;
	};

	map.classList.remove('d-none');
	instruct.classList.add('d-none');

	// Map & Marker

	let mymap, marker;
	async function setMap() {
		const coords = await getGeoLoc();
		const { lat, lng } = coords.location;

		mymap = L.map('mapid').setView([lat, lng], 10);
		marker = L.marker([lat, lng])
			.addTo(mymap)
			.bindPopup('<b>This is your IP location.</b>', {
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
				id: 'mapbox/outdoors-v11',
				tileSize: 512,
				zoomOffset: -1,
				accessToken:
					'pk.eyJ1IjoiZGV2dGhld2ViIiwiYSI6ImNrcng5cGdiaDA2eW4ycW85ZGtwMGJ6dXcifQ.IuOYl0OynwwarSXBr2LVyw',
			}
		).addTo(mymap);
	}
	setMap();
}
