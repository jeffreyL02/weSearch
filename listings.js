let black=document.getElementById("black");
let modal=document.getElementById("modal");
document.getElementById("addPerson").addEventListener("click",function(){
  black.style.display="block";
  modal.style.display="block";
});

black.addEventListener("click",function(){
  black.style.display="none";
  modal.style.display="none";

});
