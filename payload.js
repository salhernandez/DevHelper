// send the page title as a chrome message
// chrome.runtime.sendMessage(document.title);
// console.log(document);

//get all a tags
var aTags = document.getElementsByTagName("a");
// console.log(all);
var storage = chrome.storage.local;

storage.get('options', function(items) {
  if (items.options) {
    let stackOption = items.options.userOptions.stackOverflow;
    let githubOption = items.options.userOptions.GitHub;

    //cycle through all tags
    for (var i=0, max=aTags.length; i < max; i++) {


        let anElement = aTags[i];
        let aLink = String(aTags[i].getAttribute("href"));
        // let aLink = aTags[i].textContent;

        // if the url has a local reference
        // clean it up and give the proper one back
        if (aLink.includes('/url?') && aLink.includes('%')) {
          console.log("hmm");
          let tempLink = getProperURL(aLink);
          if(tempLink !== null){
            aLink = tempLink;
          }
        }

        //to look for all stackoverflow and stackexchange websites
          //creates a new image element with a checkmark icon
          if((aLink.includes("stackoverflow")  || aLink.includes("stackexchange")) && !aLink.includes("cache")){

            //if the user wants to show check stack overflow links
            if(stackOption){
            makeARequest(aLink, anElement);
          }

        }
        //for github issues link
        else if(aLink.includes("github.com") && aLink.includes("/issues/") && !aLink.includes("cache")){
          //if the user wants to show check github links
          if(githubOption){
            // makeGithubRequest(aLink, anElement);
            callGitHubAPI(aLink, anElement);
          }
        }
    }
  }
});

function getProperURL(aURL) {
  let properURL = null;
    let toks = aURL.split('=');
    for (let i = 0, max = toks.length; i < max; i++) {
      //get token that contains https
      if (toks[i].includes('https')) {
        //decode URL
        let uri_dec = decodeURIComponent(toks[i]);
        let uri_dec_token = uri_dec.split('&');
        properURL = uri_dec_token[0];
      }
    }
    return properURL;
}

function callGitHubAPI(url, anElement){
  let toks = url.split('/');
  // console.log(toks);

  //replaces gitub.com with api.github.com
  toks[2] = "api.github.com";

  //insterts "repos" into the third slot
  toks.splice(3, 0, "repos");

  //creates api url
  let APIUrl = toks.join("/");
  // console.log(toks);

  var xhr = new XMLHttpRequest();
    xhr.open("GET", APIUrl, true);
    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          parseGitHubData(xhr.responseText, anElement);
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

function parseGitHubData(data, anElement){
  //convert string to JSON
  jData = JSON.parse(data);
  //get state of issue
  if(jData.state === "closed"){
    // console.log("issue closed");
    let anImg = chrome.extension.getURL('/images/checkMark.png');
    let x = document.createElement("IMG");
        x.setAttribute("src", anImg);
        x.setAttribute("width", "15");
        x.setAttribute("height", "15");
        x.setAttribute("alt", "This is a Checkmark");
        anElement.appendChild(x);
  }
  else{
    // console.log("issue open");
  }
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

    // //testing
    // var h = document.createElement("body");
    // var t = document.createTextNode("78");
    // h.appendChild(t);
    // anElement.appendChild(t);

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
