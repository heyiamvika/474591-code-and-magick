'use strict';
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 110;
var CLOUD_Y = 10;
var PADDING_HORIZONTAL = 55;
var PADDING_VERTICAL = 35;
var FONT_GAP = 20;
var CHART_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;

// Cloud rendering

var renderCloud = function (ctx, x, y, width, height, colorStroke, colorFill, colorShadow) {
  ctx.beginPath();
  ctx.fillStyle = colorFill;
  ctx.fillRect(110, 10, 420, 270);
  ctx.shadowColor = colorShadow;
  ctx.shadowBlur = 20;
  ctx.shadowOffsetX = 10;
  ctx.shadowOffsetY = 10;
  ctx.closePath();
  ctx.strokeStyle = colorStroke;
  ctx.stroke();
};

// Random blue color

var generateRandomBlue = function () {
  return 'rgba(0, 0, ' + (Math.floor(Math.random() * 255)) + ', ' + Math.random() + ')';
};

// Generate max Element and sort statistics

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

// Stats final rendering

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, 'black', 'white', 'rgba(0, 0, 0, 0.7)');

  // Game chart

  ctx.shadowColor = 'transparent';
  ctx.fillStyle = 'black';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура, вы победили!', CLOUD_X + PADDING_HORIZONTAL, CLOUD_Y + PADDING_VERTICAL);
  ctx.fillText('Список результатов:', CLOUD_X + PADDING_HORIZONTAL, CLOUD_Y + PADDING_VERTICAL + FONT_GAP);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = 'black';
    var maxTime = getMaxElement(times);
    var barHeight = CHART_HEIGHT * Math.round(times[i]) / maxTime;
    var xPosition = CLOUD_X + PADDING_HORIZONTAL + BAR_WIDTH * (i) + BAR_GAP * (i);

    ctx.fillText(Math.round(times[i]),
        xPosition,
        CLOUD_Y + PADDING_VERTICAL + (CHART_HEIGHT - barHeight) + FONT_GAP * 2);
    ctx.fillText(
        names[i],
        xPosition,
        CLOUD_Y + PADDING_VERTICAL + FONT_GAP * 2 + CHART_HEIGHT + FONT_GAP * 1.25);

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = generateRandomBlue();
    }

    ctx.fillRect(
        xPosition,
        CLOUD_Y + PADDING_VERTICAL + (CHART_HEIGHT - barHeight) + FONT_GAP * 2.25,
        BAR_WIDTH,
        barHeight);
  }
};
