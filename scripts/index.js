// import supabase-Client from the supaBase.js
import { supabase } from "../scripts/supaBase.js";

import { saveMessageToDatabase } from "../scripts/supaBase.js";

// fetching elements
const messageInput = document.querySelector('.js-message-input');
const sendBtn = document.querySelector('.js-send-btn');
const messageArea = document.querySelector('.js-message-area');
const userNameArea = document.querySelector('.js-userName-area');

// add MESSAGE to page
function addMessageToPage(msg) {
  const msgHtml = `
    <p class="bg-white leading-5 py-[6px] px-2 sm:w-[70%] rounded-lg">${msg}</p>
  `;
  messageArea.innerHTML += msgHtml;
  messageInput.value = '';
  // scroll to the bottom of the message area
  messageArea.scrollTop = messageArea.scrollHeight;
}

// sendBtn triggerer while adding the message to the page
function sendBtnTriggerer(){
  const message = messageInput.value;
  if (message.trim() === '') {
    alert("please enter a valid-MESSAGE");
  } else {
    const msg = message.trim();
    // display msg to webpage
    addMessageToPage(msg);
    // save the msg into dB
    saveMessageToDatabase(msg);
  }
}

// adding functionality to sendMessageBtn
sendBtn.addEventListener('click', () => {
  sendBtnTriggerer();
});

// adding enterKey support to messageInput
messageInput.addEventListener('keydown',(event)=>{
  if(event.key === 'Enter'){
    sendBtnTriggerer();
  }
});

// Create a function to handle inserts
const handleInserts = (payload) => {
  // console.log('Change received!', payload)
  const msg = payload.new.message;
  addMessageToPage(msg);
}

// Listen to inserts
supabase
  .channel('messages')
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, handleInserts)
  .subscribe()