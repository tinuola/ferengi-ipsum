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

//Display a random rule on start page
let starterRule = pickRandomRule();
let ipsumDisplay = document.getElementById("ipsum-display");
ipsumDisplay.innerHTML = starterRule;

//On submit button click, display user's request
let submitElem = document.getElementById("submit-btn");
submitElem.addEventListener("click", displayRules);

//On pressing "enter" key after input
let userInputElem = document.getElementById("user-input");
userInputElem.addEventListener("keypress", pressSubmit);

//Display rules on keypress "enter"
function pressSubmit(event){
    if (event.keyCode === 13) {
    	displayRules();
    }
}

//Display n # of rules
function displayRules(){
	let userInputVal = document.getElementById("user-input").value;
	let displayArr = [];
	for (var i = 0; i < Number(userInputVal); i++){
		displayArr.push(pickRandomRule());
	}
	// ipsumDisplay.innerHTML = displayArr.join(" ");
	ipsumDisplay.innerHTML = removeCase(displayArr).join(" ");
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