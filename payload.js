//ToDo: create an associate array to store links and booleans to false,
// set it so that if the link returns something, then the it has an answer

// send the page title as a chrome message
chrome.runtime.sendMessage(document.title);
// console.log(document);

//get all the tags
var all = document.getElementsByTagName("a");
// console.log(all);

//creates a new image element with a checkmark icon
var x = document.createElement("IMG");
    x.setAttribute("src", "http://www.clker.com/cliparts/e/3/9/7/1245686792938124914raemi_Check_mark.svg.hi.png");
    x.setAttribute("width", "304");
    x.setAttribute("height", "228");
    x.setAttribute("alt", "This is a Checkmark");
    document.body.appendChild(x);

//cycle through all tags
for (var i=0, max=all.length; i < max; i++) {
    // Do something with the element here
    // console.log(all[i]);

    //theElement.href = "lel";
    // console.log(all[i].getAttribute("href"));
    var theElement = all[i];
    var a = String(all[i].getAttribute("href"));
    // console.log(a)

    if(a.includes("stackoverflow.com") && !a.includes("webcache")){

        //replaces the element value
        //theElement.href = "lel";
        console.log("=========================================================");
        makeARequest(a);
        // break;
        // //make request with the stackoverflow link
        // var request = makeHttpObject();
        // request.open("GET", a, true);
        // request.send(null);
        // request.onreadystatechange = function() {
        //   if (request.readyState == 4){
        //     // console.log(request.responseText);
        //     var stackOvr = request.responseText;
        //     console.log("RESPONSE: ", stackOvr);
        //
        //     console.log("=========================================================");
        //   }
        // };
    }
}

function makeARequest(url){
  //a link that has stackoverflow in it
  console.log("STACK OVERFLOW LINK: ",url);

  var xhr = new XMLHttpRequest();
  xhr.open("GET", a, true);
  xhr.onload = function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        // console.log(xhr.responseText);
        // console.log(xhr.responseText);
        //create DOM from text
        // console.log(frag);
        getData(xhr.responseText);

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

function getData(theResponse){

  //create DOM
  let doc = new DOMParser().parseFromString(theResponse, 'text/html');
  let div = doc.body.firstChild;

  //gets div based on the class name
  let divs = doc.body.getElementsByClassName('answer accepted-answer');

  // console.log(divs);

  //if a link finds the answer accepted-answer class then that means that the link
  //does have a solution
  for (var i=0, max=divs.length; i < max; i++) {
      // Do something with the element here
      // console.log(all[i]);
      // console.log(all[i].getAttribute("href"));
      let theElement = divs[i];
      //shows the div for the selected answer
      console.log(theElement);
      // let a = String(all[i].getAttribute("class"));
      // console.log(a)
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
