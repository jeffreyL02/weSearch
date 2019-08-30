import {firebaseConfig} from "./init.js"
firebase.initializeApp(firebaseConfig);

const AUTH = firebase.auth();

document.getElementById("login").addEventListener("click", function(){
  location.assign("index.html");
});

const inputs = document.getElementsByTagName('input');
document.getElementById("signUp").addEventListener("click", () => {
  if (inputs[3].value === inputs[4].value){
		AUTH.createUserWithEmailAndPassword(inputs[2].value, inputs[3].value).then(() => {
			window.location.href = "listings.html";

		}).catch(e => alert(e));
  }else{
    alert("Password Mismatch!!");
    inputs[3].value = inputs[4].value = "";
  }
});
