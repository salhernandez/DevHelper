// send the page title as a chrome message
chrome.runtime.sendMessage(document.title);
console.log(document);

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
    if(a.includes("stackoverflow.com") && !a.includes("webcache")){
        console.log(a);
        theElement.href = "lel";
    }
}