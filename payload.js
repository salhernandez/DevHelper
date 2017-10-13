//TODO: look through github issues
//TODO: be able to recognize all stack pages(or most)

// send the page title as a chrome message
chrome.runtime.sendMessage(document.title);
// console.log(document);

//get all the tags
var all = document.getElementsByTagName("a");
// console.log(all);

//cycle through all tags
for (var i=0, max=all.length; i < max; i++) {

    let theElement = all[i];
    let a = String(all[i].getAttribute("href"));
    // console.log(a)

    if(a.includes("stackoverflow.com") && !a.includes("webcache")){
      //creates a new image element with a checkmark icon

        //replaces the element value
        //theElement.href = "lel";
        console.log("=========================================================");
        makeARequest(a, theElement);
    }
}

function makeARequest(url, anElement){
  //a link that has stackoverflow in it
  console.log("STACK OVERFLOW LINK: ",url);

  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        // console.log(xhr.responseText);
        // console.log(xhr.responseText);
        //create DOM from text
        // console.log(frag);
        getData(xhr.responseText, anElement);

        console.log("=========================================================");
      } else {
        console.error(xhr.statusText);
      }
    }
  };
  xhr.onerror = function (e) {
    console.error(xhr.statusText);
  };
  xhr.send(null);
}

function getData(theResponse, anElement){

  //create DOM
  let doc = new DOMParser().parseFromString(theResponse, 'text/html');
  let div = doc.body.firstChild;

  //gets the div of the accepted answer
  let divs = doc.body.getElementsByClassName('answer accepted-answer');

  // console.log(divs);

  //if a link finds the answer accepted-answer class then that means that the link
  //does have a solution
let anImg = chrome.extension.getURL('/images/checkMark.png');
// console.log(anImg);
  if(divs.length){
    var x = document.createElement("IMG");
        x.setAttribute("src", anImg);
        x.setAttribute("width", "25");
        x.setAttribute("height", "25");
        x.setAttribute("alt", "This is a Checkmark");
        anElement.appendChild(x);
  }else{
  }
}

//makes request
function makeHttpObject() {
  try {return new XMLHttpRequest();}
  catch (error) {}
  try {return new ActiveXObject("Msxml2.XMLHTTP");}
  catch (error) {}
  try {return new ActiveXObject("Microsoft.XMLHTTP");}
  catch (error) {}

  throw new Error("Could not create HTTP request object.");
}
