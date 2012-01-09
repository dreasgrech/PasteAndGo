var clickedEl, getClosestButton = function (el) {
	// TODO: Maybe you can add a limit to the number of levels it traverses for the button
        while ((el = el.parent()).length) {
            var buttons = el.find(":button, input[type=submit]"); // :button -> "input[type=button], button"

            if (buttons.length) {
                return buttons.eq(buttons.length - 1);
            }
        }
	// Didn't find any buttons
}, clickTheButton = function (button) {
	if (button) {
		button.trigger('click');
		console.log('Clicking on the closest button');
		return true;
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

	if (!submitClosestForm(box)) {
		if (!clickTheButton(getClosestButton(box))) {
			console.log('No form to submit or button to click was found.');
		}
	}
    }
});
