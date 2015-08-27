(function (global) {
  function Logger(logElement, options) {
    this.rows = options.rows || 3;
    this.scroll = options.scroll || false;
    this.logElement = logElement;
  }

  global.Logger = Logger; // expose as a global variable

  Logger.prototype.log = function (parts, level) {
    var rowElement = document.createElement('p');
    rowElement.classList.add('message');

    for (var i = 0; i < this.rows; i++) {
      var part = i < parts.length ? parts[i] : '';

      var partElement = document.createElement('span');
      partElement.classList.add('part');
      partElement.textContent = part;

      rowElement.appendChild(partElement);
    }

    if (level) {
      rowElement.classList.add('level-' + level.toLowerCase())
    }

    var atBottom = isScrolledToBottom();

    this.logElement.appendChild(rowElement);

    if (this.scroll && atBottom) {
      scrollToBottom();
    }
  }

  function isScrolledToBottom() {
    // the y-coordinate of the lowest pixel shown from the document on screen
    // at present
    var lowerShown = window.scrollY + window.innerHeight;

    // cross-browser compatibility for document height (crazy, right)
    var potentialDocumentHeights = [
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    ];

    // if lowerShown matches any of the numbers, it is likely that the user is
    // indeed scrolled to the bottom of the page
    return potentialDocumentHeights.indexOf(lowerShown) !== -1;
  }

  function scrollToBottom() {
    // TODO: consider smooth scrolling
    window.scrollTo(0, document.body.scrollHeight);
  }
})(window)
