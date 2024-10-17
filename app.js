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
    symbols: "@!%$&*?#$^",
  };

  const characterSelectionObj = {};

  Object.entries(characterOptions).forEach(([key, value]) => {
    if (selection.includes(key)) {
      characterSelectionObj[key] = [];
      for (let i = 0; i < charLength; i++) {
        const random = value.charAt(Math.floor(Math.random() * value.length));
        characterSelectionObj[key].push(random);
      }
    }
  });

  // Check if it's a single selection after populating characterSelectionObj
  if (Object.keys(characterSelectionObj).length === 1) {
    const singleKey = Object.keys(characterSelectionObj);
    return { singleSelection: characterSelectionObj[singleKey].join("") };
  } else {
    return { multipleSelection: characterSelectionObj };
  }
};

const combinePasswords = (passwordStrength, object) => {
  const values = Object.values(object.multipleSelection);
  const keys = Object.keys(object.multipleSelection);
  let spliceBy = keys.length;

  const combinedArray = [];
  const splicedArray = [];
  values.forEach((key) => {
    combinedArray.push(key);
  });

  console.log(spliceBy);

  combinedArray.map((value) => {
    const valuesToSplice = passwordStrength / spliceBy;
    const splicedValues = value.splice(1, valuesToSplice);
    splicedArray.push(splicedValues);
  });

  const flattenedArray = splicedArray.flat();
  const shuffle = shufflePassword(flattenedArray);

  const string = arrayToString(shuffle);

  return string;
};

// prettier-ignore
const shufflePassword = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

const arrayToString = (array) => array.join("");

const updatePasswordDisplay = (string) => {
  if (string !== "") {
    passwordField.value = string;
  } else {
    passwordField.value = "Select character length";
    passwordField.style.fontSize = "18px";
  }
  if (passwordField.classList.contains("inactive")) {
    passwordField.style.color = "#fff";
    passwordField.style.fontSize = "30px";
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

  const value = generateRandomCharacters(
    passwordStrengthValue,
    checkedCheckboxes
  );

  if (value.singleSelection) {
    updatePasswordDisplay(value.singleSelection);
  } else {
    const multiple = combinePasswords(passwordStrengthValue, value);
    updatePasswordDisplay(multiple);
  }
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
