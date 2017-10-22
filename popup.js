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

var storage = chrome.storage.local;

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


//UI related code
function doSwitchOnStack() {
  // Save it using the Chrome extension storage API.
  storage.set({'options': "on"}, function() {
    // Notify that we saved.
    alert("Settings saved");
  });

    //turn off
    if(document.getElementById('stack-overflow-button').className == "on") {
            document.getElementById('stack-overflow-button').className="off";
    } else {//turn on
              document.getElementById('stack-overflow-button').className="on";
    }
}

function doSwitchOnGitHub() {
  //turn off
    if(document.getElementById('github-button').className == "on") {
            document.getElementById('github-button').className="off";
    } else {//turn on
              document.getElementById('github-button').className="on";
    }
}

document.getElementById('stack-overflow-button').onclick = doSwitchOnStack
document.getElementById('github-button').onclick = doSwitchOnGitHub
