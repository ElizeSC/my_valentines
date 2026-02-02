console.log("%cHey! No peeking at my Valentine's code! 💖", "color: red; font-size: 20px; font-weight: bold;");


function updateElement(elementId, attribute, newValue) {
  const el = document.getElementById(elementId);

  if (attribute === "text") {
    // Special case for changing text
    el.textContent = newValue;
  } else {
    // Standard case for attributes (src, href, class, title, etc.)
    el.setAttribute(attribute, newValue);
  }
}

let clickCount = 0;

function handleHomeClick(){
  clickCount++;

  if (clickCount == 1) {
    updateElement('greeting2', 'text', 'Well, she has something for you.');
    updateElement('button1', 'text', 'what is it?');
  } else if (clickCount == 2){

  }
}

