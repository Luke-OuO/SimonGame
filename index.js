let programRunnning = false;
let min_value = 0;
let max_value = 3;
let current_level = 1;
let winningStreak = 0;
let userChoiceIndex;
let sequence_container = [];
let title = document.getElementById("level-title");
let buttons = document.querySelectorAll("#button_container > div");

let sounds = {
  0: new Audio("sounds/green.mp3"), // Green
  1: new Audio("sounds/red.mp3"), // Red
  2: new Audio("sounds/yellow.mp3"), // Yellow
  3: new Audio("sounds/blue.mp3"), // Blue
  wrong: new Audio("sounds/wrong.mp3"), //Wrong Sound
  pop: new Audio("sounds/multi-pop.mp3"), //Pop Sound
  click: new Audio("sounds/mouse-click.mp3"),
  goodBye: new Audio("sounds/ricky.mp3"),
};
// For Random number
function randomNumberGenerator() {
  let randomObj = Math.random();
  let randomNumber =
    Math.floor(randomObj * (max_value - min_value + 1)) + min_value;
  return randomNumber;
}

// For CSS animation
function animate(div) {
  div.classList.add("blinking");
  setTimeout(() => {
    div.classList.remove("blinking");
  }, 1000);
}

// For updating the Sequence
function GameEngine() {
  while (sequence_container.length < current_level) {
    let randomNumber = randomNumberGenerator();
    animate(buttons[randomNumber]);
    sounds[randomNumber].play();
    sequence_container.push(buttons[randomNumber].id);
  }
  console.log(current_level + " : " + sequence_container);
}

// For identifying the last index situation
function lastIndexIndentifier(index) {
  if (index == sequence_container.length) {
    console.log("Last Index");
    return true;
  } else return false;
}

function handleClicks(event) {
  event.preventDefault();
  // =========Sound Effect==========
  let audio;
  switch (event.target.id) {
    case "green":
      audio = sounds[0];
      audio.currentTime = 0;
      audio.play();
      break;
    case "red":
      audio = sounds[1];
      audio.currentTime = 0;
      audio.play();
      break;
    case "yellow":
      audio = sounds[2];
      audio.currentTime = 0;
      audio.play();
      break;
    case "blue":
      audio = sounds[3];
      audio.currentTime = 0;
      audio.play();
      break;
  }
  console.log(event.target.id);

  // =========CSS Effect==============
  event.target.classList.add("pressed");
  setTimeout(() => {
    event.target.classList.remove("pressed");
  }, 50);
  //==================================
  // Checking and keeping track of the User interaction....
  if (userChoiceIndex < sequence_container.length) {
    if (event.target.id == sequence_container[userChoiceIndex]) {
      // Correct Choice....
      ++userChoiceIndex;
      console.log(lastIndexIndentifier(userChoiceIndex));
      if (lastIndexIndentifier(userChoiceIndex)) {
        console.log("Last Index"); // Correct answer of Last Index ==> Time to Generate new Random
        //====Winning Streak Element====
        winningStreak++;
        document.querySelector("#streakCount").innerText =
          "Correct Streak    " + `${winningStreak}`;
        document.querySelector("#streakCount").style.display = "flex";
        // ===============================
        setTimeout(() => {
          current_level++;
          title.innerText = "Level " + current_level;
          GameEngine();
        }, 1000);
        userChoiceIndex = 0; // [*] Important to reset the userChoiceIndex
      }
    } else {
      // Wrong Answer :: Terminate the Program
      // Resetting the setting
      programRunnning = false; // stop the program for restart
      winningStreak = 0;
      sequence_container.length = 0;
      userChoiceIndex = 0;
      // Later, to remove the event listeners [*****]
      // =======Visual Effect=========
      title.innerText = "Game Over...";
      sounds.wrong.play();
      buttons.forEach((button) => {
        // Display PlayAgainDiv
        current_level = 1;
        button.classList.add("wrongAnswer");
        setTimeout(() => {
          button.classList.remove("wrongAnswer");
        }, 3000);
      });
      // ===============================
      // Call Play Again Option
      setTimeout(() => {
        document.getElementById("playAgainDiv").style.display = "flex";
      }, 3000);
    }
  }
}

function StartTheGame() {
  if (programRunnning) {
    buttons.forEach((button) => {
      // Pass the same handleClick function reference when adding the event listener
      button.addEventListener("click", handleClicks);
    });
  }
}

window.addEventListener("keydown", (event) => {
  if (programRunnning) {
    console.log("Prgram is already running ");
    return;
  }
  console.log("Programming is not running");
  if (event.key != "Enter") return;
  programRunnning = true;
  // Default Run ==> One time
  GameEngine();
  title.innerText = "Level " + current_level;
  userChoiceIndex = 0;
  StartTheGame(userChoiceIndex);
});

// ===========PlayAgainDiv=============
let btn_yes = document.getElementById("btn-yes");
btn_yes.addEventListener("click", () => {
  sounds.click.play();
  // PlayAgain User
  document.querySelector("#streakCount").style.display = "none";
  document.querySelector("#streakCount").innerText = "";
  document.getElementById("playAgainDiv").style.display = "none";
  title.innerText = "Press Enter to Start";
  buttons.forEach((button) => {
    button.removeEventListener("click", handleClicks);
  });
});
btn_yes.addEventListener("mouseenter", () => {
  sounds.pop.play();
});

let btn_no = document.getElementById("btn-no");
btn_no.addEventListener("click", () => {
  // GoodBye User
  sounds.click.play();
  setTimeout(() => {
    document.getElementById("playAgainItem").style.display = "none";
    document.getElementById("goodBye_div").style.display = "block";
    sounds.goodBye.play();
  }, 1000);
});
btn_no.addEventListener("mouseenter", () => {
  sounds.pop.play();
});
// =====================================
if (window.innerWidth <= 620) {
  let btn_Started = document.createElement("button");
  btn_Started.innerText = "Get Started";
  btn_Started.classList.add("button");
  btn_Started.classList.style.width = "100px";
  document.querySelector("body").appendChild();
}
