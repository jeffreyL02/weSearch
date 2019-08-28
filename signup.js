import data from './init.mjs';
firebase.initializeApp(data);

const AUTH = firebase.auth();

document.getElementById("login").addEventListener("click", function(){
  location.assign("index.html");
});

const inputs = document.getElementsByTagName('input');

document.getElementById("register").addEventListener("click", () => {
  if (inputs[3].value === inputs[4].value){
		AUTH.createUserWithEmailAndPassword(inputs[1].value, inputs[2].value).then(() => {
		window.location.href = "listings.html";
		}).catch(e => alert(e));
  }else{
    alert("Password Mismatch!!");
    inputs[3].value = inputs[4].value = "";
  }
});
