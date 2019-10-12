
//expand collapisble
var coll = document.getElementsByClassName("collapsible");
for (let i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    var content = this.nextElementSibling;
    if (content.style.maxHeight!="0px"){
      content.style.maxHeight = "0";
      content.style.padding="0 3vh 0 3vh";
    } else {
        content.style.maxHeight = "17vh";
        content.style.padding= "1.5% 3% 1.5% 3%";
      }
  });
}
