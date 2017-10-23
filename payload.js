// send the page title as a chrome message
// chrome.runtime.sendMessage(document.title);
// console.log(document);

//get all a tags
var aTags = document.getElementsByTagName("a");
// console.log(all);

//cycle through all tags
for (var i=0, max=aTags.length; i < max; i++) {

    let anElement = aTags[i];
    let aLink = String(aTags[i].getAttribute("href"));
    //to look for all stackoverflow and stackexchange websites
      //creates a new image element with a checkmark icon
      if((aLink.includes("stackoverflow")  || aLink.includes("stackexchange")) && !aLink.includes("webcache")){
        makeARequest(aLink, anElement);
    }
    //for github issues link
    else if(aLink.includes("github") && aLink.includes("/issues")){
      // console.log("it's a github issues link!");
      makeGithubRequest(aLink, anElement);
    }
}

function makeGithubRequest(url, anElement){
  //a link that has gihub in it
  // console.log("GitHub LINK: ",url);

  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        getGitHubData(xhr.responseText, anElement);
      } else {
        // console.error(xhr.statusText);
      }
    }
  };
  xhr.onerror = function (e) {
    // console.error(xhr.statusText);
  };
  xhr.send(null);
}

function makeARequest(url, anElement){
  //a link that has stackoverflow in it
  // console.log("STACK OVERFLOW LINK: ",url);

  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        getStackOverflowData(xhr.responseText, anElement);
      } else {
        // console.error(xhr.statusText);
      }
    }
  };
  xhr.onerror = function (e) {
    // console.error(xhr.statusText);
  };
  xhr.send(null);
}

function getGitHubData(theResponse, anElement){
  //create DOM
  let doc = new DOMParser().parseFromString(theResponse, 'text/html');
  let div = doc.body.firstChild;

  //gets the div of the accepted answer
  let divs = doc.body.getElementsByClassName('State State--red');

  // console.log(divs);

  //if a link finds the answer accepted-answer class then that means that the link
  //does have a solution
let anImg = chrome.extension.getURL('/images/checkMark.png');
// console.log(anImg);
  if(divs.length){
    var x = document.createElement("IMG");
        x.setAttribute("src", anImg);
        x.setAttribute("width", "15");
        x.setAttribute("height", "15");
        x.setAttribute("alt", "This is a Checkmark");
        anElement.appendChild(x);
  }else{
  }
}

function getStackOverflowData(theResponse, anElement){

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
        x.setAttribute("width", "15");
        x.setAttribute("height", "15");
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
