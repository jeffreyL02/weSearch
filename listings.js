//pop up modal
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
