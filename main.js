
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

//Firebase database reference object
let rulesRef = firebase.database().ref("rules");

//Firebase event listener
rulesRef.on("value", displayRules);

//Store rules from Firebase
let fbRulesArr = [];

function displayRules (dataSnapshot){
	
	let rulesData = dataSnapshot.val();
	rulesData.forEach(singleRule);
	
	//Display one random rule on start page
	let starterRule = pickRandomRule();
	let ipsumDisplay = document.getElementById("ipsum-display");
	ipsumDisplay.innerHTML = starterRule;

	//Generate a random rule
	function pickRandomRule(){
		let randomRule = Math.floor(Math.random()*fbRulesArr.length);
		return fbRulesArr[randomRule];
	}

	//On submit button click, display user's request
	let submitElem = document.getElementById("submit-btn");
	submitElem.addEventListener("click", displayRules);

	//On pressing "enter" key after input, display user's request
	let userInputElem = document.getElementById("user-input");
	userInputElem.addEventListener("keypress", pressSubmit);

	//Display n # of rules
	function displayRules(){
		let userInputVal = document.getElementById("user-input").value;
		let displayUserRulesArr = [];
		for (var i = 0; i < Number(userInputVal); i++){
			displayUserRulesArr.push(pickRandomRule());
		}
		ipsumDisplay.innerHTML = removeCase(displayUserRulesArr).join(" ");
	}

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

} ////////End of Firebase Event Listener function

//Retrieve each rule from Firebase
function singleRule(ruleObj){
	fbRulesArr.push(ruleObj.description);
}

//Copy displayed rule(s) to clipboard
//Initialize Clipboard.js
let copyElem = document.getElementById("copy-btn");
let clipboard = new Clipboard(copyElem);