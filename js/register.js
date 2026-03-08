import { validateName, validatePhone, validatePlate, validateNIN } from './validation.js';

const regForm = document.getElementById('registrationForm');
const regError = document.getElementById('errorMsg');

regForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const driverName = document.getElementById('driverName').value;
    const phone = document.getElementById('phone').value;
    const plate = document.getElementById('plate').value;
    const nin = document.getElementById('nin').value;

    if (!validateName(driverName)) {
        regError.innerText = 'Invalid Driver Name';
        return;
    }
    if (!validatePhone(phone)) {
        regError.innerText = 'Invalid Phone Number';
        return;
    }
    if (!validatePlate(plate)) {
        regError.innerText = 'Invalid Plate Number';
        return;
    }
    if (nin && !validateNIN(nin)) {
        regError.innerText = 'Invalid NIN';
        return;
    }

    regError.innerText = 'Vehicle Registered Successfully!';
});