import {firebaseConfig} from "./init.js"
firebase.initializeApp(firebaseConfig);

const DB = firebase.database();
const AUTH = firebase.auth();

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
let dots = document.getElementsByClassName("dot");

right.addEventListener("click", () => updateModalState(++ page));
left.addEventListener("click", () => updateModalState(-- page));

function updateModalState(pg){
  page = pg;
  switch(page){
    case 1:
      stepOne.style.display = "block";
      left.style.display = stepTwo.style.display = stepThree.style.display = "none";
      right.style.display = "inline-block";
      dots[0].style.backgroundColor = "rgb(83, 83, 83)";
      dots[1].style.backgroundColor = "rgb(180, 180, 180)";
      break;
    case 2:
      stepTwo.style.display = "block";
      stepOne.style.display = stepThree.style.display = "none";
      left.style.display = right.style.display = "inline-block";
      dots[1].style.backgroundColor = "rgb(83, 83, 83)";
      dots[0].style.backgroundColor = "rgb(180, 180, 180)";
      dots[2].style.backgroundColor = "rgb(180, 180, 180)";
      break;
    case 3:
      stepThree.style.display = "block";
      right.style.display = stepTwo.style.display = stepOne.style.display = "none";
      left.style.display = "inline-block";
      dots[1].style.backgroundColor = "rgb(180, 180, 180)";
      dots[2].style.backgroundColor = "rgb(83, 83, 83)";
  }
}

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
  if(!I[0].value){
    updateModalState(1);
    I[0].focus();
    return;
  }
  if(!I[0].value){
    updateModalState(1);
    I[0].focus();
    return;
  }
  if(!I[3].value){
    updateModalState(2);
    I[3].focus();
    return;
  }
  DB.ref('/listings').push({
    forename: I[0].value,
    surname:  I[1].value,
    age:      I[2].value,
    lastSeen: I[3].value,
    location: I[4].value,
    country:  I[5].value,
    gender:   male.outerHTML.length > 146,
    desc:     document.getElementById('otherInfo').value,
    author:   AUTH.currentUser.uid || "N/A"
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
    workspace.innerHTML += `<div class="person" onclick="window.location.href='report.html?id=${k}'">
      <img src="assets/defaultIcon.png">
      <div class="info">
        <p class="personName">${P.forename} ${P.surname}</p>
        <p class="personDate">date last seen: ${P.lastSeen || "Unknown"}</p>
      </div>
      <div class="border"></div>
    </div>`;
  }
})
