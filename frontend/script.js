const socket = io();

// Select Elements from the DOM
const chatbox_form = document.querySelector("form")
const chat_input = document.querySelector(".chat-input");
const message_container = document.querySelector(".message-container");
const sendButton = document.querySelector(".sendButton");
const place_order_button = document.querySelector(".quick-options div:nth-of-type(1)")
const cancel_order_button = document.querySelector(".quick-options div:nth-of-type(2)")
const view_order_button = document.querySelector(".quick-options div:nth-of-type(3)")
const checkout_order_button = document.querySelector(".quick-options div:nth-of-type(4)")
const order_history_button = document.querySelector(".quick-options div:nth-of-type(5)")


const createUserMessage = () => {
    const newUserMessage = document.createElement("div");
    newUserMessage.className = "message user";
    newUserMessage.innerHTML = chat_input.value.trim();
    message_container.append(newUserMessage);
    message_container.scrollTop = 1000000;
}

const createChatboxMessage = (value) => {
    const newChatboxMessage = document.createElement("p");
    newChatboxMessage.className = "message chatbot";
    newChatboxMessage.innerHTML = value;
    setTimeout(() => {
        message_container.append(newChatboxMessage);
        // iphoneNotificationSound.play();
        message_container.scrollTop += 1000000;
    }, 1000)
}


place_order_button.addEventListener('click', () => {
    chat_input.value = "1";
    sendButton.click();
})
cancel_order_button.addEventListener('click', () => {
    chat_input.value = "0";
    sendButton.click();
})
view_order_button.addEventListener('click', () => {
    chat_input.value = "97";
    sendButton.click();
})
checkout_order_button.addEventListener('click', () => {
    chat_input.value = "99";
    sendButton.click();
})
order_history_button.addEventListener('click', () => {
    chat_input.value = "98";
    sendButton.click();
})
console.log(chatbox_form)
chatbox_form.addEventListener( 'submit', function(e) {
    e.preventDefault();

    if (chat_input.value) {
        
        createUserMessage();
        if (!["1","99","98", "97", "0", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16" ].includes(chat_input.value)){
            createChatboxMessage("Invalid. Kindly enter the corerect commands");
            createChatboxMessage(`These are the possible commands:
            0- Cancel Order
            1- Place an Order
            97- View Current Order
            98- See Order History
            99- Checkout your Current Order`)
        }
        console.log(chat_input.value)
        if (chat_input.value == "1") {
            console.log("Chat value was 1")
            socket.emit("place_order")
        }
        else if (["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16"].includes(chat_input.value)) {
            socket.emit("add_item_to_order", chat_input.value);
        }
        else if (chat_input.value == "97") {
            socket.emit("view_order");
        }
        else if (chat_input.value == "98") {
            socket.emit("view_order_history")
        }
        else if (chat_input.value == "99") {
            socket.emit("checkout_order");
        }
        else if (chat_input.value == "0") {
            socket.emit("cancel_order");
        }
        chat_input.value = "";

        
    }
}) 

window.addEventListener('load', (e) => {
     createChatboxMessage("Welcome to ChopFull!")
     setTimeout(() =>createChatboxMessage(`These are the possible commands: <br />
        0 - Cancel Order <br />
        1 - Place an Order <br />
        97 - See Current Order <br />
        98 - See Order History <br />
        99 - Checkout an Order <br />`), 500);
    // socket.on("show_options", (message) => createChatboxMessage(message))
    socket.on("order_placed", (message) => {if (message) createChatboxMessage(message)})
    socket.on("item_added_to_order", (message) => createChatboxMessage(message));
    socket.on("order_viewed", (message) => createChatboxMessage(message));
    socket.on("order_canceled", (message) => createChatboxMessage(message))
    socket.on("order_checked_out", (message) => createChatboxMessage(message));
    socket.on("order_history_viewed", (message) => createChatboxMessage(message));
})
