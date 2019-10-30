const uDat = window.location.href.split('?')[1];
const sID = uDat.split('&')[0].replace('id=', '');
const pic = uDat.split('&')[1].replace('p=', '');
if(!sID) window.location.href = "listings.html";

import {firebaseConfig} from "./init.js"
firebase.initializeApp(firebaseConfig);

document.getElementById('back').addEventListener('click', () => window.location.href = "listings.html");

const DB = firebase.database();
const info = document.getElementsByClassName('info');
const name = document.getElementById('reportName');
const content = document.getElementById('content');
const desc = document.getElementById('reportDesc');
const lastSeen = document.getElementById("lastSeen");

document.getElementById('pfp').src = '/assets/'+pic;
console.log('/listings/' + sID);

DB.ref('/listings/' + sID).once('value').then(snapshot => {
  let v = snapshot.val();
  name.innerText = (v.forename + ' ' + v.surname).toUpperCase();
  info[1].innerText = v.age;
  info[2].innerText = ~~(Math.random()*2)+4 + "ft " + ~~(Math.random()*12) + "in";
  //info[2].outerHTML = v.gender ? `<p class="info" id="gender" style="color:#00F">\u2642</p>` : `<p class="info" id="gender" style="color:#F66">\u2640</p>`;
  info[3].outerHTML = v.gender ? `<p class="info" id="gender">M</p>` : `<p class="info" id="gender">F</p>`;
  desc.innerText = v.desc;
  lastSeen.innerText = "last seen: "+v.lastSeen + " @ " + v.location;

  name.style.transformOrigin = "0px 0px";
  name.style.transform = `scaleX(${Math.min(content.offsetWidth / name.offsetWidth * 0.9, 1)})`;
});

const report = document.getElementById('joinReportBtn');
let reportToggle = false;
report.addEventListener('click', () => {
  reportToggle = !reportToggle;
  report.style = reportToggle ? "background-color:#A66" : "";
  report.innerText = reportToggle ? "LEAVE" : "JOIN SEARCH";
  window.location.href = "chat.html";
});