// Description: This file contains the code for the sign-in page

// These functions are used to toggle between the login and register forms
let loginForm = document.getElementById("login");
let registerForm = document.getElementById("register");
let buttonHighlight = document.getElementById("btn");
let loginBtn = document.getElementById("login-btn");
let registerBtn = document.getElementById("register-btn");

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
var numberOfClicks = 0;
var numberOfKeystrokes = 0;

// Get the time when the user enters the page
let timeStampEntered = Date.now();

// Get the section where we want to display the tracking data
let trackingDataSection = document.getElementById("tracking-data");

// Get all input fields which we want to track
let countInputs = registerForm.getElementsByClassName("count-characters");

// Increment the number of clicks when the user clicks on the page
function incClicks() {
  numberOfClicks++;
}

// Increment the number of keystrokes when the user types on any input field
function incKeystrokes() {
  numberOfKeystrokes++;
}

// Count the total number of characters typed in all input fields
function countTotalTypedCharacters() {
  var numberOfCharacters = 0;
  // Loop through all input fields and add the length of the value to the total
  for (var input = 0; input < countInputs.length; input++) {
    numberOfCharacters += countInputs[input].value.length;
  }
  return numberOfCharacters;
}

// Get the time spent on the page as a string
function getTimeSpent() {
  let timeSpent = Date.now() - timeStampEntered;
  let minutes = Math.floor(timeSpent / 60000);
  let seconds = ((timeSpent % 60000) / 1000).toFixed(0);
  return minutes + " minutes and " + seconds + " seconds";
}

// Display the tracking data when the user submits the form
function registerSubmit() {
  trackingDataSection.textContent =
    "Number of mouse clicks: " +
    numberOfClicks +
    "\nTotal time spent: " +
    getTimeSpent() +
    "\nTotal key presses: " +
    numberOfKeystrokes +
    "\nTotal number of characters typed: " +
    countTotalTypedCharacters();
  trackingDataSection.style.visibility = "visible";

  // Initiate the validity checking
  let checks = registerForm.getElementsByTagName("input");
  for (let i = 0; i < checks.length; i++) {
    checks[i].setCustomValidity(checkValidity(checks[i]));
    checks[i].reportValidity();
  }
  registerForm.submit();
}

// End of behavioral tracking code


// Validity checking

function isUpperCase(char) {
  return (char === char.toUpperCase() && char !== char.toLowerCase());
}

function isSpecialCharOrNumber(char) {
  return (char.toUpperCase() === char.toLowerCase());
}

function isNumber(char) {

}

function checkValidity(input) {
  alert(input.id);
  if (input.classList.includes("required") && input.value.length === 0) return "This field is required.";
  switch (input.id) {
    case "register-username": return usernameValidity(input.value);
    case "register-email": return emailValidity(input.value);
    case "register-password": return passwordValidity(input.value);
    case "register-firstname": return firstnameValidity(input.value);
    case "register-lastname": return lastnameValidity(input.value);
    case "register-gender": return genderValidity(input.value);
    case "register-language": return languageValidity(input.value);
    case "register-dob": return dobValidity(input.value);
    case "register-address": return "";
    case "register-country": return countryValidity(input.value);
    case "register-zipcode": return zipcodeValidity(input.value);
    case "register-tel": return telValidity(input.value);
    case "register-bio": return "";
    case "register-licensetype": return licensetypeValidity(input.value);
    case "register-license": return licenseValidity(input.value);
    case "register-terms": return termsValidity(input.value);
  }
}

function usernameValidity(txt) {
  if (!isUpperCase(txt.charAt(0))) return "First character must be a capital letter.";
  if (txt.length < 5 || txt.length > 12) return "The username must be of length 5 to 12.";
  if (!isSpecialCharOrNumber(txt.charAt(txt.length - 1))) return "Last character must be a number or special character.";
  return "";
}

function emailValidity(txt) {
  return "";
}

function passwordValidity(txt) {
  return "";
}

function firstnameValidity(txt) {
  return "";
}

function lastnameValidity(txt) {
  return "";
}

function genderValidity(txt) {
  return "";
}

function languageValidity(txt) {
  return "";
}

function dobValidity(txt) {
  return "";
}

function countryValidity(txt) {
  return "";
}

function zipcodeValidity(txt) {
  return "";
}

function telValidity(txt) {
  return "";
}

function licensetypeValidity(txt) {
  return "";
}

function licenseValidity(txt) {
  return "";
}

function termsValidity(txt) {
  return "";
}
