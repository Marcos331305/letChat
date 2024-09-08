// import supabase-Client from supaBase.js
import { supabase } from "../scripts/supaBase.js";

// fetching elements
const people = document.querySelector(".js-people");

// generating HTML for the people
function peopleHTML(users) {
  let html = ``;
  users.forEach((user) => {
    const userName = user.userName;
    html += `
                    <!-- person -->
                    <div class="flex justify-between border-b-[1px] px-4 py-1 js-person">
                    <!-- Avatar & userName -->
                    <div class="flex items-center gap-6">
                        <div>
                        <img
                            class="h-[48px] cursor-pointer"
                            src="./assets/avatar.png"
                            alt="Avatar-Logo"
                        />
                        </div>
                        <div class="text-white text-xl js-person-username">
                            ${userName}
                        </div>
                    </div>
                    <!-- message-icon -->
                    <div>
                        <img class="h-[48px] cursor-pointer js-chat-btn" src="./assets/chat-icon.png" alt="chat-icon">
                    </div>
                    </div>
                `;
  });
  people.innerHTML = html;
}

// fetching users from the dB
export async function fetchUsersFromDb() {
  const { data, error } = await supabase.from("users").select("*");
  if (data) {
    const users = data;
    localStorage.setItem('receiverUserId',users[0].id)
    peopleHTML(users);
  } else {
    people.textContent = `Server not Respond , error is -> ${error}`;
  }
}
fetchUsersFromDb();

// adding functionality to chat-Btn
document.addEventListener('click',(event) => {
    if (event.target.classList.contains('js-chat-btn')) {
        const person = event.target.closest('.js-person');
        const personUsername = person.querySelector('.js-person-username').innerText;
        localStorage.setItem('personUsername',personUsername);
        window.location.href = '/conversation.html';
    }
});