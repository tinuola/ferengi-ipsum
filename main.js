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

//On submit, display user's request
let submitElem = document.getElementById("submit-btn");
submitElem.addEventListener("click", displayRules);

//Display n # of rules
function displayRules(){
	let userInput = document.getElementById("user-input").value;
	let displayArr = [];
	for (var i = 0; i < Number(userInput); i++){
		displayArr.push(pickRandomRule());
	}
	ipsumDisplay.innerHTML = displayArr.join(" ");
}

//Generate a random rule
function pickRandomRule(){
	let randomRule = Math.floor(Math.random()*rules.length);
	return rules[randomRule];
}