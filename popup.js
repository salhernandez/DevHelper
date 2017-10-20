// Inject the payload.js script into the current tab after the popout has loaded
// window.addEventListener('load', function (evt) {
// 	chrome.extension.getBackgroundPage().chrome.tabs.executeScript(null, {
// 		file: 'payload.js'
// 	});
// });

//
// // Listen to messages from the payload.js script and write to popout.html
// chrome.runtime.onMessage.addListener(function (message) {
// 	document.getElementById('pagetitle').innerHTML = message;
// });

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete' && tab.active) {

		//makes sure that the extension is only triggered if it is base dona google search

		if(tab.url.includes("https://www.google.com/search?")){
			chrome.extension.getBackgroundPage().chrome.tabs.executeScript(null, {
				file: 'payload.js'
			});

		}

		else{//it's not a google search
		}
  }
})

var a=0;
function count() {
    a++;
    document.getElementById('demo').textContent = a;
}
document.getElementById('do-count').onclick = count;
