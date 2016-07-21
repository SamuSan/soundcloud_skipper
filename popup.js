var URL_REGEX = /https:\/\/soundcloud\.com\/.*/;

function getSoundCloudTabIndex(callback) {
  var queryInfo = {
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tabId = -1;

    tabs.forEach(function(tab){
      if(tab.url !== undefined){
        result = tab.url.match(URL_REGEX)
        if(result != null){
          result.length > 0 ? tabId = tab.id : tabId = tabId;
        }
      }
    });
    callback(tabId);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  getSoundCloudTabIndex(function(tabId) {
    if(tabId > -1) {
      chrome.tabs.executeScript(tabId, { code: "document.getElementsByClassName(\"skipControl__next\")[0].click()"});
    }
  });
  window.close();
});
