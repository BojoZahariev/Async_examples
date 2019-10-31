//Callbacks

var fs = require('fs'); // require is a special function provided by node
var myNumber = undefined; // we don't know what the number is yet since it is stored in a file

function addOne() {
  fs.readFile('number.txt', function doneReading(err, fileContents) {
    myNumber = parseInt(fileContents);
    myNumber++;
  });
}

addOne();

console.log(myNumber); // logs out undefined -- this line gets run before readFile is done

//Like that
var fs = require('fs');
var myNumber = undefined;

function addOne(callback) {
  fs.readFile('number.txt', function doneReading(err, fileContents) {
    myNumber = parseInt(fileContents);
    myNumber++;
    callback();
  });
}

function logMyNumber() {
  console.log(myNumber);
}

addOne(logMyNumber);

//pseudocode version of the above example:
function addOne(thenRunThisFunction) {
  waitAMinuteAsync(function waitedAMinute() {
    thenRunThisFunction();
  });
}

addOne(function thisGetsRunAfterAddOneFinishes() {});

var fs = require('fs');
fs.readFile('movie.mp4', finishedReading);

function finishedReading(error, movieData) {
  if (error) return console.error(error);
  // do something with the movieData
}
