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
const copyButtonEl = document.getElementById("copy-button");
const copyAlert = document.querySelector(".alert");

copyAlert.style.display = "none";

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

const generateRandomCharacters = (charLength, selection) => {
  const characterOptions = {
    uppercase: "ABCDEFHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "@!%$&*/?#$^,.|",
  };

  const characterSelection = [];
  const characterSelectionObj = {};

  if (selection.length === 1) {
    Object.entries(characterOptions).forEach(([key, value]) => {
      if (selection.includes(key)) {
        for (let i = 0; i < charLength; i++) {
          const random = value.charAt(Math.floor(Math.random() * value.length));
          characterSelection.push(random);
        }
      }
    });
  } else {
    Object.entries(characterOptions).forEach(([key, value]) => {
      if (selection.includes(key)) {
        for (let i = 0; i < charLength; i++) {
          const random = value.charAt(Math.floor(Math.random() * value.length));
          if (!characterSelectionObj[key]) {
            characterSelectionObj[key] = [];
          }
          characterSelectionObj[key].push(random);
        }
      }
    });
  }
  const characterSelectionStr = characterSelection.join("");
  return { characterSelectionStr, characterSelectionObj };
};

const randomCharacters = (passwordLength) => {
  const randomCharacters = {
    "random uppercase": [],
    "random lowercase": [],
    "random numbers": [],
    "random symbols": [],
  };

  for (let i = 0; i < passwordLength; i++) {
    const randomUppercase = characterOptions.uppercase.charAt(
      Math.floor(Math.random() * passwordLength)
    );
    randomCharacters["random uppercase"].push(randomUppercase);
  }

  for (let i = 0; i < passwordLength; i++) {
    const randomLowercase = characterOptions.lowercase.charAt(
      Math.floor(Math.random() * passwordLength)
    );
    randomCharacters["random lowercase"].push(randomLowercase);
  }

  for (let i = 0; i < passwordLength; i++) {
    const randomNumbers = characterOptions.numbers.charAt(
      Math.floor(Math.random() * passwordLength)
    );
    randomCharacters["random numbers"].push(randomNumbers);
  }

  for (let i = 0; i < passwordLength; i++) {
    const randomSymbols = characterOptions.symbols.charAt(
      Math.floor(Math.random() * passwordLength)
    );
    randomCharacters["random symbols"].push(randomSymbols);
  }
};

const updatePasswordDisplay = (string) => {
  if (string !== "") {
    passwordField.value = string;
  } else {
    passwordField.value = "Select character length";
    passwordField.style.fontSize = "18px";
  }
  if (passwordField.classList.contains("inactive")) {
    passwordField.style.color = "#fff";
    passwordField.style.fontSize = "32px";
  }
};

const copyToClipboard = async () => {
  if (passwordField.value !== "") {
    passwordField.select();
    passwordField.setSelectionRange(0, 99999);

    try {
      await navigator.clipboard.writeText(passwordField.value);
    } catch (error) {
      console.log("There was an error copying the password", error);
    }
  }

  copyAlert.style.display = "block";

  setTimeout(() => {
    copyAlert.style.display = "none";
  }, 2000);
};

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let { passwordStrengthValue, checkedCheckboxes } = getFormData();

  passwordStrengthVisualiziation(passwordStrengthValue);

  const {
    characterSelectionStr,
    characterSelectionObj,
  } = generateRandomCharacters(passwordStrengthValue, checkedCheckboxes);
  updatePasswordDisplay(characterSelectionStr);
});

slider.addEventListener("input", () => {
  let maxSliderValue = slider.max || 20;
  let currentSliderValue = slider.value;

  sliderValueDisplay.innerText = currentSliderValue;

  let sliderPosition = (currentSliderValue / maxSliderValue) * 100;
  let sliderGradient = `linear-gradient(to right ,var(--accent-color) ${sliderPosition}%, var(--background-color) ${sliderPosition}%)`;
  slider.style.background = sliderGradient;
});

copyButtonEl.addEventListener("click", copyToClipboard);
