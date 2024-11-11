let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let textInput = document.querySelector("#textInput");
let sendBtn = document.querySelector("#sendBtn");
let voice = document.querySelector("#voice");

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en";
    window.speechSynthesis.speak(text_speak);
}

function wishme() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good morning, how can I help you?");
    } else if (hours >= 12 && hours < 16) {
        speak("Good afternoon, how can I help you?");
    } else {
        speak("Good evening, how can I help you?");
    }
}

window.addEventListener('load', () => {
    wishme();
});

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
    recognition.start();
});

sendBtn.addEventListener("click", () => {
    let message = textInput.value.trim();
    if (message) {
        takeCommand(message.toLowerCase());
        textInput.value = ''; // Clear input after sending
    }
});

function takeCommand(message) {
    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello, what can I help you?");
    } else if (message.includes("how are you")) {
        speak("I am good, thank you, and how are you?");
    } else if (message.includes("i am good, thank you")) {
        speak("That's nice to hear from you. How can I help you?");
    } else if (message.includes("who are you")) {
        speak("I am Astra, the virtual assistant, created by 5th semester students.");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube");
        window.open("https://www.youtube.com");
    } else if (message.includes("open instagram")) {
        speak("Opening Instagram");
        window.open("https://www.instagram.com");
    } else if (message.includes("open google")) {
        speak("Opening Google");
        window.open("https://www.google.com");
    } else if (message.includes("open calculator")) {
        speak("Opening calculator");
        window.open("calculator://");
    } else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak(time);
    } else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
        speak(date);
    } else {
        let finalText = "This is what I found on the internet: " + message.replace("Astra", "").replace("Astro", "");
        speak(finalText);
        window.open(`https://www.google.com/search?q=${message.replace("Astra", "")}`, "_blank");
    }
}
