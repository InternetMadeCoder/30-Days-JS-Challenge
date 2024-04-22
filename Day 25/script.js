const container = document.querySelector(".container");
const group = document.querySelector("#group");
const colorInput = document.querySelector("#color-input");
const sizeInput = document.querySelector("#size-input");
let currentColor, currentSize, svgWidth, svgHeight, initialX, initialY;
let circles = [];
let deviceType = "";
let events = {
  mouse: {
    click: "click",
  },
  touch: {
    click: "touchstart",
  },
};

const isTouchDevice = () => {
  try {
    document.createEvent("TouchEvent");
    deviceType = "touch";
    return true;
  } catch (e) {
    deviceType = "mouse";
    return false;
  }
};

colorInput.addEventListener("input", () => {
  currentColor = colorInput.value;
});

sizeInput.addEventListener("input", () => {
  currentSize = sizeInput.value;
});

isTouchDevice();

container.addEventListener(events[deviceType].click, (e) => {
  let mouseX = !isTouchDevice() ? e.clientX : e.touches[0].clientX;
  let mouseY = !isTouchDevice() ? e.clientY : e.touches[0].clientY;
  let relativeX = mouseX - container.getBoundingClientRect().left;
  let relativeY = mouseY - container.getBoundingClientRect().top;

  let finalX = relativeX / initialX;
  let finalY = relativeY / initialY;
  circles.push(
    `<circle cx="${finalX}" cy="${finalY}" fill="${currentColor}" r="${currentSize}"/>`
  );
  group.innerHTML = circles.join("");
});

window.onload = () => {
  currentColor = "#0075ff";
  colorInput.value = currentColor;
  currentSize = 5;
  sizeInput.value = currentSize;
  [svgHeight, svgWidth] = [500, 500];
  initialX = container.clientWidth / svgWidth;
  initialY = container.clientHeight / svgHeight;
  circles = [];
};