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
