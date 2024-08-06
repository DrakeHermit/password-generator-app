const slider = document.getElementById("character-length");
const sliderValueDisplay = document.getElementById("character-range");
const submitBtn = document.getElementById("submitForm");
const form = document.getElementById("form");

sliderValueDisplay.innerText = slider.value;

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  for (const [key, value] of formData) {
    console.log(`${key} - ${value}`);
  }
});

slider.addEventListener("input", () => {
  let maxSliderValue = slider.max || 20;
  let currentSliderValue = slider.value;

  sliderValueDisplay.innerText = currentSliderValue;

  let sliderPosition = (currentSliderValue / maxSliderValue) * 100;
  let sliderGradient = `linear-gradient(90deg ,var(--accent-color) ${sliderPosition}%, var(--background-color) ${sliderPosition}%)`;
  slider.style.background = sliderGradient;
});
