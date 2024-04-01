let colorsRef = document.getElementsByClassName("colors");
let canvas = document.getElementById("canvas");
let backgroundButton = document.getElementById("color-background");
let colorButton = document.getElementById("color-input");
let clearButton = document.getElementById("button-clear");
let eraseButton = document.getElementById("button-erase");
let penButton = document.getElementById("button-pen");
let penSize = document.getElementById("pen-slider");
let toolType = document.getElementById("tool-type");
let erase_bool = false;
let draw_bool = false;
let context = canvas.getContext("2d");
let mouseX = 0;
let mouseY = 0;
let rectLeft = canvas.getBoundingClientRect().left;
let rectTop = canvas.getBoundingClientRect().top;


const init = () => {
  context.strokeStyle = "black";
  context.lineWidth = 1;
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  
  toolType.innerHTML = "Pen";
  
  canvas.style.backgroundColor = "#ffffff";
  backgroundButton.value = "#ffffff";
  penButton.value = context.strokeStyle;
};

const is_touch_device = () => {
  try {
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
};

const getXY = (e) => {
  mouseX = (!is_touch_device() ? e.pageX : e.touches?.[0].pageX) - rectLeft;
  mouseY = (!is_touch_device() ? e.pageY : e.touches?.[0].pageY) - rectTop;
};

const stopDrawing = () => {
  context.beginPath();
  draw_bool = false;
};

const startDrawing = (e) => {
  draw_bool = true;
  getXY(e);
  context.beginPath();
  context.moveTo(mouseX, mouseY);
};

const drawOnCanvas = (e) => {
  if (!is_touch_device()) {
    e.preventDefault();
  }
  getXY(e);
  if (draw_bool) {
    context.lineTo(mouseX, mouseY);
    context.stroke();
    if (erase_bool) {
      context.globalCompositeOperation = "destination-out";
    } else {
      context.globalCompositeOperation = "source-over";
    }
  }
};

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("touchstart", startDrawing);

canvas.addEventListener("mousemove", drawOnCanvas);
canvas.addEventListener("touchmove", drawOnCanvas);

canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("touchend", stopDrawing);

canvas.addEventListener("mouseleave", stopDrawing);


penButton.addEventListener("click", () => {
  toolType.innerHTML = "Pen";
  erase_bool = false;
});

eraseButton.addEventListener("click", () => {
  erase_bool = true;
  toolType.innerHTML = "Eraser";
});

penSize.addEventListener("input", () => {
  context.lineWidth = penSize.value;
});

colorButton.addEventListener("change", () => {
  context.strokeStyle = colorButton.value;
});

backgroundButton.addEventListener("change", () => {
  canvas.style.backgroundColor = backgroundButton.value;
});

clearButton.addEventListener("click", () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  canvas.style.backgroundColor = "#fff";
  backgroundButton.value = "#fff";
});

window.onload = init();