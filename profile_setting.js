var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    console.log(content)
    if (content.style.maxHeight!="0px"){
      content.style.maxHeight = "0";
    } else {
      content.style.maxHeight = "80vh";
    }
  });
}
