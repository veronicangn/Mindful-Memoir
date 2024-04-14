// Prompts for journal
const prompts = [
  "Write down three things you're grateful for today.",
  "Reflect on a recent accomplishment and jot down your thoughts.",
  "Write about a challenge you faced today and how you overcame it.",
  "List three things that make you happy and why.",
  "List 3 goals you have for today and why.",
  "Write about a time when you took care of yourself during a challenging period and the positive impact it had on your well-being.",
  "Describe a situation that brings you anxiety or stress and brainstorm coping strategies to manage it.",
  "What can you do today to take better care of yourself?",
  "How do you set and protect your boundaries?",
  "If you were to improve something about your life, what would that be and why?",
  "Write out 3 ways you recharge throughout the day.",
  "How can you celebrate yourself today?",
  "How do you forgive yourself when you make a mistake?",
  "List 3 ways you calm your nerves when you are in a tough situation.",
  "Describe yourself in 5 words or less",
  "When do you feel the most confident?",
  "When do you feel the most beautiful?",
  "List 3 things that inspire you.",
  "What are you holding onto that you need to let go of? How do you think you could let go of it?",
  "What is currently causing you anxiety or stress?",
  "What happened today?",
  "What was the best thing that happened today?",
  "What was the worst thing that happened today?",
  "What did I learn today?",
  "What went well today?",
  "What am I nervous or anxious about today?", 
  "What was the weather like today?",
  "What are you grateful for today?",
  "What did I do to take care of myself today?",
  "What did I do to help others today?",
  "Who did I interact with today and what was it like?", 
  "What are you most excited for today?",
  "Where would you like to travel and where would you like to stay?",
  "What is your dream job?",
  "What makes you laugh the most?",
  "What advice would you give to your younger self?",
  "List all the reasons you are proud of yourself.",
  "What are your daily habits? How do they contribute to your overall well-being?",
  "Who are the people that you want to do life with?",
  "What does happiness mean to you?",
  "What are your current hobbies?",
  "What are your favorite things to do?",
  "Do you think you’re a better person today than a year ago?",
  "List your three favourite physical traits of yourself.",
  "What is something that you’ve been wanting to try?",
  "What is an inexpensive thing you purchased that has improved your life?",
  "How can you be a better friend?",
  "Write about a song that always comforts you. What do you like about it?",
  "What is your favorite book?",
  "What is your favorite movie and why?",
  "What is your favorite food and why?",
  "What is one part of your like that you won't trade for anything?",
  "What is something you can do today to show yourself some love and kindness?",
  "Write down 5 things that you're looking forward to this week.",
  "Write a letter to your future self. What are your hopes for them?",
  "Write about a time when you felt truly understood by someone. What did it feel like, and why was that experience important to you?",
  "Describe a place that feels calming or peaceful to you.",
  "What is something unusual you noticed recently?",
  "What's the most difficult part about being you?",
  "What has been your most memorable compliment?",
  "What are some things on your wishlist?",
  "I have trouble sleeping when…"
]

let currentPrompt = "";  // Stores the current prompt
// adds a random prompt to the page
function addPrompt() {
  const elem = document.getElementById("promptContainer");
  currentPrompt = prompts[Math.floor(Math.random() * prompts.length)];
  elem.innerHTML = currentPrompt;
}
  prompts.value = '';
addPrompt();

// Generates a new prompt upon clicking button
const generateButton = document.getElementById("generatePrompt");
generateButton.addEventListener("click", function() {
  addPrompt();
});

// Generates an inspirational quote
const elem = document.getElementById("quoteContainer");
fetch("https://api.quotable.io/random")
.then(function(response) {
 return response.json();
})
.then(function(data) {
  quoteContainer.innerHTML = `"${data.content}"<br><br>- ${data.author}`;
});

// Function to update date and time
function updateDateTime() {
    const now = new Date();
    const currentDateTime = now.toLocaleString();
    const elem = document.getElementById("currentDate");
    elem.innerHTML = currentDateTime;
}

// Call updateDateTime function every second
setInterval(updateDateTime, 1000);
updateDateTime();


// Function to save journal entry to local storage
function saveEntryToLocalStorage(prompt, entry) {
    // Get existing entries from local storage or initialize as empty array
    let entries = JSON.parse(localStorage.getItem('journalEntries')) || [];

    // Add the new entry to the array along with its timestamp
    const timestamp = new Date().toLocaleString();
    entries.push({ prompt: prompt, entry: entry, timestamp: timestamp });

    // Save the updated entries back to local storage
    localStorage.setItem('journalEntries', JSON.stringify(entries));
}

// Call this function when the "Save Entry" button is clicked in index.html
document.getElementById('saveEntry').addEventListener('click', function() {
    const journalEntryInput = document.getElementById('journalEntry');
    const journalEntry = journalEntryInput.value.trim(); // Get the input value and remove leading/trailing whitespace

    if(journalEntry === ''){
        alert('Please enter a journal entry');
        return; // Exit the function if the input is empty
    }

    // Save the entry to local storage along with the current prompt
    saveEntryToLocalStorage(currentPrompt, journalEntry);

    // Clear the input field after saving
    journalEntryInput.value = '';
});