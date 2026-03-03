document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Förhindrar sidan från att ladda om efter att man lämnat in

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Kontrollerar så att båda fälten är inte tomt
    if (!email || !password) {
        alert('Please fill in all fields.');
        return;
    }

    // Kollar ifall email innehåller @ och .
    if (!validateEmail(email)) {
        alert('Please enter a valid email address (must contain "@" and ".").');
        return;
    }

    // Hämtar sparade användare som finns i localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Kollar om användaren finns i listan
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        // Sparar inloggningen i local storage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);

        console.log('Login successful!');
        console.log('isLoggedIn:', localStorage.getItem('isLoggedIn'));
        console.log('userEmail:', localStorage.getItem('userEmail'));

        // Tar användaren tillbaka till startsidan
        window.location.href = 'home.html';
    } else {
        alert('Invalid email or password.');
    }
});

// Funktion för att validera e-postformat
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // En simpel regex för att validera epost
    return regex.test(email);
}
