function onReady() {
  console.log("JavaScript is loaded!");
  getHistory();
}

onReady();

function submitGuesses(event) {
  event.preventDefault();
  const botNumber = Math.floor(Math.random() * 25) + 1;
  document.getElementById("bot").value = botNumber;

  let playerGuesses = {
    p1: document.getElementById("p1").value,
    p2: document.getElementById("p2").value,
    p3: document.getElementById("p3").value,
    bot: botNumber,
  };

  axios({
    method: "POST",
    url: "/game",
    data: playerGuesses,
  })
    .then(function (response) {
      console.log("response is good", response);
      document.getElementById("p1").value = "";
      document.getElementById("p2").value = "";
      document.getElementById("p3").value = "";
      document.getElementById("bot").value = "";
      getHistory();
    })
    .catch(function (error) {
      console.log("error", error);
    });
}

function resetGame() {
  axios({
    method: "POST",
    url: "/reset",
  })
    .then((res) => {
      document.getElementById("details").innerHTML = "";
    })
    .catch((err) => console.log(err));
}

function getHistory() {
  axios({
    method: "GET",
    url: "/game",
  })
    .then(function (response) {
      console.log("response is good", response);
      // compare guesses
      // get them in an array
      // need to look at the most recent row
      let allGuesses = response.data; // this will be an array
      let currentGuesses = allGuesses[allGuesses.length - 1];
      // this will be an object

      let actualNumber = currentGuesses?.actualNumber;
      console.log(actualNumber);
      if (currentGuesses) {
        let p1 = currentGuesses.guesses.p1;
        let p2 = currentGuesses.guesses.p2;
        let p3 = currentGuesses.guesses.p3;
        let bot = currentGuesses.guesses.bot;

        if (Number(p1) === actualNumber) alert("P1 won!");
        if (Number(p2) === actualNumber) alert("P2 won!");
        if (Number(p3) === actualNumber) alert("P3 won!");
        if (Number(bot) === actualNumber) alert("Bot won, you suck!");
      }

      // change the DOM
      document.getElementById("details").innerHTML = "";
      for (let i in allGuesses) {
        const p1 =
          Number(allGuesses[i].guesses.p1) === actualNumber
            ? "correct"
            : allGuesses[i].guesses.p1 > actualNumber
            ? "higher"
            : "lower";
        const p2 =
          Number(allGuesses[i].guesses.p2) === actualNumber
            ? "correct"
            : allGuesses[i].guesses.p2 > actualNumber
            ? "higher"
            : "lower";
        const p3 =
          Number(allGuesses[i].guesses.p3) === actualNumber
            ? "correct"
            : allGuesses[i].guesses.p3 > actualNumber
            ? "higher"
            : "lower";
        const bot =
          Number(allGuesses[i].guesses.bot) === actualNumber
            ? "correct"
            : allGuesses[i].guesses.bot > actualNumber
            ? "higher"
            : "lower";
        document.getElementById("details").innerHTML += `
      <tr>
        <td>Round: ${Number(i) + 1}</td>
        
        <td class='${p1}'>p2: ${
          allGuesses[i].guesses.p1
        } <span>${p1}</span></td>
        <td class='${p2}'>p2: ${
          allGuesses[i].guesses.p2
        } <span>${p2}</span></td>
        <td class='${p3}'>p3: ${
          allGuesses[i].guesses.p3
        } <span>${p3}</span></td>
        <td class='${bot}'>Bot: ${
          allGuesses[i].guesses.bot
        } <span>${bot}</span></td>
      </tr>
      `;
      }
    })
    .catch(function (error) {
      console.log("error", error);
    });
}
