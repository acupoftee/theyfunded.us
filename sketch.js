var data;
var entries = [];
var n;
var r, g, b;
var l = 0;

// get the data. published by the NEA
function prepList() {
  var url = 'https://spreadsheets.google.com/feeds/list/1-tM404sCGoyRQYeUCge1qFpfRLt92lfuyYAA0ESN2O8/od6/public/values?alt=json';
  data = loadJSON(url);
  document.body.style.backgroundColor = 'white';
}

// p5.js setup code
function setup() {
  getLines();
  noCanvas();
}

// p5.js drawing code
function draw() {}

function shuffle(array) {
  var current = array.length, tempValue, randomIndex;

  // while we're still shuffling elements
  while (0 !== current) {
    // pick remaining element
    randomIndex = Math.floor(Math.random() * current);
    current -= 1;

    // swap with current element
    tempValue = array[current];
    array[current] = array[randomIndex];
    array[randomIndex] = tempValue;
  }
  return array;
}

// look through the spreadsheets feed for list items
function getLines() {
  for (var i = 0; i < data.feed.entry.length; i++) {
    n = data.feed.entry.length;
    var line = data.feed.entry[i].title.$t + " in " + data.feed.entry[i].gsx$_cokwr.$t + ", " + data.feed.entry[i].gsx$_cpzh4.$t + ".";
    console.log(line);
    entries.push(line);
  }
  entries = shuffle(entries);
  emitEntries();
}

// shove it in their faces with splashes of color
function emitEntries() {
  setInterval(function() {
    r = int(random(255));
    g = int(random(255));
    b = int(random(255));
    var p = document.createElement('p');
    p.style.color = 'rgb(' + r + ',' + g + ',' + b + ')';
    p.textContent = entries[l];
    var items = document.getElementById('items');
    items.insertBefore(p, items.firstChild);
    l++;
    if (l > entries.length - 1) l = 0;
  }, 1200);
}
