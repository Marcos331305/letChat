// fetching elements
const messageInput = document.querySelector('.js-message-input');
const sendBtn = document.querySelector('.js-send-btn');
const messageArea = document.querySelector('.js-message-area');

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
    addMessageToPage(msg);
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
