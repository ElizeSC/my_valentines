console.log("%cHey! No peeking at my Valentine's code!", "color: red; font-size: 20px; font-weight: bold;");

// state management
let clickCount = 0;


// loads envelope
document.addEventListener('DOMContentLoaded', () => {
  const envContainer = document.getElementById('envelope-container');
  if (envContainer) envContainer.style.display = "none";
});

// handles click me
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

let activeMessage = ""; // stores the decoded message

function checkUnlock() {
  const userField = document.getElementById('username').value.toLowerCase().trim();
  const passField = document.getElementById('password').value.trim();
  const container = document.getElementById('container1');
  const greeting2 = document.getElementById('greeting2');

  const hashedInput = btoa(passField);

  // fetch from json
  fetch('vault.json')
    .then(response => response.json())
    .then(data => {
      const userData = data[userField];

      // check if user exists AND password matches
      if (userData && userData.key === hashedInput) {
        console.log("Vault Access Granted.");

        // stores the message
        activeMessage = userData.message;

        // pink paper exit animation
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
// makes envelope invisible
function revealEnvelope() {
  const envContainer = document.getElementById('envelope-container');
  if (envContainer) {
    envContainer.style.display = "flex";
    envContainer.classList.add('fade-in'); // css fade-in
  }
}

function openEnvelope() {
  const closed = document.getElementById('envelope-closed');
  const open = document.getElementById('envelope-open');
  const letter = document.getElementById('letter');
  const letterText = document.getElementById('letter-text');
  const container = document.getElementById('envelope-container');
  const helperText = document.getElementById('click-me-text');

  if (letter.classList.contains('letter-reveal')) return;

  // 1. Instantly hide the "click to open" text
  if (helperText) helperText.classList.add('hidden-text');

  // 2. THE SMART DECODER: Handles emojis, smart quotes, and symbols
  if (activeMessage) {
    try {
      // This combo of decodeURIComponent and escape allows
      // JavaScript to read UTF-8 characters from a Base64 string
      const decoded = decodeURIComponent(escape(atob(activeMessage)));
      letterText.innerHTML = decoded;
    } catch (e) {
      console.warn("UTF-8 decoding failed, falling back to standard atob.");
      letterText.innerHTML = atob(activeMessage);
    }
  }

  // 3. Swap images and start animation
  closed.style.display = "none";
  open.style.display = "block";
  container.style.cursor = "default";

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

function closeEnvelope() {
  const letter = document.getElementById('letter');
  const container = document.getElementById('envelope-container');
  const closed = document.getElementById('envelope-closed');
  const open = document.getElementById('envelope-open');

  // 1. Hide the letter first
  letter.classList.remove('letter-reveal');

  // 2. Wait for letter to shrink, then fade the dark background
  setTimeout(() => {
    container.classList.remove('dark-overlay');

    // 3. Reset the envelope so it's ready to be opened again
    open.style.display = "none";
    open.style.opacity = "1"; // Reset opacity for next time
    closed.style.display = "block";

    location.reload();
  }, 500);
}
