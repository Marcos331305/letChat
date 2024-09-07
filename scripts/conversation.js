// fetching elements
const userName = document.querySelector('.js-userName');

// getting personUserName from localStorage and display on page
userName.textContent = localStorage.getItem('personUsername');