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

//when the extension opens
window.addEventListener('load', function (evt) {
  changeUI();
});

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete' && tab.active) {

		//makes sure that the extension is only triggered if it is base dona google search

		if(tab.url.includes("https://www.google.com/search?")){
			chrome.extension.getBackgroundPage().chrome.tabs.executeScript(null, {
				file: 'payload.js'
			});

		}
  }
})


//UI related code
function doSwitchOnStack() {
  let stackButton = document.getElementById('stack-overflow-button');
    //turn off
    if(stackButton.className == "on") {
      stackButton.className="off";
      stackButton.innerHTML = "off";
      updateData("stackOverflow", false);

    } else {//turn on
      stackButton.className="on";
      stackButton.innerHTML = "on";
      updateData("stackOverflow", true);
    }
}

function doSwitchOnGitHub() {
  let githubButton = document.getElementById('github-button');
  //turn off
    if(githubButton.className == "on") {
      githubButton.className="off";
      githubButton.innerHTML = "off";
      updateData("GitHub", false);

    } else {//turn on
      githubButton.className="on";
      githubButton.innerHTML = "on";
      updateData("GitHub", true);
    }
}

document.getElementById('stack-overflow-button').onclick = doSwitchOnStack
document.getElementById('github-button').onclick = doSwitchOnGitHub

//aruments, what to update, value
//saved using chrome extenion API
function updateData(uType, uValue){
  /*Grab Value. Update the needed header, set the values again
  */
  let tempOptions = {};
  storage.get('options', function(items) {
    if (items.options) {
      // textarea.value = items.css;
      // alert("Loaded saved options: ");
      //store options object
      tempOptions = items.options;

      //update value
      tempOptions.userOptions[uType] = uValue;

      //set value
      storage.set({'options': tempOptions}, function() {
        // Notify that we saved.
        // alert("Settings saved with updates: "+uType+" to "+uValue);
      });
    }
    else{
      let anObject = {
      userOptions: {
        stackOverflow: true,
        GitHub: true
      }
    }
    //set value
    storage.set({'options': anObject}, function() {
      // Notify that we saved.
      // alert("Settings saved");
    });
  }
  });
}

function changeUI(){
  storage.get('options', function(items) {
    if (items.options) {
      let stackButton = document.getElementById('stack-overflow-button');
      let githubButton = document.getElementById('github-button');

      if(items.options.userOptions.stackOverflow) {
        stackButton.className="on";
        stackButton.innerHTML="on";

      } else {
        stackButton.className="off";
        stackButton.innerHTML="off";
      }

      if(items.options.userOptions.GitHub) {
        githubButton.className="on";
        githubButton.innerHTML="on";
      } else {
        githubButton.className="off";
        githubButton.innerHTML="off";
      }
    }
  });
}
