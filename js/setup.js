'use strict';

var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var wizards = [];

var setup = document.querySelector('.setup');
setup.classList.remove('hidden');
var setupSimilar = document.querySelector('.setup-similar');
setupSimilar.classList.remove('hidden');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var generateRandomValue = function (array) {
  return Math.floor(Math.random() * array.length);
};

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

var renderWizards = function (Wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = Wizard.name + ' ' + Wizard.surname;
  wizardElement.querySelector('.wizard-coat').style.fill = Wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = Wizard.eyesColor;

  return wizardElement;
};

var renderElements = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizards(wizards[i]));
  }

  similarListElement.appendChild(fragment);
};

generateWizards(names, surnames, coatColors, eyesColors);
renderElements();
