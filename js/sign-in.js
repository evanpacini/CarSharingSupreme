// Description: This file contains the code for the sign-in page

// These functions are used to toggle between the login and register forms
const loginForm = document.getElementById("login");
const registerForm = document.getElementById("register");
const buttonHighlight = document.getElementById("btn");
const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");

function register() {
  loginForm.style.left = "-200%";
  registerForm.style.left = "0vw";
  buttonHighlight.style.left = "50%";
  loginBtn.style.color = "var(--on-surface)";
  registerBtn.style.color = "var(--on-primary)";
}
function login() {
  loginForm.style.left = "0";
  registerForm.style.left = "200%";
  buttonHighlight.style.left = "0";
  loginBtn.style.color = "var(--on-primary)";
  registerBtn.style.color = "var(--on-surface)";
}

// Behavioral tracking code

// Initialize the counters
let numberOfClicks = 0;
let numberOfKeystrokes = 0;

// Get the time when the user enters the page
const timeStampEntered = Date.now();

// Get the section where we want to display the tracking data
const trackingDataSection = document.getElementById("tracking-data");

// Get all input fields which we want to track
const countInputs = registerForm.getElementsByClassName("count-characters");

// Increment the number of clicks when the user clicks on the page
function incClicks() { numberOfClicks++; }

// Increment the number of keystrokes when the user types on any input field
function incKeystrokes() { numberOfKeystrokes++; }

// Count the total number of characters typed in all input fields
function countTotalTypedCharacters() {
  let numberOfCharacters = 0;
  // Loop through all input fields and add the length of the value to the total
  for (let input = 0; input < countInputs.length; input++) {
    numberOfCharacters += countInputs[input].value.length;
  }
  return numberOfCharacters;
}

// Get the time spent on the page as a string
function getTimeSpent() {
  const timeSpent = Date.now() - timeStampEntered;
  const minutes = Math.floor(timeSpent / 60000);
  const seconds = ((timeSpent % 60000) / 1000).toFixed(0);
  return minutes + " minutes and " + seconds + " seconds";
}

// Display the tracking data when the user submits the form
function registerSubmit() {
  trackingDataSection.textContent =
      "Number of mouse clicks: " + numberOfClicks +
      "\nTotal time spent: " + getTimeSpent() +
      "\nTotal key presses: " + numberOfKeystrokes +
      "\nTotal number of characters typed: " + countTotalTypedCharacters();
  trackingDataSection.style.visibility = "visible";

  // Initiate the validity checking
  let checks = registerForm.getElementsByTagName("input");
  let valid = true;
  for (let i = checks.length - 1; i >= 0; i--) {
    const validityString = checkValidity(checks[i]);
    checks[i].setCustomValidity(validityString);
    checks[i].reportValidity();
    if (validityString !== "")
      valid = false;
  }
  registerForm.submit();
  if (valid)
    alert(
        JSON.stringify([...(new FormData(registerForm)).entries() ], null, 4));
}

// End of behavioral tracking code

// Validity checking

function isUpperCase(char) {
  return (char === char.toUpperCase() && char !== char.toLowerCase());
}

function isLowerCase(char) {
  return (char === char.toLowerCase() && char !== char.toUpperCase());
}

function isSpecialCharOrNumber(char) {
  return (char.toUpperCase() === char.toLowerCase());
}

function isSpecialChar(char) {
  return (isSpecialCharOrNumber(char) && !isNumber(char));
}

function isNumber(char) { return (!isNaN(parseInt(char))); }

function checkValidity(input) {
  if (input.classList.contains("required") && (input.value.length === 0))
    return "This field is required.";
  switch (input.id) {
  case "register-username":
    return usernameValidity(input.value);
  case "register-email":
    return emailValidity(input.value);
  case "register-password":
    return passwordValidity(input.value);
  case "register-firstname", "register-lastname":
    return nameValidity(input.value);
  case "register-zipcode":
    return zipcodeValidity(input.value);
  case "register-tel":
    return telValidity(input.value);
  case "register-licensetype":
    return (input.value.length > 0 ? licensetypeValidity(input.value) : "");
  case "register-terms":
    return termsValidity(input);
  default:
    return "";
  }
}

function usernameValidity(txt) {
  if (!isUpperCase(txt.charAt(0)))
    return "First character must be a capital letter.";
  if (txt.length < 5 || txt.length > 12)
    return "The username must be of length 5 to 12.";
  if (!isSpecialCharOrNumber(txt.charAt(txt.length - 1)))
    return "Last character must be a number or special character.";
  return "";
}

function emailValidity(txt) {
  if (txt.indexOf('@') === -1)
    return "There must be an @ symbol.";
  if (txt.indexOf('@') !== txt.lastIndexOf('@'))
    return "There must be only one @ symbol.";
  if (txt.indexOf('@') === 0)
    return "There must be something before the @ symbol.";
  if (txt.indexOf('@') === txt.length - 1)
    return "There must be something after the @ symbol.";
  return "";
}

function passwordValidity(txt) {
  if ([...txt ].filter(isUpperCase).length === 0)
    return "The password must contain at least one upper case letter.";
  if ([...txt ].filter(isLowerCase).length === 0)
    return "The password must contain at least one lower case letter.";
  if ([...txt ].filter(isNumber).length === 0)
    return "The password must contain at least one number.";
  if ([...txt ].filter(isSpecialChar).length === 0)
    return "The password must contain at least one special character.";
  if (txt.length < 12)
    return "The password must be longer than 12 characters.";

  return "";
}

function nameValidity(txt) {
  if ([...txt ].filter(isSpecialCharOrNumber).length > 0)
    return "Use only letters of the alphabet.";
  return "";
}

//^[1-9]\d{3}\s?[a-zA-Z]{2}$
function zipcodeValidity(txt) {
  // Check if the zipcode is a valid dutch zipcode without using regex
  switch (txt.length) {
  case 6:
    if ([...txt.substring(4) ].filter(isSpecialCharOrNumber).length > 0)
      return "The four digits must be followed by two letters.";
    break;
  case 7:
    if ([...txt.substring(5) ].filter(isSpecialCharOrNumber).length > 0)
      return "The four digits must be followed by two letters.";
    if (txt.charAt(4) !== ' ')
      return "Seperate the four digits from the two letters only with a space.";
    break;
  default:
    return "The zipcode must consist of four digits and two letters.";
  }
  if (txt.charAt(0) === '0')
    return "The zipcode must start with a number between 1 and 9.";
  if ([...txt.substring(0, 4) ].filter(isNumber).length < 4)
    return "The zipcode must start with four digits.";
  return "";
}

function telValidity(txt) {
  if (txt.charAt(0) !== '+')
    return "The E.164 format requires a + at the start.";
  if (txt.length > 16)
    return "The E.164 format disallows phone numbers larger than 15 digits.";
  if (txt.length < 11)
    return "The E.164 format disallows phone numbers smaller than 10 digits.";
  return "";
}

//^([Aa][12Mm]?)|([Bb][+Ee]?)|([CDcd][1Ee]?)|([CDcd]1[Ee])|[Tt]$
function licensetypeValidity(txt) {
  const licensetypes = [
    "A", "A1", "A2", "AM", "B", "B+", "BE", "C", "C1", "CE", "C1E", "D", "D1",
    "DE", "D1E", "T"
  ];
  if (!licensetypes.includes(txt.toUpperCase()))
    return "The license type must be one of the following: " +
           licensetypes.join(", ");
  return "";
}

function termsValidity(input) {
  if (!input.checked)
    return "You must accept the terms and conditions.";
  return "";
}
