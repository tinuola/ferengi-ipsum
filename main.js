// Initialize Firebase
var config = {
	apiKey: "AIzaSyAKPeWrJfUzirO1WJvXb4bsMNTFr-SM6Wg",
	authDomain: "fir-starter-d393d.firebaseapp.com",
	databaseURL: "https://fir-starter-d393d.firebaseio.com",
	projectId: "fir-starter-d393d",
	storageBucket: "fir-starter-d393d.appspot.com",
	messagingSenderId: "261444474725"
};
firebase.initializeApp(config);

//Hardcoded rules
let rules = [
	"War is good for business",
	"You can't make a deal if you're dead",
	"Every man has his price",
	"Exploitation begins at home",
	"Expand or die",
	"Whisper your way to success",
	"Knowledge equals profit",
	"Once you have their money you never give it back",
	"Even if it's free you can always buy it cheaper",
	"Satisfaction is not guaranteed"
];

let fbDisplayElem = document.getElementById("firebase-display");
let fbRulesListRef = firebase.database().ref("rules/");

// fbRulesListRef.on("value", displayFirebase);
// function displayFirebase(dataSnapshot) {
// 	let displayOfRules = dataSnapshot.val();
// 	fbDisplayElem.textContent = JSON.stringify(displayOfRules);
// }

fbRulesListRef.on("value", displayAllRules);
function displayAllRules (dataSnapshot) {
	let getRules = dataSnapshot.val();
	//console.log(getRules);
	let displayRules = getRules.forEach(singleRule);
	console.log(displayRules);
	fbDisplayElem.textContent = displayRules;
}
function singleRule(ruleObject){
	//console.log(ruleObject.description);
	return ruleObject.description;
}

//Display a random rule on start page
let starterRule = pickRandomRule();
let ipsumDisplay = document.getElementById("ipsum-display");
ipsumDisplay.innerHTML = starterRule;

//On submit button click, display user's request
let submitElem = document.getElementById("submit-btn");
submitElem.addEventListener("click", displayRules);

//On pressing "enter" key after input, display user's request
let userInputElem = document.getElementById("user-input");
userInputElem.addEventListener("keypress", pressSubmit);

//Copy displayed rule(s) to clipboard
//Initialize Clipboard.js
let copyElem = document.getElementById("copy-btn");
let clipboard = new Clipboard(copyElem);

//Display n # of rules
function displayRules(){
	let userInputVal = document.getElementById("user-input").value;
	let displayArr = [];
	for (var i = 0; i < Number(userInputVal); i++){
		displayArr.push(pickRandomRule());
	}
	ipsumDisplay.innerHTML = removeCase(displayArr).join(" ");
}

//Display rules on keypress "enter"
function pressSubmit(event){
	if (event.keyCode === 13) {
		displayRules();
	}
}

//Remove case of subsequent rules
function removeCase(arr){
	if(arr.length > 1){
		var arrUncapped = [arr[0]];
		  for(var i = 1; i < arr.length; i++){
			  arrUncapped.push(arr[i].toLowerCase());
		  }
		return arrUncapped;
	  } 
}

//Generate a random rule
function pickRandomRule(){
	let randomRule = Math.floor(Math.random()*rules.length);
	return rules[randomRule];
}