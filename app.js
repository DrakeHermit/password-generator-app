const slider = document.getElementById("character-length");
const sliderValueDisplay = document.getElementById("character-range");
const submitBtn = document.getElementById("submitForm");
const form = document.getElementById("form");
const passwordStrength = document.getElementById("character-length");
const checkboxes = document.querySelectorAll("input[type=checkbox]");
const passwordStrengthEl = document.getElementById("password-strength");
const passwordStrengthIndicatorEl = document.getElementById(
  "password-strength-indicator"
);
const passwordField = document.getElementById("password");

sliderValueDisplay.innerText = slider.value;

const getFormData = () => {
  const passwordStrengthValue = parseInt(passwordStrength.value);
  let checkedCheckboxes = [];

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      checkedCheckboxes.push(checkbox.name);
    }
  });

  return {
    passwordStrengthValue,
    checkedCheckboxes,
  };
};

const passwordStrengthVisualiziation = (passwordStrength) => {
  passwordStrengthIndicatorEl.innerHTML = "";

  let bars = createBars();

  let numColoredBars;
  let strengthClass;

  if (passwordStrength < 3) {
    passwordStrengthEl.innerText = "TOO WEAK!";
    numColoredBars = 1;
    strengthClass = "too-weak";
  } else if (passwordStrength >= 3 && passwordStrength < 5) {
    passwordStrengthEl.innerText = "WEAK";
    numColoredBars = 2;
    strengthClass = "weak";
  } else if (passwordStrength >= 5 && passwordStrength < 10) {
    passwordStrengthEl.innerText = "MEDIUM";
    numColoredBars = 3;
    strengthClass = "medium";
  } else if (passwordStrength >= 10) {
    passwordStrengthEl.innerText = "STRONG";
    numColoredBars = 4;
    strengthClass = "strong";
  }

  applyBarColoring(bars, numColoredBars, strengthClass);
};

const createBars = () => {
  let bars = 4;
  const barElements = [];

  for (let i = 1; i <= bars; i++) {
    const bar = document.createElement("div");
    bar.classList.add("bar");

    passwordStrengthIndicatorEl.appendChild(bar);

    barElements.push(bar);
  }

  return barElements;
};

const applyBarColoring = (bars, numColoredBars, strengthClass) => {
  bars.forEach((bar) => {
    bar.classList.remove("too-weak", "weak", "medium", "strong");
    bar.classList.add("bar");
  });

  for (let i = 0; i < numColoredBars; i++) {
    bars[i].classList.add(strengthClass);
  }
};

const randomCharacters = (passwordLength, checkedCheckbox) => {
  const uppercaseLetters = "ABCDEFHIJKLMNOPQRSTUVWXYZ";
  const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "@!%$&*/?#$^,.|";
  const randomCharacters = [];

  if (checkedCheckbox.includes("uppercase")) {
    for (i = 1; i <= passwordLength; i++) {
      const randomUppercaseLetters = uppercaseLetters.charAt(
        Math.floor(Math.random() * uppercaseLetters.length)
      );
      randomCharacters.push(randomUppercaseLetters);
    }
  } else if (checkedCheckbox.includes("lowercase")) {
    for (i = 1; i <= passwordLength; i++) {
      const randomLowercaseLetters = lowercaseLetters.charAt(
        Math.floor(Math.random() * lowercaseLetters.length)
      );
      randomCharacters.push(randomLowercaseLetters);
    }
  } else if (checkedCheckbox.includes("numbers")) {
    for (i = 1; i <= passwordLength; i++) {
      const randomNumbers = numbers.charAt(
        Math.floor(Math.random() * numbers.length)
      );
      randomCharacters.push(randomNumbers);
    }
  } else if (checkedCheckbox.includes("symbols")) {
    for (i = 1; i <= passwordLength; i++) {
      const randomSymbols = symbols.charAt(
        Math.floor(Math.random() * symbols.length)
      );
      randomCharacters.push(randomSymbols);
    }
  }

  const randomLettersStr = randomCharacters.join("");

  return randomLettersStr;
};

const updatePasswordDisplay = (string) => {
  if (string !== "") {
    passwordField.innerText = string;
  } else {
    passwordField.innerText = "Select character length";
    passwordField.style.fontSize = "18px";
  }
  if (passwordField.classList.contains("inactive")) {
    passwordField.style.color = "#fff";
  }
};

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let { passwordStrengthValue, checkedCheckboxes } = getFormData();

  passwordStrengthVisualiziation(passwordStrengthValue);

  let password = randomCharacters(passwordStrengthValue, checkedCheckboxes);
  updatePasswordDisplay(password);
});

slider.addEventListener("input", () => {
  let maxSliderValue = slider.max || 20;
  let currentSliderValue = slider.value;

  sliderValueDisplay.innerText = currentSliderValue;

  let sliderPosition = (currentSliderValue / maxSliderValue) * 100;
  let sliderGradient = `linear-gradient(90deg ,var(--accent-color) ${sliderPosition}%, var(--background-color) ${
    sliderPosition + 1
  }%)`;
  slider.style.background = sliderGradient;
});
