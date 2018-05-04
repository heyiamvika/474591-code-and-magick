'use strict';

var setup = document.querySelector('.setup');
var dialogHandle = setup.querySelector('.setup-user-pic');
// already exists in setup.js, refactor

dialogHandle.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var mouseStart = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: mouseStart.x - moveEvt.clientX,
      y: mouseStart.y - moveEvt.clientY
    };

    mouseStart = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    setup.style.top = (setup.offsetTop - shift.y) + 'px';
    setup.style.left = (setup.offsetTop - shift.x) + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});


var shopElement = document.querySelector('.setup-artifacts-shop');
var draggedItem = null;

shopElement.addEventListener('dragstart', function (evt) {
  if (evt.target.tagName === 'img') {
    draggedItem = evt.target;
    evt.dataTransfer.setData('text/plain', evt.target.alt);
  }
});

var artifactsElement = document.querySelector('.setup-artifacts');
artifactsElement.addEventListener('dragover', function (evt) {
  evt.preventDefault();
  return false;
});
