import '/src/app/styles/style.scss';

const loginForm = document.querySelector('#login-form');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const conversationsSection = document.querySelector('#conversations');
const conversationList = document.querySelector('#conversation-list');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = usernameInput.value;
  const password = passwordInput.value;

  const response = await fetch(
    `http://localhost:3000/users?username=${username}&password=${password}`
  );
  const users = await response.json();

  if (users.length === 0) {
    alert('Usuario o contraseña incorrectos');
    return;
  }

  conversationsSection.style.display = 'block';
  loginForm.style.display = 'none';

  const user = users[0];
  const conversationsResponse = await fetch(
    `http://localhost:3000/conversations?userId=${user.id}`
  );
  const conversations = await conversationsResponse.json();

  conversations.forEach((conversation) => {
    const conversationItem = document.createElement('li');
    conversationItem.innerHTML = `Conversación con el usuario con ID ${conversation.recipientId}:`;

    const messagesList = document.createElement('ul');
    conversation.messages.forEach((message) => {
      const messageItem = document.createElement('li');
      messageItem.innerHTML = `${message.content} (${new Date(
        message.timestamp
      ).toLocaleString()})`;
      messagesList.appendChild(messageItem);
    });

    conversationItem.appendChild(messagesList);
    conversationList.appendChild(conversationItem);
  });
});
