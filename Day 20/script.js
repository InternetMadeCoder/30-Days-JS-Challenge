let startTime, endTime;
let imageSize = "";
let image = new Image();
let bitOutput = document.getElementById("bits");
let kboutput = document.getElementById("kbs");
let mboutput = document.getElementById("mbs");

let imageLink = "https://source.unsplash.com/random?topics=nature";

image.onload = async function () {
  endTime = new Date().getTime();

  await fetch(imageLink).then((response) => {
    imageSize = response.headers.get("content-length");
    calculateSpeed();
  });
};

function calculateSpeed() {
  let timeDuration = (endTime - startTime) / 1000;
  let loadedBits = imageSize * 8;
  let speedInBps = (loadedBits / timeDuration).toFixed(2);
  let speedInKbps = (speedInBps / 1024).toFixed(2);
  let speedInMbps = (speedInKbps / 1024).toFixed(2);

  bitOutput.innerHTML += `${speedInBps}`;
  kboutput.innerHTML += `${speedInKbps}`;
  mboutput.innerHTML += `${speedInMbps}`;
}

const init = async () => {
  startTime = new Date().getTime();
  image.src = imageLink;
};

window.onload = () => init();