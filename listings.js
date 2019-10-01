import {firebaseConfig} from "./init.js"
firebase.initializeApp(firebaseConfig);

const DB = firebase.database();

//pop up modal
let black=document.getElementById("black");
let modal=document.getElementById("modal");
document.getElementById("addPerson").addEventListener("click",function(){
  black.className = modal.className = "show";
});
function hide(){
  black.className = modal.className = "hide";
}
black.addEventListener("click", hide);

//switch pages of filling out report
let page=1;
let left = document.getElementById("leftArrow")
let right=document.getElementById("rightArrow");
let stepOne = document.getElementById("stepOne");
let stepTwo = document.getElementById("stepTwo");
let stepThree = document.getElementById("stepThree");

right.addEventListener("click", function(){
  page++;
  switch(page){
    case 2:
      left.style.display="inline-block";
      stepOne.style.display="none";
      stepTwo.style.display="block";
      break;
    case 3:
      stepTwo.style.display="none";
      stepThree.style.display="block";
      right.style.display="none";
  }
});
left.addEventListener("click",function(){
  page--;
  console.log(page);
  switch(page){
    case 1:
      stepOne.style.display="block";
      stepTwo.style.display="none";
      left.style.display="none";
      break;
    case 2:
      stepTwo.style.display="block";
      stepThree.style.display="none";
      right.style.display="inline-block";
  }
});

//g e n d e r
let male = document.getElementById("male");
let female = document.getElementById("female");

female.addEventListener("click",function(){
  male.style.backgroundColor="rgba(0,0,0,0)";
  female.style.backgroundColor="rgb(220,220,220)"
});
male.addEventListener("click",function(){
  female.style.backgroundColor="rgba(0,0,0,0)";
  male.style.backgroundColor="rgb(220,220,220)"
});

const I = document.getElementsByTagName('input'); // I nput
const t = document.getElementById("submitBtn"); // t rigger
t.addEventListener('click', function(){
  DB.ref('/listings').push({
    forename: I[0].value,
    surname:  I[1].value,
    age:      I[2].value,
    lastSeen: I[3].value,
    location: I[4].value,
    country:  I[5].value,
    gender:   male.style.length > 35,
    desc:     document.getElementById('otherInfo').innerText   
  }).then(() => {
    window.location.reload();
  });
  t.disabled = true;
});

const workspace = document.getElementById('workspace');
DB.ref('/listings').on('value', snapshot => {
  const v = snapshot.val(); // v alue
  if(!v) return console.log("Nothing here.");
  workspace.innerHTML = "";
  for(let k in v){  // k ey
    const P = v[k]; // P erson
    workspace.innerHTML += `<div class="person">
      <img src="assets/defaultIcon.png">
      <div id="info">
        <p id="personName">${P.forename} ${P.surname}</p>
        <p id="personDate">Date Last Seen: ${P.lastSeen || "Unknown"}</p>
      </div>
      <div id="border"></div>
    </div>`;
  }
})