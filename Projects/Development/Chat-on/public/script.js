const socket = new WebSocket(`ws://${window.location.host}`);

socket.onmessage = function(event) {
  const messages = document.getElementById("messages");
  const message = document.createElement("div");
  message.textContent = event.data;
  messages.appendChild(message);
  messages.scrollTop = messages.scrollHeight;
};

function sendMessage() {
  const input = document.getElementById("messageInput");
  if (input.value.trim() !== "") {
    socket.send(input.value);
    input.value = "";
  }
}
