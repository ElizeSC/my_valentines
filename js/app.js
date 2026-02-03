// Keep your sneaky console message!
console.log("%cHey! No peeking at my Valentine's code! 💖", "color: red; font-size: 20px; font-weight: bold;");

function updateElement(elementId, attribute, newValue) {
  const el = document.getElementById(elementId);
  if (!el) return; // Safety check

  if (attribute === "text") {
    el.textContent = newValue;
  } else {
    el.setAttribute(attribute, newValue);
  }
}

let clickCount = 0;

function handleHomeClick() {
  clickCount++;
  console.log("Heart clicked! Count:", clickCount); // This helps you debug!

  // We MUST define these here so the function can find them
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

function checkUnlock() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;

  // Change these to whatever you want the login to be!
  if(user.toLowerCase() === "honey" && pass === "1234") {
    alert("Yay! Opening...");
    // This is where we will trigger the CD/Letter reveal later
  } else {
    alert("Wrong keys! Try again 💔");
  }
}
