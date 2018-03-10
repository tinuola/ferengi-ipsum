/*jshint esversion: 6 */
////////// Initialize Firebase/////////////////
var config = {
	apiKey: "AIzaSyBDUg-JpP4C49m-nzuB_buQmAtJ_Kr3hoA",
	authDomain: "ferengi-ipsum.firebaseapp.com",
	databaseURL: "https://ferengi-ipsum.firebaseio.com",
	projectId: "ferengi-ipsum",
	storageBucket: "ferengi-ipsum.appspot.com",
	messagingSenderId: "180729146431"
};
firebase.initializeApp(config);
///////////////////////////////////////////////


let ipsumDisplay = document.getElementById("ipsum-display");
let userInputElem = document.getElementById("user-input");
let submitElem = document.getElementById("submit-btn");

//Firebase database reference object
let rulesRef = firebase.database().ref("rules");

//Store rules retrieved from Firebase
let fbRulesArr;
let randomRuleIndex;
//Firebase event listener
rulesRef.on("value", getFbRules);

function getFbRules (dataSnapshot){
	fbRulesArr = dataSnapshot.val();
	let starterRule = pickRandomRule();
	ipsumDisplay.innerHTML = starterRule;
	console.log(fbRulesArr);
}

//Generate a random rule
function pickRandomRule(){
	/* Get a random rule between 1 and length of 
	rules array (skips 0 index which is empty)*/
	randomRuleIndex = Math.floor(Math.random() * (fbRulesArr.length-1) + 1);
	return fbRulesArr[randomRuleIndex].description;
}

//On submit button click, display user's request
submitElem.addEventListener("click", displayRules);

//Display n # of rules
function displayRules(){
	let userInputVal = document.getElementById("user-input").value;
	let requestedRulesArr = [];
	let requestedRulesIndexArr = [];
	let getRandomRule;

	while(requestedRulesArr.length < Number(userInputVal)){
		getRandomRule = pickRandomRule();
		if(!requestedRulesIndexArr.includes(randomRuleIndex)){
			//randomRuleIndex is generated from pickRandomRule()
			requestedRulesIndexArr.push(randomRuleIndex);
			requestedRulesArr.push(getRandomRule);
		}
	}
	console.log(requestedRulesArr);
	ipsumDisplay.innerHTML = removeCase(requestedRulesArr).join(" ");
}

//On pressing "enter" key after input, display user's request
userInputElem.addEventListener("keypress", pressSubmit);

//Display rules on keypress "enter"
function pressSubmit(event){
	if (event.keyCode === 13) {
		displayRules();
	}
}

//Remove case of rules
function removeCase(arr){
	if(arr.length > 1){
		var arrUncapped = [arr[0]];
			for(var i = 1; i < arr.length; i++){
				arrUncapped.push(arr[i].toLowerCase());
			}
		return arrUncapped;
		} 
}

//Copy displayed rule(s) to clipboard
//Initialize Clipboard.js
let copyElem = document.getElementById("copy-btn");
let clipboard = new Clipboard(copyElem);