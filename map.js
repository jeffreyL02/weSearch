import {firebaseConfig} from "./init.js"
firebase.initializeApp(firebaseConfig);

const DB = firebase.database();
const AUTH = firebase.auth();

if (!navigator.geolocation) alert("this doesnt actually work on your phone ;;");

let run, uID;

var map = L.map('map').setView([0, 0], 1);


var ICON_SELF = L.icon({
    iconUrl: 'https://cdn.glitch.com/aaae07a5-1159-4b58-b30f-ad90e8fce6df%2Fmarker_self.png?v=1570836011327',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    shadowUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-shadow.png",
    tooltipAnchor: [16, -28]
});
var ICON_OTHERS = L.icon({
    iconUrl: 'https://cdn.glitch.com/aaae07a5-1159-4b58-b30f-ad90e8fce6df%2Fmarker_others.png?v=1570835977260',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    shadowUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-shadow.png",
    tooltipAnchor: [16, -28]
});


var SELF = L.marker([0, 0]).addTo(map)
    .bindPopup('<center>You</center>')
    //.openPopup()
    .setIcon(ICON_SELF);

var tL = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox.streets',
	accessToken: 'pk.eyJ1Ijoibm92YXNhZ2l0dGFyaWkiLCJhIjoiY2sxeHlwYmxvMGhzMjNkczU1MW8ybTd3eSJ9.g5T9MrZ3xbfz6sJ3Ft0-yA'
});
tL.addTo(map);

const FETCHLOCATION = async result => {
  //alert(result.state);
  if (!navigator.geolocation) return alert("not support!!ed");
  try {

    DB.ref("/heatmap").once('value').then(e => {
      const N = Date.now();
      const dv = e.val();
      for(let k in dv){
        const v = dv[k];
        const _x = (N - v.t)/4000;
        console.log(_x, (32 - (Math.pow(_x, 3)>>16) - (_x>>4))/128);
        L.circle([v.y, v.x], {
          stroke: false,
          fillOpacity: (32 - (Math.pow(_x, 3)>>16) - (_x>>4))/512,
          fillColor: '#ff0000',
          radius: _x
        }).addTo(map);
      }
    });

    navigator.geolocation.getCurrentPosition(position => map.flyTo([position.coords.latitude, position.coords.longitude], 13));

    const shareLocation = true;
    navigator.geolocation.watchPosition(position => {
      SELF.setLatLng([position.coords.latitude, position.coords.longitude]);
      DB.ref('/users/'+uID).once('value').then(d => {
        const v = d.val();
        const uName = v.forename + ' ' + v.surname;
        if (shareLocation) {
          console.log("Logging...");
          DB.ref("/tracker/" + uID).set({
            x: position.coords.longitude,
            y: position.coords.latitude,
            t: Date.now(),
            u: uName
          });
          DB.ref("/heatmap").push({
            x: position.coords.longitude,
            y: position.coords.latitude,
            t: Date.now(),
            u: uID
          });
        }
      });
    });
  } catch (err) {
    alert(err);
  }
}

const o = {}; // o thers Markers

DB.ref("/tracker").on("value", snapshot => {
  const v = snapshot.val(); // value
  for (let k in v) {
    // key
    let d = v[k]; // data
    if (k == uID) continue; // self
    if (Date.now() - d.t > 60 * 1000) continue; // 1 minute
    if (o[k]){
      o[k].setLatLng([d.y, d.x]);
    }else{
      o[k] = L.marker([d.y, d.x]).addTo(map)
        .bindPopup(d.u)
        .openPopup()
        .setIcon(`<center>${ICON_OTHERS}</center>`)
        .setOpacity(0.5);
    }
  }
});

firebase.auth().onAuthStateChanged(function(user) {
  if(!user) return;
  if(run) return;
  run = true;
  uID = AUTH.currentUser.uid;
  try {
    if (navigator.permissions) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(FETCHLOCATION)
        //.catch(e => alert(e));
    } else {
      FETCHLOCATION({ state: "forced" });
    }
  } catch (err) {
    alert(err);
  }
});