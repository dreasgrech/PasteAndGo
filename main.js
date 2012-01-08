var buffer = document.getElementById('buffer');

chrome.contextMenus.create({ type: "normal", title: "Paste and Go", contexts: ["editable"], onclick: function (info, tab) {
            buffer.value = '';
	    buffer.select();
            document.execCommand('paste');

            chrome.tabs.sendRequest(tab.id, { action: "flushAndSubmit", data: buffer.value});
    }
});
