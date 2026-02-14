console.log("%cHey! No peeking at my Valentine's code!", "color: red; font-size: 20px; font-weight: bold;");

let clickCount = 0;


document.addEventListener('DOMContentLoaded', () => {
  const envContainer = document.getElementById('envelope-container');
  if (envContainer) envContainer.style.display = "none";
});

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

let activeMessage = "";

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
        greeting2.syle.color = "#d63031t";
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

  if (helperText) helperText.classList.add('hidden-text');

  if (activeMessage) {
    try {
      const decoded = decodeURIComponent(escape(atob(activeMessage)));
      letterText.innerHTML = decoded;
    } catch (e) {
      console.warn("UTF-8 decoding failed, falling back to standard atob.");
      letterText.innerHTML = atob(activeMessage);
    }
  }

  closed.style.display = "none";
  open.style.display = "block";

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

  letter.classList.remove('letter-reveal');

  setTimeout(() => {
    container.classList.remove('dark-overlay');

    open.style.display = "none";
    open.style.opacity = "1";
    closed.style.display = "block";

    location.reload();
  }, 500);
}
