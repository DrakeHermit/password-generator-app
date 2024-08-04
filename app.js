const slider = document.getElementById("character-length");
const sliderValueDisplay = document.getElementById("character-range");

sliderValueDisplay.innerText = slider.value;

slider.addEventListener("input", () => {
  let maxSliderValue = slider.max || 20;
  let currentSliderValue = slider.value;

  sliderValueDisplay.innerText = currentSliderValue;

  let sliderPosition = (currentSliderValue / maxSliderValue) * 100;
  let sliderGradient = `linear-gradient(90deg ,var(--accent-color) ${sliderPosition}%, var(--background-color) ${sliderPosition}%)`;
  slider.style.background = sliderGradient;
});
