'use strict';

// Data

var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var wizards = [];


// Variables

var setup = document.querySelector('.setup');
var userAvatar = document.querySelector('.setup-open');
var userAvatarImage = userAvatar.querySelector('.setup-open-icon');
var closeButton = setup.querySelector('.setup-close');

var wizardEyes = document.querySelector('#wizard-eyes');
var wizardOneEye = wizardEyes.querySelectorAll('rect');
var wizardEyesInput = document.querySelector('input[name="eyes-color"]');
var wizardFireball = document.querySelector('.setup-fireball-wrap').querySelector('.setup-fireball');
var wizardFireballInput = document.querySelector('input[name="fireball-color"]');

var saveButton = document.querySelector('.setup-submit');

var setupSimilar = document.querySelector('.setup-similar');
setupSimilar.classList.remove('hidden');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// Keycodes

var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;

// Helper functions

var generateRandomValue = function (array) {
  return Math.floor(Math.random() * array.length);
};

var pickRandomColor = function (array) {
  for (var i = 0; i < array.length; i++) {
    var randomColor = array[Math.floor(Math.random() * array.length)];
  }

  return randomColor;
};

// Event listeners - keyboard navigation

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', popupEscCloseHandler);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', popupEscCloseHandler);
};

var sendForm = function () {
  console.log('something');
};

var popupEscCloseHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

userAvatar.addEventListener('click', openPopup);
userAvatarImage.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

closeButton.addEventListener('click', closePopup);
closeButton.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }

  setup.style.top = '80px';
  setup.style.left = '50%';
});

saveButton.addEventListener('click', sendForm);
saveButton.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    sendForm();
  }
});

// Event listeners - change character

wizardEyes.addEventListener('click', function () {
  var randomEyesColor = pickRandomColor(eyesColors);

  wizardOneEye[0].style.fill = randomEyesColor;
  wizardOneEye[1].style.fill = randomEyesColor;
  wizardEyesInput.value = randomEyesColor;
});

wizardFireball.addEventListener('click', function () {
  var randomFireballColor = pickRandomColor(fireballColors);

  wizardFireball.style.backgroundColor = randomFireballColor;
  wizardFireballInput.value = randomFireballColor;
});


// Main functions

var generateWizards = function (name, surname, coatColor, eyesColor) {
  for (var i = 0; i < 4; i++) {
    var wizard = {
      name: names[generateRandomValue(name)],
      surname: surnames[generateRandomValue(surname)],
      coatColor: coatColors[generateRandomValue(coatColor)],
      eyesColor: eyesColors[generateRandomValue(eyesColor)]
    };
    wizards.push(wizard);
  }

  return wizards;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.surname;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var renderElements = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  similarListElement.appendChild(fragment);
};

// Execution

generateWizards(names, surnames, coatColors, eyesColors);
renderElements();
