function myFunction(id) {
  const x = document.getElementById(id);
  if (x.className.indexOf("hidden") == -1) {
    x.className += " hidden";
    x.previousElementSibling.className =
      x.previousElementSibling.className.replace(" selected", "");
  } else {
    x.className = x.className.replace(" hidden", "");
    x.previousElementSibling.className += " selected";
  }
}
