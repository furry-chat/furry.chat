'use strict';

function clipBoard2(element = '.ext-clipboard2') {
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
