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

// passwordStrengthEl.innerText = "";
sliderValueDisplay.innerText = slider.value;

const getFormData = () => {
  const passwordStrengthValue = parseInt(passwordStrength.value);
  let isAnyCheckboxChecked = false;

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      console.log(checkbox.name);
      isAnyCheckboxChecked = true;
    }
  });

  console.log(passwordStrengthValue);

  return {
    passwordStrengthValue,
    isAnyCheckboxChecked,
  };
};

const passwordStrengthVisualiziation = (passwordStrength) => {
  passwordStrengthIndicatorEl.innerHTML = "";

  let bars = createBars();

  let numColoredBars;
  let strengthClass;

  if (passwordStrength < 3) {
    passwordStrengthEl.innerText = "TOO WEAK";
    numColoredBars = 1;
    strengthClass = "too-weak";
  } else if (passwordStrength >= 3 && passwordStrength < 5) {
    passwordStrengthEl.innerText = "WEAK";
    numColoredBars = 2;
    strengthClass = "weak";
  } else if (passwordStrength >= 5 && passwordStrength < 8) {
    passwordStrengthEl.innerText = "MEDIUM";
    numColoredBars = 3;
    strengthClass = "medium";
  } else if (passwordStrength >= 8) {
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

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let { passwordStrengthValue, isAnyCheckboxChecked } = getFormData();

  passwordStrengthVisualiziation(passwordStrengthValue);
});

slider.addEventListener("input", () => {
  let maxSliderValue = slider.max || 20;
  let currentSliderValue = slider.value;

  sliderValueDisplay.innerText = currentSliderValue;

  let sliderPosition = (currentSliderValue / maxSliderValue) * 100;
  let sliderGradient = `linear-gradient(90deg ,var(--accent-color) ${sliderPosition}%, var(--background-color) ${sliderPosition}%)`;
  slider.style.background = sliderGradient;
});
