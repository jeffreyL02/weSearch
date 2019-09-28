import {firebaseConfig} from "./init.js"
firebase.initializeApp(firebaseConfig);

const DB = firebase.database();

const f = document.getElementById('workspace');
/*document.addEventListener('click', Event => {
  n.focus();
  //add(~~(Math.random()*names.length), Math.random().toString(36).substr(2));
});*/

const uName = prompt("I am?");
const n = document.getElementById('inputMessage');
let lastSpeaker = '';
n.addEventListener('keypress', Event => {
  if(Event.key == 'Enter' && n.value){
    add(uName || "You", n.value, true);
    DB.ref('/chat').push({
      author: uName,
      content: n.value,
      timestamp: Date.now()
    });
    n.value = "";
  }
})

function add(N, M, SELF){
  if(lastSpeaker == N+''+SELF){
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
}

let time = Date.now() - 60000;
DB.ref('/chat').on('value', snapshot => {
  const v = snapshot.val(); // value
  console.log(v);
  for(let k in v){
    if(!v[k] || v[k].author == uName) continue;
    if(v[k].timestamp > time){
      add(v[k].author, v[k].content, false);
    }
  }
  time = Date.now();
});