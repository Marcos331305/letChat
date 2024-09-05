// import supabase-Client from supaBase.js
import { supabase } from "../scripts/supaBase.js";

// fetching elements
const people = document.querySelector('.js-people');

// generating HTML for the people
function peopleHTML(users){
    let html = ``;
    users.forEach((user)=>{
        const userName = user.username;
        html += `
                    <!-- person -->
                    <div class="flex justify-between border-b-[1px] px-4 py-1">
                    <!-- Avatar & userName -->
                    <div class="flex items-center gap-6">
                        <div>
                        <img
                            class="h-[48px] cursor-pointer"
                            src="./assets/avatar.png"
                            alt="Avatar-Logo"
                        />
                        </div>
                        <div class="text-white text-xl">
                            ${userName}
                        </div>
                    </div>
                    <!-- message-icon -->
                    <div>
                        <img class="h-[48px]" src="./assets/chat-icon.png" alt="chat-icon">
                    </div>
                    </div>
                `;        
    });
    people.innerHTML = html;
}

// fetching users from the dB
async function fetchUsersFromDb() {
  const { data, error } = await supabase.from("users").select("username");
  if(data){
    console.log(data)
    const users = data;
    peopleHTML(users);
  } else{
    people.textContent = 'Server not Respond !'
  }
}
fetchUsersFromDb();