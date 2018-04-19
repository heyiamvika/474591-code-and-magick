'use strict';

// 1;
var setup = document.querySelector('.setup');
setup.classList.remove('hidden');

// 2

var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

var generateWizards = function (name, surname, coatColor, eyesColor) {

  var wizards = [];

  for (var i = 0; i < 4; i++) {
    var random = function (array) {
      return Math.floor(Math.random() * array.length);
    };

    var wizard = {
      name: names[random(name)],
      surname: surnames[random(surname)],
      coatColor: coatColors[random(coatColor)],
      eyesColor: eyesColors[random(eyesColor)]
    };

    wizards.push(wizard);
  }

  return wizards;
};

var wizards = generateWizards(names, surnames, coatColors, eyesColors);

// 3
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var renderWizards = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.surname;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

// 4
var fillFragments = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizards(wizards[i]));
  }

  similarListElement.appendChild(fragment);
};

fillFragments();

// 5
var setupSimilar = document.querySelector('.setup-similar');
setupSimilar.classList.remove('hidden');

// Another decision

// var renderWizards = function () {
//   var similarListElement = document.querySelector('.setup-similar-list');
//   var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
//
//   for (var i = 0; i < 4; i++) {
//     var wizardElement = similarWizardTemplate.cloneNode(true);
//
//     wizardElement.querySelector('.setup-similar-label').textContent = wizards[i].name + ' ' + wizards[i].surname;
//     wizardElement.querySelector('.wizard-coat').style.fill = wizards[i].coatColor;
//     wizardElement.querySelector('.wizard-eyes').style.fill = wizards[i].eyesColor;
//
//     similarListElement.appendChild(wizardElement);
//   }
// };
//
// renderWizards();
