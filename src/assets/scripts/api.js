// api.js
export async function startup() {
  try {
    const response = await fetch(
      "https://wheres-waldo-production.up.railway.app/api/beach",
      {
        mode: "cors",
        method: "POST",
        body: JSON.stringify({ map: "beach" }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      },
    );
    const data = await response.json();
    if (!data.result) throw new Error("API fetch error");
    return data.result;
  } catch (error) {
    console.error(error);
  }
}

export async function waldoreq(x, y, id) {
  try {
    const response = await fetch(
      "https://wheres-waldo-production.up.railway.app/api/beach/waldo",
      {
        mode: "cors",
        method: "POST",
        body: JSON.stringify({ id, x, y }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      },
    );
    const data = await response.json();
    if (!data.result) throw new Error("API fetch error");
    return data.result === "Right!" ? "y" : "n";
  } catch (error) {
    console.error(error);
    return "n";
  }
}

export async function odlawreq(x, y, id) {
  try {
    const response = await fetch(
      "https://wheres-waldo-production.up.railway.app/api/beach/odlaw",
      {
        mode: "cors",
        method: "POST",
        body: JSON.stringify({ id, x, y }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      },
    );
    const data = await response.json();
    if (!data.result) throw new Error("API fetch error");
    return data.result === "Right!" ? "y" : "n";
  } catch (error) {
    console.error(error);
    return "n";
  }
}

export async function wizardreq(x, y, id) {
  try {
    const response = await fetch(
      "https://wheres-waldo-production.up.railway.app/api/beach/wizard",
      {
        mode: "cors",
        method: "POST",
        body: JSON.stringify({ id, x, y }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      },
    );
    const data = await response.json();
    if (!data.result) throw new Error("API fetch error");
    return data.result === "Right!" ? "y" : "n";
  } catch (error) {
    console.error(error);
    return "n";
  }
}

export async function submitScore(id, user) {
  try {
    const response = await fetch(
      "https://wheres-waldo-production.up.railway.app/api/beach/score",
      {
        mode: "cors",
        method: "POST",
        body: JSON.stringify({ id, user }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      },
    );
    const data = await response.json();
    if (data.result === "Score submitted") {
      window.location.replace(
        "https://wheres-waldo-production.up.railway.app/",
      );
    } else {
      console.log("Score submission error");
    }
  } catch (error) {
    console.error(error);
  }
}
