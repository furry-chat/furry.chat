'use strict';

function clipBoard2(element = '.ext-clipboard') {
  let clipboard = new ClipboardJS(element);

  clipboard.on('success', function (e) {
    e.clearSelection();
  });
}

/**
 * Loading functions.
 * ---------------------------------------------------------------------------------------------------------------------
 */

$(function () {
	clipBoard2();
});
