const sID = window.location.href.split('?id=')[1];
if(!sID) window.location.href = "listings.html";

import {firebaseConfig} from "./init.js"
firebase.initializeApp(firebaseConfig);

document.getElementById('back').addEventListener('click', () => window.location.href = "listings.html");

const DB = firebase.database();
const info = document.getElementsByClassName('info');
const name = document.getElementById('reportName');
const content = document.getElementById('content');
const desc = document.getElementById('reportDesc');

DB.ref('/listings/' + sID).once('value').then(snapshot => {
  let v = snapshot.val();
  name.innerText = (v.forename + ' ' + v.surname).toUpperCase();
  info[0].innerText = v.age;
  info[1].innerText = ~~(Math.random()*2)+4 + "ft " + ~~(Math.random()*12) + "in";
  info[2].outerHTML = v.gender ? `<p class="info" id="gender" style="color:#6AF">\u2642</p>` : `<p class="info" id="gender" style="color:#FAA">\u2640</p>`;
  desc.innerText = v.desc;

  name.style.transformOrigin = "0px 0px";
  name.style.transform = `scaleX(${Math.min(content.offsetWidth / name.offsetWidth * 0.9, 1)})`;
});