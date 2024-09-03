// import supaBase-client from the supaBase.js
import { supabase } from "../scripts/supaBase.js";

// fetching elements
const userEmail = document.querySelector(".js-gmail-input");
const userNameInput = document.querySelector(".js-userName-letChat");
const loginBtn = document.querySelector(".js-login-btn");
const gmailArea = document.querySelector(".js-gmail-area");
const userNameArea = document.querySelector(".js-userName-area");

// error handling
function handlingClientError() {
    gmailArea.innerHTML += `<p class="error-para text-black mt-2 ml-5">please enter a valid Gmail.</p>`;
}
function handlingOtherErrors(){

}

// if magicLink Sent Successfully
function magicLinkSent(){
    const errorPara = gmailArea.querySelector('.error-para');
    if(errorPara){
        errorPara.remove();
    }
    userNameArea.innerHTML += `<p class="success-para text-white mt-2 ml-5">signUp-Link sent at provided Gmail.</p>`;
}

// creating a function for sending the magic-link to appropriate gmail
async function sendMagicLink(email) {
  const { error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      expiresIn: 120,
    },
  });
  if (error) {
    if(error.status === 400){
        handlingClientError();
    } else{
        handlingOtherErrors();
    }
  } else{
    magicLinkSent();
  }
}

function requiredInputs(){
    gmailArea.innerHTML = `<p class="error-para text-black mt-2 ml-5">required !</p>`;
    userNameArea.innerHTML = `<p class="success-para text-black mt-2 ml-5">required !</p>`;
}

// adding loginBtn functionality
loginBtn.addEventListener("click", () => {
  const email = userEmail.value;
  const userName = userNameInput.value;
  if (email && userName) {
    sendMagicLink(email);
  } else {
    // requiredInputs();
    alert('please enter a gMail & userName -FIRST they are MUST !');
  }
});
