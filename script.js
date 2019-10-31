//CALLBACKS

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

//example
var fs = require('fs');
fs.readFile('movie.mp4', finishedReading);

function finishedReading(error, movieData) {
  if (error) return console.error(error);
  // do something with the movieData
}

//PROMISES
const myData = getData(); // if this is refactored to return a Promise...

myData.then(function(data) {
  // .then() tells it to wait until the promise is resolved
  const pieceOfData = data['whatever']; // and THEN run the function inside
});

//Basic Promise Usage
var p = new Promise(function(resolve, reject) {
	
	// Do an async task async task and then...

	if(/* good condition */) {
		resolve('Success!');
	}
	else {
		reject('Failure!');
	}
});

p.then(function(result) { 
	/* do something with the result */
}).catch(function() {
	/* error :( */
}).finally(function() {
   /* executes regardless or success for failure */ 
});

//****then
//The then callback is triggered when the promise is resolved.

new Promise(function(resolve, reject) {
	// A mock async action using setTimeout
	setTimeout(function() { resolve(10); }, 3000);
})
.then(function(result) {
	console.log(result);
});

// From the console:
// 10

//catch
//The catch callback is executed when the promise is rejected:

new Promise(function(resolve, reject) {
	// A mock async action using setTimeout
	setTimeout(function() { reject('Done!'); }, 3000);
})
.then(function(e) { console.log('done', e); })
.catch(function(e) { console.log('catch: ', e); });

// From the console:
// 'catch: Done!'

//finally
//The newly introduced finally callback is called regardless of success or failure:

(new Promise((resolve, reject) => { reject("Nope"); }))
    .then(() => { console.log("success") })
    .catch(() => { console.log("fail") })
    .finally(res => { console.log("finally") });

// >> fail
// >> finally

//Promise.all
Promise.all([promise1, promise2]).then(function(results) {
	// Both promises resolved
})
.catch(function(error) {
	// One or more promises was rejected
});

var request1 = fetch('/users.json');
var request2 = fetch('/articles.json');

Promise.all([request1, request2]).then(function(results) {
	// Both promises done!
});

//Promise.race

var req1 = new Promise(function(resolve, reject) { 
	// A mock async action using setTimeout
	setTimeout(function() { resolve('First!'); }, 8000);
});
var req2 = new Promise(function(resolve, reject) { 
	// A mock async action using setTimeout
	setTimeout(function() { resolve('Second!'); }, 3000);
});
Promise.race([req1, req2]).then(function(one) {
	console.log('Then: ', one);
}).catch(function(one, two) {
	console.log('Catch: ', one);
});

// From the console:
// Then: Second!
