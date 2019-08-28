import data from './init.mjs';
firebase.initializeApp(data);

const AUTH = firebase.auth();

document.getElementById("signUp").addEventListener("click", function(){
  location.assign("signup.html");
});

let loginPassword = document.getElementById("password");
document.getElementById("submit").addEventListener("click", () => {
  AUTH.signInWithEmailAndPassword(document.getElementById("username").value, loginPassword.value).then(() => {
    window.location.href = "listings.html";
  }).catch(e => {
    alert("Login failed!");
    loginPassword.value = "";
  });
});