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

/**
 * Validates credentials and triggers the "Flying Paper" animation
 */
function checkUnlock() {
  const userField = document.getElementById('username').value.toLowerCase().trim();
  const passField = document.getElementById('password').value.trim();
  const container = document.getElementById('container1');
  const greeting2 = document.getElementById('greeting2');

  // Convert input password to Base64 to compare with vault
  const encodedPass = btoa(passField);

  if (secretVault[userField] === encodedPass) {
    console.log("Log in successful. Revealing gift...");

    // 1. Animate the login card flying away
    container.style.transition = "all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
    container.style.transform = "translateY(-150%) rotate(15deg)";
    container.style.opacity = "0";

    // 2. Wait for fly-away to finish, then show the envelope
    setTimeout(() => {
      container.style.display = "none";
      revealEnvelope();
    }, 1000);
  } else {
    greeting2.textContent = "That's not the key to my heart... 💔";
    greeting2.style.color = "#d63031";
  }
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

/**
 * Orchestrates the Cinematic Transition:
 * Open Envelope -> Darken Screen -> Fade Envelope -> Reveal Letter
 */
function openEnvelope() {
  const closed = document.getElementById('envelope-closed');
  const open = document.getElementById('envelope-open');
  const letter = document.getElementById('letter');
  const container = document.getElementById('envelope-container');

  // Safety: If the letter is already revealed, don't restart the animation
  if (letter.classList.contains('letter-reveal')) return;

  // 1. Swap the envelope images
  closed.style.display = "none";
  open.style.display = "block";

  // Make the container stop acting like a button once opened
  container.style.cursor = "default";

  // 2. Cinematic sequence
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
