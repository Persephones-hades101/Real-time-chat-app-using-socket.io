const socket = io();

let Name;
do {
  Name = prompt("Enter Your Name");
} while (!Name)



const message = document.getElementById("textarea");
const messageArea=document.querySelector(".message__area");
// console.log(messageArea);
message.addEventListener("keyup",(event)=>{
  // console.log(event.key);
  if(event.key==="Enter")
  {
    messageText=message.value;
    message.value="";
    sendMessage(messageText);
    scrollToBottom();
  }
})

function sendMessage(messageText)
{
  let msg={
    user:Name,
    message:messageText
  }
  appendMessage(msg,"outgoing");

  socket.emit("messageToServer",msg);
  
}

function appendMessage(msg,type)
{
  let mainDiv=document.createElement('div');
  mainDiv.classList.add(type,"message");
  let content=`
  <h4>${msg.user}</h4>
  <p>${msg.message}</p>
  `
  mainDiv.innerHTML=content;
  messageArea.appendChild(mainDiv);
}


//recieve message

socket.on("messageFromServer",(message)=>{
  // console.log(message);
  appendMessage(message,"incoming");
  scrollToBottom();
});


function scrollToBottom()
{
  messageArea.scrollTop=messageArea.scrollHeight;
}