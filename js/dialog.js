'use strict';

var setup = document.querySelector('.setup');
var setupUserPic = setup.querySelector('.setup-user-pic');
// already exists in setup.js, refactor
console.log(setupUserPic);

setupUserPic.addEventListener('mousedown', function (evt) {
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
  console.log('mousemove');
  document.addEventListener('mouseup', onMouseUp);
  console.log('mouseup');
});
