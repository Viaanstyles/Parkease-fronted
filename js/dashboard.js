// dashboard.js

// Check login session
document.addEventListener("DOMContentLoaded", function () {

    const isLoggedIn = localStorage.getItem("loggedIn");
    const role = localStorage.getItem("userRole");

    // Redirect if not logged in
    if (!isLoggedIn) {
        window.location.href = "login.html";
        return;
    }

    // Show role on dashboard
    const roleDisplay = document.getElementById("userRole");
    if (roleDisplay) {
        roleDisplay.textContent = role;
    }

    // Example statistics (prototype values)
    const stats = {
        vehiclesToday: 42,
        availableSlots: 18,
        revenueToday: 125000
    };

    const vehicles = document.getElementById("vehiclesToday");
    const slots = document.getElementById("availableSlots");
    const revenue = document.getElementById("revenueToday");

    if (vehicles) vehicles.textContent = stats.vehiclesToday;
    if (slots) slots.textContent = stats.availableSlots;
    if (revenue) revenue.textContent = "UGX " + stats.revenueToday;

});


// Logout button
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {

        localStorage.removeItem("loggedIn");
        localStorage.removeItem("userRole");

        window.location.href = "login.html";

    });
}