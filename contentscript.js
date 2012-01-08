var clickedEl, lastClosestButton, getClosestButton = function (el) {
	// TODO: Maybe you can add a limit to the number of levels it traverses for the button
        while ((el = el.parent()).length) {
            var buttons = el.find(":button, input[type=submit]"); // :button -> "input[type=button], button"
            if (buttons.length) {
                return buttons.eq(0);
            }
        }
};

document.addEventListener("mousedown", function (ev) {
    if (ev.button == 2) {
        clickedEl = ev.target;
    }
}, true);

chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
    var box = $(clickedEl);

    if (request.action === "findClosestButton") {
        lastClosestButton = getClosestButton(box);
        sendResponse(typeof lastClosestButton !== "undefined");
        return;
    }

    if (request.action === "insertBufferContents") {
        box.val(request.data);
        lastClosestButton && lastClosestButton.trigger('click');
    }
});
