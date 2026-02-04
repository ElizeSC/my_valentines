/**
 * Lovergirl's Secret Vault & Letter Script
 * Optimized for cinematic transitions and secret unlocking
 */

console.log("%cHey! No peeking at my Valentine's code! 💖", "color: red; font-size: 20px; font-weight: bold;");

// --- State Management ---
let clickCount = 0;

const secretVault = {
  "izzy": "dmFsZW50aW5lczIwMjY=",      // valentines2026
  "honey": "Zmxvd2VyMTIz",             // flower123
  "badetzki": "dmFndWVseWdlc3R1cmVz"   // vaguelygestures
};

// --- Initialization ---
// Ensures the envelope container is ready but hidden on load
document.addEventListener('DOMContentLoaded', () => {
  const envContainer = document.getElementById('envelope-container');
  if (envContainer) envContainer.style.display = "none";
});

// --- Core Functions ---

/**
 * Handles the initial "Click Me" sequence to reveal the login form
 */
function handleHomeClick() {
  clickCount++;
  const btn = document.getElementById('button1');
  const loginForm = document.getElementById('login-form');
  const heart = document.getElementById('heart');
  const greeting2 = document.getElementById('greeting2');

  if (clickCount === 1) {
    greeting2.textContent = 'Well, she has something for you.';
    btn.textContent = 'what is it?';
  }
  else if (clickCount === 2) {
    btn.style.display = "none";
    loginForm.style.display = "flex";
    if (heart) heart.classList.add('pulse');
    greeting2.textContent = 'Enter your secret keys...';
  }
}

let activeMessage = ""; // We'll store the decoded message here later

function checkUnlock() {
  const userField = document.getElementById('username').value.toLowerCase().trim();
  const passField = document.getElementById('password').value.trim();
  const container = document.getElementById('container1');
  const greeting2 = document.getElementById('greeting2');

  const hashedInput = btoa(passField);

  // 1. Fetch the vault
  fetch('vault.json')
    .then(response => response.json())
    .then(data => {
      const userData = data[userField];

      // 2. Check if user exists AND password matches
      if (userData && userData.key === hashedInput) {
        console.log("Vault Access Granted.");

        // Store the scrambled message for the openEnvelope function
        activeMessage = userData.message;

        // 3. Start the "Flying Paper" exit animation
        container.style.transition = "all 1s ease-in-out";
        container.style.transform = "translateY(-150%) rotate(10deg)";
        container.style.opacity = "0";

        setTimeout(() => {
          container.style.display = "none";
          revealEnvelope();
        }, 1000);

      } else {
        greeting2.textContent = "That's not the key to my heart... 💔";
        greeting2.style.color = "#d63031";
      }
    })
    .catch(err => {
      console.error("Error loading vault:", err);
      greeting2.textContent = "Vault is currently locked. Try again later!";
    });
}
/**
 * Makes the envelope container visible and ready for interaction
 */
function revealEnvelope() {
  const envContainer = document.getElementById('envelope-container');
  if (envContainer) {
    envContainer.style.display = "flex";
    envContainer.classList.add('fade-in'); // Trigger a CSS fade-in if defined
  }
}

function openEnvelope() {
  const closed = document.getElementById('envelope-closed');
  const open = document.getElementById('envelope-open');
  const letter = document.getElementById('letter');
  const letterText = document.getElementById('letter-text'); // Targeted text div
  const container = document.getElementById('envelope-container');

  if (letter.classList.contains('letter-reveal')) return;

  // 1. Decode and Inject the message
  if (activeMessage) {
    try {
      // This fancy line handles emojis and smart quotes correctly
      const decoded = decodeURIComponent(escape(atob(activeMessage)));
      letterText.innerHTML = decoded;
    } catch (e) {
      // If the fancy way fails, fall back to the normal way
      letterText.innerHTML = atob(activeMessage);
    }
  }

  // 2. Open the Envelope
  closed.style.display = "none";
  open.style.display = "block";
  container.style.cursor = "default";

  // 3. Cinematic Transition
  setTimeout(() => {
    container.classList.add('dark-overlay');
    open.style.transition = "opacity 0.8s ease";
    open.style.opacity = "0";

    setTimeout(() => {
      open.style.display = "none";
      letter.classList.add('letter-reveal');
    }, 400);
  }, 600);
}
