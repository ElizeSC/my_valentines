console.log("%cHey! No peeking at my Valentine's code! 💖", "color: red; font-size: 20px; font-weight: bold;");

function updateElement(elementId, attribute, newValue) {
  const el = document.getElementById(elementId);
  if (!el) return;

  if (attribute === "text") {
    el.textContent = newValue;
  } else {
    el.setAttribute(attribute, newValue);
  }
}

let clickCount = 0;

function handleHomeClick() {
  clickCount++;
  const btn = document.getElementById('button1');
  const loginForm = document.getElementById('login-form');
  const heart = document.getElementById('heart');

  if (clickCount === 1) {
    updateElement('greeting2', 'text', 'Well, she has something for you.');
    updateElement('button1', 'text', 'what is it?');
  }
  else if (clickCount === 2) {
    if (btn) btn.style.display = "none";
    if (loginForm) loginForm.style.display = "flex";
    if (heart) heart.classList.add('pulse');
    updateElement('greeting2', 'text', 'Enter your secret keys...');
  }
}

const secretVault = {
  "izzy": "dmFsZW50aW5lczIwMjY=",
  "honey": "Zmxvd2VyMTIz",
  "badetzki": "dmFndWVseWdlc3R1cmVz"
};

function checkUnlock() {
  // Grab the elements
  const userField = document.getElementById('username').value.toLowerCase().trim();
  const passField = document.getElementById('password').value.trim();
  const container = document.getElementById('container1');

  const scrambledInput = btoa(passField);

  if (secretVault[userField] && secretVault[userField] === scrambledInput) {
    console.log("Log in successful");
    container.style.transition = "all 1s ease-in-out";
    container.style.transform = "translateY(-150%) rotate(10deg)";
    container.style.opacity = "0";

    // wait 1 second for the animation to finish, then show the gift
    setTimeout(() => {
      container.style.display = "none";
      revealEnvelope();
    }, 1000);

  } else {
    const greeting = document.getElementById('greeting2');
    greeting.textContent = "that's not the key to my heart ):";
    greeting.style.color = "#d63031";
  }
}

function revealEnvelope() {
  const envContainer = document.getElementById('envelope-container');
  envContainer.style.display = "flex";
  envContainer.classList.add('fade-in');
}

function openEnvelope() {
  const closed = document.getElementById('envelope-closed');
  const open = document.getElementById('envelope-open');
  const letter = document.getElementById('letter');

  closed.style.display = "none";
  open.style.display = "block";

  letter.classList.add('letter-reveal');
}
