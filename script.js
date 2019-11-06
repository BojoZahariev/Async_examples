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

//PROMISES

function add(xPromise,yPromise) {
	// `Promise.all([ .. ])` takes an array of promises,
	// and returns a new promise that waits on them
	// all to finish
	return Promise.all( [xPromise, yPromise] )

	// when that promise is resolved, let's take the
	// received `X` and `Y` values and add them together.
	.then( function(values){
		// `values` is an array of the messages from the
		// previously resolved promises
		return values[0] + values[1];
	} );
}

// `fetchX()` and `fetchY()` return promises for
// their respective values, which may be ready
// *now* or *later*.
add( fetchX(), fetchY() )

// we get a promise back for the sum of those
// two numbers.
// now we chain-call `then(..)` to wait for the
// resolution of that returned promise.
.then( function(sum){
	console.log( sum ); // that was easier!
} );

//Completion Event

function foo(x) {
	// start doing something that could take a while

	// make a `listener` event notification
	// capability to return

	return listener;
}

var evt = foo( 42 );

evt.on( "completion", function(){
	// now we can do the next step!
} );

evt.on( "failure", function(err){
	// oops, something went wrong in `foo(..)`
} );

//Promise "Events"

function foo(x) {
	// start doing something that could take a while

	// construct and return a promise
	return new Promise( function(resolve,reject){
		// eventually, call `resolve(..)` or `reject(..)`,
		// which are the resolution callbacks for
		// the promise.
	} );
}

var p = foo( 42 );

bar( p );

baz( p );

//internals of bar(..) and baz(..)

function bar(fooPromise) {
	// listen for `foo(..)` to complete
	fooPromise.then(
		function(){
			// `foo(..)` has now finished, so
			// do `bar(..)`'s task
		},
		function(){
			// oops, something went wrong in `foo(..)`
		}
	);
}

// ditto for `baz(..)`

//Another way to approach this is:

function bar() {
	// `foo(..)` has definitely finished, so
	// do `bar(..)`'s task
}

function oopsBar() {
	// oops, something went wrong in `foo(..)`,
	// so `bar(..)` didn't run
}

// ditto for `baz()` and `oopsBaz()`

var p = foo( 42 );

p.then( bar, oopsBar );

p.then( baz, oopsBaz );


/////////////

//PROMISE

let promise = new Promise(function(resolve, reject) {
	// the function is executed automatically when the promise is constructed
  
	// after 1 second signal that the job is done with the result "done"
	setTimeout(() => resolve("done"), 1000);
});

let promise = new Promise(function(resolve, reject) {
	// after 1 second signal that the job is finished with an error
	setTimeout(() => reject(new Error("Whoops!")), 1000);
});

//There can be only a single result or an error
let promise = new Promise(function(resolve, reject) {
	resolve("done");
  
	reject(new Error("…")); // ignored
	setTimeout(() => resolve("…")); // ignored
});

//Consumers: then, catch, finally

//then
promise.then(
	function(result) { /* handle a successful result */ },
	function(error) { /* handle an error */ }
);

////////
let promise = new Promise(function(resolve, reject) {
	setTimeout(() => resolve("done!"), 1000);
});
  
  // resolve runs the first function in .then
  promise.then(
	result => alert(result), // shows "done!" after 1 second
	error => alert(error) // doesn't run
  );

  /////
  let promise = new Promise(function(resolve, reject) {
	setTimeout(() => reject(new Error("Whoops!")), 1000);
  });
  
  // reject runs the second function in .then
  promise.then(
	result => alert(result), // doesn't run
	error => alert(error) // shows "Error: Whoops!" after 1 second
  );

  //catch
  let promise = new Promise((resolve, reject) => {
	setTimeout(() => reject(new Error("Whoops!")), 1000);
  });
  
  // .catch(f) is the same as promise.then(null, f)
  promise.catch(alert); // shows "Error: Whoops!" after 1 second

  //finally
  new Promise((resolve, reject) => {
	/* do something that takes time, and then call resolve/reject */
  })
	// runs when the promise is settled, doesn't matter successfully or not
	.finally(() => stop loading indicator)
	.then(result => show result, err => show error)

	new Promise((resolve, reject) => {
		setTimeout(() => resolve("result"), 2000)
	})

	.finally(() => alert("Promise ready"))
	.then(result => alert(result)); // <-- .then handles the result

	//////////

	//Example: loadScript

	function loadScript(src) {
		return new Promise(function(resolve, reject) {
		  let script = document.createElement('script');
		  script.src = src;
	  
		  script.onload = () => resolve(script);
		  script.onerror = () => reject(new Error(`Script load error for ${src}`));
	  
		  document.head.append(script);
		});
	}

	//Usage:
	let promise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");

     promise.then(
     script => alert(`${script.src} is loaded!`),
      error => alert(`Error: ${error.message}`)
     );

	promise.then(script => alert('Another handler...'));
	
	//ASYNC AND AWAIT

	async function getPersonsInfo(name) {
		const people = await server.getPeople();
		const person = people.find(person => { return person.name === name });
		return person;
	  }

	//The async keyword
	const yourAsyncFunction = async () => {
		// do something asynchronously and return a promise
		return result;
	  }

	anArray.forEach(async item => {
		// do something asynchronously for each item in 'anArray'
		// one could also use .map here to return an array of promises to use with 'Promise.all()'
	});

	server.getPeople().then(async people => {
		people.forEach(person => {
		  // do something asynchronously for each person
		});
	});

	//Error Handling

	asyncFunctionCall().catch(err => {
		console.error(err)
	});

	async function getPersonsInfo(name) {
		try {
		  const people = await server.getPeople();
		  const person = people.find(person => { return person.name === name });
		  return person;
		} catch (error) {
		  // Handle the error any way you'd like
		}
	}

	async function f() {

		let promise = new Promise((resolve, reject) => {
		  setTimeout(() => resolve("done!"), 1000)
		});
	  
		let result = await promise; // wait until the promise resolves (*)
	  
		alert(result); // "done!"
	  }

	  ////////////////
	  async function showAvatar() {

		// read our JSON
		let response = await fetch('/article/promise-chaining/user.json');
		let user = await response.json();
	  
		// read github user
		let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
		let githubUser = await githubResponse.json();
	  
		// show the avatar
		let img = document.createElement('img');
		img.src = githubUser.avatar_url;
		img.className = "promise-avatar-example";
		document.body.append(img);
	  
		// wait 3 seconds
		await new Promise((resolve, reject) => setTimeout(resolve, 3000));
	  
		img.remove();
	  
		return githubUser;
	  }
	  
	  showAvatar();

	  //*********************

	  //await won’t work in the top-level code
	  // syntax error in top-level code
     let response = await fetch('/article/promise-chaining/user.json');
	 let user = await response.json();
	 
	 //wrap it in a func
	 (async () => {
		let response = await fetch('/article/promise-chaining/user.json');
		let user = await response.json();
		...
	  })();

	 //await accepts “thenables”
	 class Thenable {
		constructor(num) {
		  this.num = num;
		}
		then(resolve, reject) {
		  alert(resolve);
		  // resolve with this.num*2 after 1000ms
		  setTimeout(() => resolve(this.num * 2), 1000); // (*)
		}
	  };
	  
	  async function f() {
		// waits for 1 second, then result becomes 2
		let result = await new Thenable(1);
		alert(result);
	  }
	  
	  f(); 
