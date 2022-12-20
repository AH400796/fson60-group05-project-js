const buttonsToHide = document.getElementById("btncont");
const myLibrary = document.getElementById("mylib");
const home = document.getElementById("home");
const logo = document.getElementsByClassName("header__logo")[0];
myLibrary.addEventListener("click", unHide);
home.addEventListener("click", hide);
logo.addEventListener("click", hide);

function hide() {
    buttonsToHide.style.display = "none";
}
hide()

function unHide() {
    buttonsToHide.style.display = "block";
}

