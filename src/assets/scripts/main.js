import { startup, submitScore } from "./api.js";
import { setTimer } from "./timer.js";
import { circleWrapper } from "./circle.js";

const gameState = {
  id: null,
  interval: null,
  waldoFound: false,
  odlawFound: false,
  wizardFound: false,
  waldosLeft: 3,
  lastGuess: "",
  timer: document.querySelector(".timer"),
  walc: document.querySelector("#walc"),
  walt: document.querySelector("#walt"),
  odlc: document.querySelector("#odlc"),
  odlt: document.querySelector("#odlt"),
  wizc: document.querySelector("#wizc"),
  wizt: document.querySelector("#wizt"),
  cdiv: document.querySelector(".canvas"),
  cable: document.querySelector(".clickable"),
  body: document.querySelector("body"),
  checkWin: async () => {
    if (gameState.waldosLeft === 0) {
      let time;
      let div = document.createElement("div");
      let request = await fetch(
        "https://wheres-waldo-production.up.railway.app/api/beach/time",
        {
          mode: "cors",
          method: "POST",
          body: JSON.stringify({
            id: gameState.id,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        },
      )
        .then((response) => response.json())
        .then((response) => {
          if (response.result) {
            time = new Date(response.result).toISOString().slice(14, -1);
          } else {
            throw new Error("API fetch error");
          }
        })
        .catch((error) => console.error(error));
      clearInterval(gameState.interval);
      gameState.timer.textContent = time;
      div.textContent =
        "Congratulations, you found all the characters!\nYour time was: " +
        time +
        "!";
      div.classList.add("finaldiv");
      let namestr = "";
      let name = document.createElement("input");
      name.setAttribute("type", "text");
      name.setAttribute("placeholder", "Your name");
      name.addEventListener("change", (e) => {
        namestr = e.currentTarget.value;
      });
      let button = document.createElement("button");
      button.classList.add("finalbutton");
      button.textContent = "Submit";
      button.addEventListener("click", () => {
        submitScore(gameState.id, namestr);
      });
      div.appendChild(name);
      div.appendChild(button);
      gameState.body.appendChild(div);
    }
  },
};

function turnCircleGreen(ele) {
  ele.classList.remove("red");
  ele.classList.add("green");
}

function turnTextGreen(ele) {
  ele.classList.remove("colored");
  ele.classList.add("colorgr");
  ele.textContent = "Found";
}

document.addEventListener("DOMContentLoaded", async () => {
  gameState.id = await startup();
  gameState.interval = setTimer(gameState.timer);
  const gameWrapper = document.getElementById("game-wrapper");
  if (gameWrapper) {
    gameWrapper.focus();
  }
  gameState.turnCircleGreen = turnCircleGreen;
  gameState.turnTextGreen = turnTextGreen;

  circleWrapper(gameState);
});
