var loged: boolean = false;

var login = document.getElementById("login") as HTMLButtonElement;
var logOut = document.getElementById("logOut") as HTMLButtonElement;
var register = document.getElementById("register") as HTMLButtonElement;

logOut.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
    
  
});

function checkButtons(): void {
  if (loged) {
    logOut.style.display = "flex";
    register.style.display = "none";
  } else if (!loged) {
    logOut.style.display = "none";
    register.style.display = "flex";
  }
}

window.onload = function () {
  checkButtons();
};
