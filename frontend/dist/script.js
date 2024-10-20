"use strict";
var loged = false;
var login = document.getElementById("login");
var logOut = document.getElementById("logOut");
var register = document.getElementById("register");
logOut.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
});
function checkButtons() {
    if (loged) {
        logOut.style.display = "flex";
        register.style.display = "none";
    }
    else if (!loged) {
        logOut.style.display = "none";
        register.style.display = "flex";
    }
}
window.onload = function () {
    checkButtons();
};
