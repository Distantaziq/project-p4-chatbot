// All the DOM selectors stored as short variables
const chat = document.getElementById('chat')
const nameForm = document.getElementById('name-form')
const nameInput = document.getElementById('name-input')
const inputWrapper = document.getElementById('input-wrapper')
let userName = ""
let globalFood = ""

// Menyer
const pizzaMenu = `
<select id="select">
  <option value="" selected disabled>Maybe one of these... ?</option>
  <option value="Margerita">Margerita</option>
  <option value="Vesuvio">Vesuvio</option>
  <option value="Capricciosa">Capricciosa</option>
</select>
`

const pastaMenu = `
<select id="select">
  <option value="" selected disabled>Maybe one of these... ?</option>
  <option value="Carbonara">Carbonara</option>
  <option value="Pomodoro">Pomodoro</option>
  <option value="Frutti di Mare">Frutti di Mare</option>
</select>
`

const saladMenu = `
<select id="select">
  <option value="" selected disabled>Maybe one of these... ?</option>
  <option value="Caesar">Caesar</option>
  <option value="Verde">Verde</option>
  <option value="Bacon">Bacon</option>
</select>
`

// Global variables, if you need any, declared here

// Functions declared here


// This function will add a chat bubble in the correct place based on who the sender is
const showMessage = (message, sender) => {
  if (sender === 'user') {
    chat.innerHTML += `
      <section class="user-msg">
        <div class="bubble user-bubble">
          <p>${message}</p>
        </div>
        <img src="assets/user.png" alt="User" />  
      </section>
    `
  } else if (sender === 'bot') {
    chat.innerHTML += `
      <section class="bot-msg">
        <img src="assets/Harold_icon_2.gif" alt="Bot" />
        <div class="bubble bot-bubble">
          <p>${message}</p>
        </div>
      </section>
    `
  }
  // This little thing makes the chat scroll to the last message when there are too many to be shown in the chat box
  chat.scrollTop = chat.scrollHeight
}

// 7
const askForConfirmation = (amount, selectedDish) => {
  inputWrapper.innerHTML = ""
  if (amount < 2)
  {
     showMessage(`Alright, you want ${amount} ${selectedDish} ${globalFood}?`, 'bot')
  }
  else
  {
    showMessage(`Alright, you want ${amount} ${selectedDish} ${globalFood}s?`, 'bot')
  }
  
  inputWrapper.innerHTML = `
  <button id="confirm">Yeah!</button>
  <button id="restart">Not quite</button>
  `
  chat.scrollTop = chat.scrollHeight
  document.getElementById("restart").addEventListener("click", () => location.reload())
  document.getElementById("confirm").addEventListener("click", () => {
    inputWrapper.innerHTML = ""
    showMessage("Yeah!", 'user')
    setTimeout(() => { 
      if (amount < 2)
      {
      showMessage(`Thank you ${userName}! Enjoy the ${selectedDish} ${globalFood}!`, 'bot')
      chat.scrollTop = chat.scrollHeight
      }
      else
      {
        showMessage(`Thank you ${userName}! Enjoy the ${selectedDish} ${globalFood}s!`, 'bot')
        chat.scrollTop = chat.scrollHeight
      }

    
    }, 1000)
    inputWrapper.innerHTML = `
    <img src="assets/Harold_success_2.gif"\>
    `
    chat.scrollTop = chat.scrollHeight
  })
}

// 6
const askForAmount = (selectedDish) => {
  setTimeout(() => showMessage(`How many ${selectedDish} ${globalFood}s would you like?`, 'bot'), 1000)

  inputWrapper.innerHTML = `
  <input type="number" id="amount"s>
  <button id="amount-btn" class="send-btn">
    Send
  </button>
  `

  const amountInput = document.getElementById("amount")         
  document.getElementById("amount-btn").addEventListener("click", () => {
    showMessage(amountInput.value, 'user')    //could not have `${amountInput.value}`

    setTimeout(() => askForConfirmation(amountInput.value, selectedDish), 1000) 
  })
}

// 5
const dishChoice = (theFoodChoice) => {
  if (theFoodChoice === "pizza") 
  {
    inputWrapper.innerHTML = pizzaMenu
  }
  else if (theFoodChoice === "pasta") 
  {
    inputWrapper.innerHTML = pastaMenu
  } 
  else 
  {
    inputWrapper.innerHTML = saladMenu
  }

  const selectedDish = document.getElementById("select")
  
  selectedDish.addEventListener("change", () => {
    showMessage(`I want some ${selectedDish.value}!`, 'user')
    askForAmount(selectedDish.value)
  })
}


// 4
const askForDish = (foodChoice) => {

  globalFood = foodChoice
  console.log(globalFood)
  showMessage(`I want some ${foodChoice}!`, 'user')

  setTimeout(() => { 
    showMessage(`Good choice! What type of ${foodChoice} would you like?`, 'bot')
    dishChoice(foodChoice)}, 1000)

}


// 3
const menuChoice = () => {

  inputWrapper.innerHTML = `
  <button id="pizzaButton">Pizza</button>
  <button id="pastaButton">Pasta</button>
  <button id="saladButton">Salad</button>
  `

  document.getElementById("pizzaButton").addEventListener("click", () => askForDish("pizza"))
  document.getElementById("pastaButton").addEventListener("click", () => askForDish("pasta"))
  document.getElementById("saladButton").addEventListener("click", () => askForDish("salad"))

}


//Fråga 2
const reply = (userName) => {
  if (userName !== "")
  {
    if (userName === "Harold")
    {
      showMessage(`Mine too! Nice to meet you!`, 'bot')
      setTimeout(() => showMessage(`What would you like to eat, ${userName}?`, 'bot'), 1000)
    }
    else
    {
      showMessage(`Nice to meet you, ${userName}.`, 'bot')
      setTimeout(() => showMessage(`What would you like to eat?`, 'bot'), 1000)
    }
  }
  else
  {
    showMessage("I'm afraid I didn't quite catch that!", 'bot')
    setTimeout(() => showMessage(`What would you like to eat, Mysterio?`, 'bot'), 1000)
  }
  
  setTimeout(() => menuChoice(), 1000)

}


//Fråga 1
const handleNameInput = (event) => {   
  event.preventDefault()
  userName = nameInput.value
  nameInput.value = ""
  showMessage(userName, "user")
  setTimeout(() => reply(userName), 1000)

}

// Starts here
const greeting = () => {
  showMessage(`Hello there. What's your name?`, 'bot')
  // Just to check it out, change 'bot' to 'user' here 👆
}

// Set up your eventlisteners here
nameForm.addEventListener("submit", handleNameInput)

// When website loaded, chatbot asks first question.
// normally we would invoke a function like this:
// greeting()
// But if we want to add a little delay to it, we can wrap it in a setTimeout:
// setTimeout(functionName, timeToWaitInMilliSeconds)
// This means the greeting function will be called one second after the website is loaded.
setTimeout(greeting, 1000)
//setTimeout(reply = userName, 1000)
