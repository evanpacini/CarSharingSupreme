var loginForm = document.getElementById("login");
var registerForm = document.getElementById("register");
var buttonHighlight = document.getElementById("btn");
var loginBtn = document.getElementById("login-btn");
var registerBtn = document.getElementById("register-btn");

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
