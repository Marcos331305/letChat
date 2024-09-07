// import supabase-Client from supaBase.js
import { supabase } from "../scripts/supaBase.js";

// fetching elements
const userNameInput = document.querySelector(".js-userName-letChat");
const userPasswordInput = document.querySelector(".js-userPassword-letChat");
const loginBtn = document.querySelector(".js-login-btn");
const interactionArea = document.querySelector(".js-interaction-area");

// removeErrorMessage from interaction-area after 3 seconds
function removeErrorMsg(){
    const msg = interactionArea.querySelector('.interaction-area-msg');
    msg.remove();
}

// userAuthentication
function userAuthentication(userData, password) {
  if (password === userData.password) {
    window.location.href = "./home.html";
  } else {
    interactionArea.innerHTML = `<p class="text-white ml-5 interaction-area-msg">Invalid userName or Password ☹️</P>`;
    setTimeout(removeErrorMsg,3000);
  }
}

// fetch usersData from dB
async function fetchUserData(userName, password) {
  let userData;
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("userName", userName)
    .single();
  userData = data;
  if (userData) {
    userAuthentication(userData, password);
  } else {
    interactionArea.innerHTML = `<p class="text-white ml-5 interaction-area-msg">Invalid userName or Password ☹️</P>`;
    setTimeout(removeErrorMsg,3000);
  }
}
// fetchUserData();

// adding loginBtn functionality
loginBtn.addEventListener("click", (e) => {
  const userName = userNameInput.value;
  const password = userPasswordInput.value;
  if (userName && password) {
    fetchUserData(userName, password);
  } else {
    alert("please privide details First !");
  }
});
