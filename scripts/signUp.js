// import supaBase-client from the supaBase.js
import { supabase , creatingUserDb } from "../scripts/supaBase.js";

// fetching elements
const userEmailInput = document.querySelector(".js-gmail-input");
const userNameInput = document.querySelector(".js-userName-letChat");
const loginBtn = document.querySelector(".js-login-btn");
const userPasswordInput = document.querySelector(".js-userPassword-letChat");
const interactionArea = document.querySelector(".js-interaction-area");
const gmailArea = document.querySelector(".js-gmail-area");

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
    interactionArea.innerHTML += `<p class="success-para text-white ml-5">Account created succefully 💋</p><p class="success-para text-white mt-1 ml-5">signUp-Link sent at provided Gmail 😉</p>`;
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

// adding loginBtn functionality
loginBtn.addEventListener("click", () => {
  const email = (userEmailInput.value).trim().replace(/\s+/g, '');
  const userName = (userNameInput.value).trim().replace(/\s+/g, '');
  const userPassword = (userPasswordInput.value).trim().replace(/\s+/g, '');  
  if (email && userName && userPassword) {
    sendMagicLink(email);
    creatingUserDb(userName,email,userPassword);    
  } else {
    alert('please enter a gMail,userName & passWord -FIRST they are MUST !');
  }
});
