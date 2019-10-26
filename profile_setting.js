import {firebaseConfig} from "./init.js"
firebase.initializeApp(firebaseConfig);

const DB = firebase.database();
const AUTH = firebase.auth();
const nickname = document.getElementById('nickname');
const s_ip = document.getElementById('s_ip');
const s_rs = document.getElementById('s_rs');

AUTH.onAuthStateChanged(function(user) {
  if(!user) return;
  const uID = AUTH.currentUser.uid;
  DB.ref('/users/'+uID).once('value').then(d => {
    const v = d.val();
    document.getElementById('user_name').innerText = (v.forename + ' ' + v.surname).toUpperCase();
    nickname.placeholder = v.nickname ? `(${nickname.value})` : "no nickname set";
  });
  document.getElementById('submitBtn').addEventListener('click', () => {
    nickname.placeholder = nickname.value ? `(${nickname.value})` : "no nickname set";
    DB.ref(`/users/${uID}/nickname`).set(nickname.value);
    nickname.value = "";
  });

  DB.ref('/listings').once('value').then(snapshot => {
    const v = snapshot.val(); // v alue
    if(!v) return console.log("Nothing here.");
    s_ip.innerHTML = s_rs.innerHTML = "";
    for(let k in v){  // k ey
      const P = v[k]; // P erson
      s_ip.innerHTML += `<div class="report" onclick="window.location.href='report.html?id=${k}'">
        <img class="profilepic" src="https://feedback.seekingalpha.com/s/cache/37/2f/372fecf1311f9a879f7c73d3aaad78e4.png"/>
        <h5>${P.forename} ${P.surname}</h5>
      </div>`;
      if(P.author == uID){
        s_rs.innerHTML += `<div class="report" onclick="window.location.href='report.html?id=${k}'">
          <img class="profilepic" src="https://feedback.seekingalpha.com/s/cache/37/2f/372fecf1311f9a879f7c73d3aaad78e4.png"/>
          <h5>${P.forename} ${P.surname}</h5>
        </div>`;
      }
    }
  })
});


document.getElementById('back').addEventListener('click', () => window.location.href = "listings.html");
//expand collapisble
var coll = document.getElementsByClassName("collapsible");
var box = document.getElementById("box");
for (let i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    var content = this.nextElementSibling;
    var body = document.getElementsByTagName("body")[0];
    if (content.style.maxHeight!="0px"){
      body.style.overflowY="hidden";
      content.style.maxHeight = "0";
      content.style.padding="0 3vh 0 3vh";
      box.style.height="73vh";
    } else {
        content.style.maxHeight = "500vh";
        box.style.height="auto";
        content.style.padding= "1.5vh 3vh 1.5vh 3vh";
        body.style.overflowY="auto";
    }
  });
}
