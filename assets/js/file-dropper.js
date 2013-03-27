var handlerCallback,
	FileDropper = function (dropArea, process) {
		this.init(dropArea);
		this.process = process || function () {
			alert('Good, I received your file(e) but you didn\'t say me what I am supposed to do with ?!')
		};
	};

FileDropper.prototype = {
	on: function (element, event, scope, bubble) {
		if ('addEventListener' in element) {
			// Normal way
			try {
				element.addEventListener(event, scope, bubble);
			}
			catch (exception) {
				if (typeof scope === 'object' && scope.handleEvent) {
					element.addEventListener(event, function (e) {
						scope.handleEvent.call(scope, e);
					}, bubble);
				} else {
					throw exception;
				}
			}
		} else if ('attachEvent' in element) {
			// IE way
			if (typeof scope === 'object' && scope.handleEvent) {
				handlerCallback = function () {
					scope.handleEvent.call(scope);
				};
				element.attachEvent('on' + event, handlerCallback);
			} else {
				// IE8 and below - THAT COULD BIND MAY TIMES THE SAME EVENT...
				element.attachEvent('on' + event, scope);
			}
		} else {
			element['on' + event] = scope;
		}
	},
	off: function (element, event, scope, bubble) {
		if ('removeListener' in element) {
			try {
				element.removeEventListener(event, scope, bubble);
			}
			catch (exception) {
				if (typeof scope === 'object' && scope.handleEvent) {
					element.removeEventListener(event, function (e) {
						scope.handleEvent.call(scope, e);
					}, bubble);
				} else {
					throw exception;
				}
			}
		} else if ('detachEvent' in element) {
			if (typeof scope === 'object' && scope.handleEvent) {
				element.detachEvent('on' + event, handlerCallback);
			} else {
				element.detachEvent('on' + event, scope);
			}
		} else {
			element['on' + event] = null;
		}
	},
	handleEvent: function (e) {
		e.preventDefault();
		e = e || window.event; // Required to get the event in IE7 - IE8
		var files = [];
		this.blockEvent(e);

		switch (e.type) {
			case 'dragenter':
				this.addClass(this.dropArea, 'hover');
				break;
			case 'dragleave':
			case 'dragend':
				if (this.checkRelativePosition(e) === false) {
					this.removeClass(this.dropArea, 'hover');
				}
				break;
			case 'drop':
				this.removeClass(this.dropArea, 'hover');
				if (e.dataTransfer && e.dataTransfer.files) {
					files = e.dataTransfer.files;
				}
				this.process.apply(this, [files, e, this]);
				break;
			default:
				break;
		}
	},
	blockEvent: function (e) {
		if (e.preventDefault) {
			e.preventDefault();
			e.returnValue = false;
		}
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		return false;
	},
	checkRelativePosition: function (e) {
		var eventX = e.clientX,
			eventY = e.clientY,
			minX = this.dropArea.offsetLeft,
			maxX = minX + this.dropArea.clientWidth,
			minY = this.dropArea.offsetTop,
			maxY = minY + this.dropArea.clientHeight,
			check = false;

		if (eventX > minX && eventX < maxX && eventY > minY && eventY < maxY) {
			check = true;
		}

		return check;
	},
	addClass: function (element, classToAdd) {
		if (element.className.search(classToAdd) === -1) {
			if (element.className.length === 0) {
				element.className = classToAdd;
			} else {
				element.className += ' ' + classToAdd;
			}
		}
	},
	removeClass: function (element, classToRemove) {
		element.className = element.className.replace(classToRemove, '');
	},
	init: function	(dropArea) {
		this.dropArea = dropArea || document.body;
		if (window.File && window.FileReader && window.FileList && window.Blob) {
			this.on(window, 'dragover', this.blockEvent, false);
			this.on(window, 'drop', this.blockEvent, false);
			this.on(this.dropArea, 'dragenter', this, false);
			this.on(this.dropArea, 'dragover', this, false);
			this.on(this.dropArea, 'dragleave', this, false);
			this.on(this.dropArea, 'dragend', this, false);
			this.on(this.dropArea, 'drop', this, false);
		} else {
			alert('Your browser cannot manage an HTML5 file upload');
		}
		return this;
	}
};