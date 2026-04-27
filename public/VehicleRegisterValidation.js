const form = document.getElementById("registerVehicle");
const resultDiv = document.getElementById("resultMessage");

const platePattern = /^[A-Z]{3}\s\d{3}[A-Z]$/;
const namePattern = /^[a-zA-Z]+ [a-zA-Z]+/;
const phonePattern = /^(?:\+256|0)7\d{8}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const ninRegex = /^(CM|CF)[0-9]{2}[A-Z0-9]{10}$/;

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const plate = document
    .getElementById("numberPlate")
    .value.trim()
    .toUpperCase();
  const name = document.getElementById("driverName").value.trim();
  const phone = document.getElementById("phoneNumber").value.trim();
  const nin = document.getElementById("ninNumber").value.trim().toUpperCase();
  const vehicleType = document.getElementById("vehicleType").value;
  const vehicleModel = document.getElementById("vehicleModel").value;
  const vehicleColor = document.getElementById("vehicleColor").value;

  resultDiv.innerHTML = "";
  resultDiv.classList.remove("validationError");

  function Error(message) {
    resultDiv.classList.add("validationError");
    resultDiv.innerHTML = `<p>${message}</p>`;
  }

  if (!namePattern.test(name)) {
    Error("Please enter your full name.");
    return;
  }

  if (!phonePattern.test(phone)) {
    Error(" Invalid Number Use: 07XXXXXXXX or +2567XXXXXXXX");
    return;
  }

  if (!vehicleType) {
    Error("Please select the vehicle type.");
    return;
  }

  if (!platePattern.test(plate)) {
    Error(" Invalid number plate. Use: UAA 123A");
    return;
  }

  if (!vehicleModel) {
    Error("Please enter the vehicle model.");
    return;
  }

  if (!vehicleColor) {
    Error("Please enter the color of the vehicle.");
    return;
  }

  if (vehicleType === "Boda-boda" && !ninRegex.test(nin)) {
    Error("Please enter valid NIN Number");
    return;
  }
  form.submit();
});
