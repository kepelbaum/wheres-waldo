export function setTimer(timer) {
  const start = Date.now();
  function updateTime() {
    let elapsed = Date.now() - start;
    let minutes = Math.floor(elapsed / 60000);
    let seconds = Math.floor((elapsed % 60000) / 1000);
    let milliseconds = Math.floor((elapsed % 1000) / 10);

    minutes = minutes.toString().padStart(2, "0");
    seconds = seconds.toString().padStart(2, "0");
    milliseconds = milliseconds.toString().padStart(2, "0");

    timer.textContent = `${minutes}:${seconds}:${milliseconds}`;
  }
  return setInterval(updateTime, 10);
}
