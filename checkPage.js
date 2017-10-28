//get all image tags
var aTags = document.querySelectorAll('[id=DevHelperCheckmark]');
// console.log(aTags);

for (var i=0, max=aTags.length; i < max; i++) {
  let anElement = aTags[i];
  //set set chemark to invisible
  anElement.style.opacity = "0.0";
}
