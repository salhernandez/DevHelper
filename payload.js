// send the page title as a chrome message
chrome.runtime.sendMessage(document.title);
// console.log(document);

//get all the tags
var all = document.getElementsByTagName("a");
// console.log(all);

//cycle through all tags
for (var i=0, max=all.length; i < max; i++) {
    // Do something with the element here
    // console.log(all[i]);

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
