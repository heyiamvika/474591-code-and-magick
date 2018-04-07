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
  ctx.moveTo(x, y); // left upper
  ctx.lineTo(x + (width / 2), y + 15); // middle upper
  ctx.lineTo(x + width, y); // right upper
  ctx.lineTo(x + (width - 15), y + (height / 2)); // right middle
  ctx.lineTo(x + width, y + height); // right bottom
  ctx.lineTo(x + (width / 2), y + (height - 15)); // middle bottom
  ctx.lineTo(x, y + height); // left bottom
  ctx.lineTo(x + 15, y + (height / 2)); // left middle
  ctx.shadowColor = colorShadow;
  ctx.shadowBlur = 20;
  ctx.shadowOffsetX = 10;
  ctx.shadowOffsetY = 10;
  ctx.closePath();
  ctx.strokeStyle = colorStroke;
  ctx.stroke();
  ctx.fillStyle = colorFill;
  ctx.fill();
};

// Random blue color

var generateRandomBlue = function () {
  return 'rgba(0, 0, ' + (Math.floor(Math.random() * 255)) + ', ' + Math.random() + ')';
};

// Generate max Element and sort statistics
// Think how to use this function with empty arrays!

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  return maxElement;

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
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

  ctx.fillText(Math.round(times[0]),
      CLOUD_X + PADDING_HORIZONTAL,
      CLOUD_Y + PADDING_VERTICAL + FONT_GAP * 2);
  ctx.fillText(
      names[0],
      CLOUD_X + PADDING_HORIZONTAL,
      CLOUD_Y + PADDING_VERTICAL + FONT_GAP * 2 + CHART_HEIGHT + FONT_GAP * 1.25);
  ctx.fillStyle = 'rgba(255, 0, 0, 1)';
  ctx.fillRect(
      CLOUD_X + PADDING_HORIZONTAL,
      CLOUD_Y + PADDING_VERTICAL + FONT_GAP * 2.25,
      BAR_WIDTH,
      CHART_HEIGHT);

  for (var i = 1; i < names.length; i++) {
    ctx.fillStyle = 'black';
    var maxTime = getMaxElement(times);
    var barHeight = CHART_HEIGHT * Math.round(times[i]) / maxTime;

    ctx.fillText(Math.round(times[i]),
        CLOUD_X + PADDING_HORIZONTAL + BAR_WIDTH * (i) + BAR_GAP * (i),
        CLOUD_Y + PADDING_VERTICAL + (CHART_HEIGHT - barHeight) + FONT_GAP * 2);
    ctx.fillText(
        names[i],
        CLOUD_X + PADDING_HORIZONTAL + BAR_WIDTH * (i) + BAR_GAP * (i),
        CLOUD_Y + PADDING_VERTICAL + FONT_GAP * 2 + CHART_HEIGHT + FONT_GAP * 1.25);
    ctx.fillStyle = generateRandomBlue(); // Temporary
    ctx.fillRect(
        CLOUD_X + PADDING_HORIZONTAL + BAR_WIDTH * (i) + BAR_GAP * (i),
        CLOUD_Y + PADDING_VERTICAL + (CHART_HEIGHT - barHeight) + FONT_GAP * 2.25,
        BAR_WIDTH,
        barHeight);
  }
};
