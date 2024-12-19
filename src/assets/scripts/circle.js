import { waldoreq, odlawreq, wizardreq } from "./api.js";

export function circleWrapper(state) {
  let { id, cable, cdiv, walc, walt, odlc, odlt, wizc, wizt } = state;
  async function checkWin() {
    if (state.waldosLeft === 0) {
      cable.removeEventListener("click", circle);
      state.checkWin(); // Main.js checkWin handles the rest - this is separate because we need to remove the circle listener
    }
  }

  function circle(e) {
    let canvas = document.createElement("canvas");
    var rect = e.currentTarget.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    function drawCircle(ele, color) {
      const context = ele.getContext("2d");
      const centerX = ele.width / 2;
      const centerY = ele.height / 2;
      const radius = 50;
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      context.lineWidth = 5;
      if (color) {
        context.strokeStyle = color;
      }
      context.stroke();
      ele.setAttribute(
        "style",
        "position: absolute; left: " +
          (x - centerX) +
          "px; top: " +
          (y - centerY) +
          "px;",
      );
    }

    const context = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 50;
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.lineWidth = 5;
    context.stroke();
    canvas.setAttribute(
      "style",
      "position: absolute; left: " +
        (x - centerX) +
        "px; top: " +
        (y - centerY) +
        "px;",
    );
    cdiv.style.overflow = "hidden";
    cdiv.appendChild(canvas);

    const div = document.createElement("div");
    div.setAttribute("id", "#onclick");

    if (!state.waldoFound) {
      const waldo = document.createElement("div");
      const waldopic = document.createElement("img");
      waldopic.setAttribute("src", "waldoface.png");
      waldopic.classList.add("icon");
      waldo.classList.add("waldo");
      const waldotext = document.createElement("div");
      waldotext.textContent = "Waldo";
      waldo.appendChild(waldopic);
      waldo.appendChild(waldotext);
      waldo.addEventListener("click", async () => {
        state.lastGuess = await waldoreq(x, y, id);
        let newCanvas = document.createElement("canvas");
        if (state.lastGuess === "y") {
          drawCircle(newCanvas, "green");
          state.waldoFound = true;
          state.waldosLeft--;
          state.turnCircleGreen(walc);
          state.turnTextGreen(walt);
          checkWin();
        } else if (state.lastGuess === "n") {
          drawCircle(newCanvas, "red");
        }
        cdiv.appendChild(newCanvas);
      });
      div.appendChild(waldo);
    }

    if (!state.odlawFound) {
      const odlaw = document.createElement("div");
      const odlawpic = document.createElement("img");
      odlawpic.setAttribute("src", "odlawface.webp");
      odlawpic.classList.add("icon");
      odlaw.classList.add("odlaw");
      const odlawtext = document.createElement("div");
      odlawtext.textContent = "Odlaw";
      odlaw.appendChild(odlawpic);
      odlaw.appendChild(odlawtext);
      odlaw.addEventListener("click", async () => {
        state.lastGuess = await odlawreq(x, y, id);
        let newCanvas = document.createElement("canvas");
        if (state.lastGuess === "y") {
          drawCircle(newCanvas, "green");
          state.odlawFound = true;
          state.waldosLeft--;
          state.turnCircleGreen(odlc);
          state.turnTextGreen(odlt);
          checkWin();
        } else if (state.lastGuess === "n") {
          drawCircle(newCanvas, "red");
        }
        cdiv.appendChild(newCanvas);
      });
      div.appendChild(odlaw);
    }

    if (!state.wizardFound) {
      const whitebeard = document.createElement("div");
      const whitebeardpic = document.createElement("img");
      whitebeardpic.setAttribute("src", "whitebeardface.png");
      whitebeardpic.classList.add("icon");
      whitebeard.classList.add("whitebeard");
      const whitebeardtext = document.createElement("div");
      whitebeardtext.textContent = "Wizard";
      whitebeard.appendChild(whitebeardpic);
      whitebeard.appendChild(whitebeardtext);
      whitebeard.addEventListener("click", async () => {
        state.lastGuess = await wizardreq(x, y, id);
        let newCanvas = document.createElement("canvas");
        if (state.lastGuess === "y") {
          drawCircle(newCanvas, "green");
          state.wizardFound = true;
          state.waldosLeft--;
          state.turnCircleGreen(wizc);
          state.turnTextGreen(wizt);
          checkWin();
        } else if (state.lastGuess === "n") {
          drawCircle(newCanvas, "red");
        }
        cdiv.appendChild(newCanvas);
      });
      div.appendChild(whitebeard);
    }

    let divx =
      y > 1980 && x > 2835
        ? x - 100
        : y > 1980 && x < 55
          ? x + 60
          : y > 1980
            ? x - 40
            : x > 2835
              ? x - 160
              : x + 60;
    const menuHeight = state.waldosLeft * 50;
    let divy;
    if (y - centerY < menuHeight) {
      divy = y + centerY - 75;
    } else if (y + menuHeight > 2000) {
      divy = y - centerY - menuHeight + 75;
    } else {
      divy = y > 1980 ? y - centerY - 150 : y - centerY;
    }
    div.setAttribute(
      "style",
      `width: 100px; height: ` +
        menuHeight +
        `px; background-color: white; position: absolute; left: ` +
        divx +
        `px; top: ` +
        divy +
        `px; display: flex; flex-direction: column; justify-content: ${state.waldosLeft < 3 ? "center" : "flex-start"}`,
    );

    cdiv.appendChild(div);
    state.cable.removeEventListener("click", circle);
    state.cable.addEventListener("click", uncircle);

    function uncircle() {
      cable.removeEventListener("click", uncircle);
      cdiv.removeChild(div);
      cdiv.removeChild(canvas);
      cable.addEventListener("click", circle);
    }
  }

  cable.addEventListener("click", circle);
}
