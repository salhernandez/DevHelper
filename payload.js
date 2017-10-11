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

        //a link that has stackoverflow in it
        console.log(a);

        //make request with the stackoverflow link
        var request = makeHttpObject();
        request.open("GET", a, true);
        request.send(null);
        request.onreadystatechange = function() {
          if (request.readyState == 4){
            // console.log(request.responseText);
            var stackOvr = request.responseText;

            // console.log(stackOvr);

            var xmlString = stackOvr
              , parser = new DOMParser()
              , doc = parser.parseFromString(xmlString, "text/html");
            //doc.firstChild // => <div id="foo">...
            //doc.firstChild.firstChild // => <a href="#">...
            console.log("THIS IS THE INFO: ",doc);

            // //converst html string to dom
            // var xmlString = stackOvr
            // , parser = new DOMParser()
            // , doc = parser.parseFromString(xmlString, "text/xml");
            // // doc.firstChild // => <div id="foo">...
            // // doc.firstChild.firstChild // => <a href="#">...
            //
            // // var getAccepted = stackOvr.getElementsByTagName("div");
            //
            // //get all div tags from stack overflow
            // var allStack = doc.getElementsByTagName("*");
            // //looks for the accepted answer
            // for (var i=0, max=allStack.length; i < max; i++) {
            //     var theElementStack = allStack[i];
            //     console.log(theElementStack);
            //
            //     // try{
            //     // var aStack = String(all[i].getAttribute("id"));
            //     // console.log("ID NAME", aStack);
            //     // }
            //     // catch(e){
            //     //
            //     // }
            //   }
            console.log("=========================================================");
          }
        };
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
