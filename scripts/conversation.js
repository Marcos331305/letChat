// import supabase-Client from supaBase.js
import { supabase } from "../scripts/supaBase.js";
// other imports
import { generateUniqueId } from "../scripts/supaBase.js";

// fetching elements
const userName = document.querySelector(".js-userName");
const messageInput = document.querySelector(".js-message-input");
const sendBtn = document.querySelector(".js-send-btn");
const messageArea = document.querySelector(".js-message-area");
const userNameArea = document.querySelector(".js-userName-area");

// getting personUserName from localStorage and display on page
userName.textContent = localStorage.getItem("personUsername");

// add MESSAGE to page
function addMessageToPage(msg) {
  const msgHtml = `
    <p class="bg-white leading-5 py-[6px] px-2 sm:w-[70%] rounded-lg">${msg}</p>
  `;
  messageArea.innerHTML += msgHtml;
  messageInput.value = "";
  // scroll to the bottom of the message area
  messageArea.scrollTop = messageArea.scrollHeight;
}

// sendBtn triggerer while adding the message to the page
function sendBtnTriggerer() {
  const message = messageInput.value;
  if (message.trim() === "") {
    alert("please enter a valid-MESSAGE");
  } else {
    const msg = message.trim();
    // display msg to webpage
    addMessageToPage(msg);
    //   one to one chat
  checkingConversationExistance(msg);
  }
}

// adding functionality to sendMessageBtn
sendBtn.addEventListener("click", () => {
  sendBtnTriggerer();
});

// adding enterKey support to messageInput
messageInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    sendBtnTriggerer();
  }
});

// fetchConversations for cheking an existing conversation
async function fetchConversations() {
  const { data, error } = await supabase.from("conversations").select("*");
  if (data) {
    return data;
  }
}

// Id's of user-1(msgSender) & user-2(msgReceiver)
const user1_id = parseInt(localStorage.getItem("currentUserId"));
const user2_id = parseInt(localStorage.getItem("receiverUserId"));

// creating a conversation if already don't exits for two users when they start chatting
async function createConversation(msg) {
  const { data,error } = await supabase
    .from("conversations")
    .insert({ id: generateUniqueId(), user1_id: user1_id, user2_id: user2_id })
    .select();
    const conversation_id = data[0]?.id;
    addingMessagesToDb(conversation_id,msg)
}

// checking if a conversation exists or not between two users
async function checkingConversationExistance(msg) {
  const conversations = await fetchConversations();
  conversations.forEach((conversation) => {
    const currentUserId = conversation.user1_id;
    const otherUserId = conversation.user2_id;
    // cheking if a conversation between these two users already exists
    if (user1_id === currentUserId && user2_id === otherUserId) {
        const conversation_id = conversation.id;
        addingMessagesToDb(conversation_id,msg);
    } else if (user1_id === otherUserId && user2_id === currentUserId) {
        const conversation_id = conversation.id;
        addingMessagesToDb(conversation_id,msg);
    } else {
      createConversation(msg);
    }
  });
}

// adding messages in messages-Table
async function addingMessagesToDb(conversation_id,message) {
  const { error } = await supabase
    .from("messages")
    .insert({ id: generateUniqueId(), conversation_id: conversation_id, sender_id: user1_id, message: message });
}
