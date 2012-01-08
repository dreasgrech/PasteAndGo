var clickedEl, getClosestButton = function (el) {
	// TODO: Maybe you can add a limit to the number of levels it traverses for the button
        while ((el = el.parent()).length) {
            var buttons = el.find(":button, input[type=submit]"); // :button -> "input[type=button], button"
            if (buttons.length) {
                return buttons.eq(0);
            }
        }
}, clickTheButton = function (button) {
	if (button) {
		button.trigger('click');
		console.log('Clicking on the closest button');
	}
}, submitClosestForm = function(box) { 
	var closestForm;
	if (box) {
		closestForm = box.closest("form");
		if (!closestForm.length) { // Didn't find any forms
			return;
		}

		closestForm.submit();
		console.log('Submiting the closest form');
		return true;
	}
};

document.addEventListener("mousedown", function (ev) {
    if (ev.button == 2) {
        clickedEl = ev.target;
    }
}, true);

chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
    var box = $(clickedEl);

    if (request.action === "flushAndSubmit") {
        box.val(request.data); // paste the data in the input box

	if (!submitClosestForm(box)) { // If we didn't find a form, try clicking on the closest button
		clickTheButton(getClosestButton(box));
	}
    }
});
