import { calculateFee } from './validation.js';

const signoutForm = document.getElementById('signoutForm');

signoutForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const vehicleType = document.getElementById('vehicleType').value;
    const arrivalTime = new Date(document.getElementById('arrivalTime').value);
    const signOutTime = new Date(document.getElementById('signOutTime').value);

    const fee = calculateFee(vehicleType, arrivalTime, signOutTime);
    document.getElementById('fee').innerText = fee;

    alert('Payment Confirmed and Receipt Generated!');
});