var buffer = document.getElementById('buffer');

chrome.contextMenus.create({ type: "normal", title: "Paste and Go", contexts: ["editable"], onclick: function (info, tab) {
        chrome.tabs.sendRequest(tab.id, { action: "findClosestButton" }, function (buttonIsFound) { // tell the content script to find the closest button that we can click on
	    if (!buttonIsFound) { // if no button is found, don't do anything else
	        return;
	    }

            buffer.value = '';
	    buffer.select();
            document.execCommand('paste');
            chrome.tabs.sendRequest(tab.id, { action: "insertBufferContents", data: buffer.value});
        });
    }
});
