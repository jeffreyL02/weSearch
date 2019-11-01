import {firebaseConfig} from "./init.js"
firebase.initializeApp(firebaseConfig);

const DB = firebase.database();
const AUTH = firebase.auth();

const f = document.getElementById('workspace');
/*document.addEventListener('click', Event => {
  n.focus();
  //add(~~(Math.random()*names.length), Math.random().toString(36).substr(2));
});*/

document.getElementById('mapBtn').addEventListener('click', () => window.location.href = "map.html");
document.getElementById('profileBtn').addEventListener('click', () => window.location.href = "profile_setting.html");

const n = document.getElementById('inputMessage');
const send = document.getElementById('send');
let lastSpeaker = '';

let uName, uID;

firebase.auth().onAuthStateChanged(function(user) {
  if(!user) return;
  uID = AUTH.currentUser.uid;
  DB.ref('/users/'+uID).once('value').then(d => {
    const v = d.val();
    uName = v.forename + ' ' + v.surname;
  });
});

n.addEventListener('keypress', Event => {
  if(Event.key == 'Enter'){
    add(uName || "You", n.value, true);
  }
})
send.addEventListener('click', () => add(uName || "You", n.value, true));

function add(N, M, SELF){
  console.log(N, M, SELF);
  const VAL = document.getElementById('inputMessage').value;
  if(SELF) document.getElementById('inputMessage').value = "";
  if(!M) return;
  if(lastSpeaker == (N+''+SELF)){
    f.lastChild.lastChild.innerText += "\n" + M;
    f.scrollTop = f.scrollHeight;
    return;
  }

  const d = document.createElement('div');
  /*d.innerHTML = "<strong>" + N + "</strong>: " + M;*/

  /* <div class="messageRev">
      <p class="senderName">oat</p>
      <div class="text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
    </div> */

  d.className = SELF ? "messageOutgoing" : "messageIncoming";
  d.innerHTML = `<p class="senderName">${N}</p><div class="text">${M}</div>`;

  lastSpeaker = N+''+SELF;

  f.append(d);
  f.scrollTop = f.scrollHeight;

  console.log(uName || "John Doe", VAL, Date.now());
  DB.ref('/chat').push({
    author: uName || "John Doe",
    content: VAL,
    timestamp: Date.now()
  });
}

let time = Date.now() - 60000;
DB.ref('/chat').on('child_added', snapshot => {
  const v = snapshot.val(); // value
  /*console.log(Date.now(), time, v);
  for(let k in v){
    if(!v[k] || v[k].author == (uName || "John Doe")) continue;
    if(v[k].timestamp > time){
      add(v[k].author, v[k].content, false);
    }
  }*/
  console.log(v, v.author);
  if(!v || v.author == (uName || "John Doe")) return;
  add(v.author, v.content, false);
   //   time = Date.now();
});