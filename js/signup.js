document.getElementById('signup-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Förhindrar sidan från att ladda om efter att man lämnat in

    // Hämtar detaljerna från formuläret
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const terms = document.getElementById('terms').checked;

    // Kollar ifall email innehåller @ och .
    if (!validateEmail(email)) {
        alert('Please enter a valid email address (must contain "@" and ".").');
        return;
    }

    // Kontrollerar så att lösenordet är minst 6 tecken långt
    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
    }

    // Kollar ifall lösenorden matchar
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // Säkerställer så att användaren har tryckt på agree to terms of service
    if (!terms) {
        alert('You must agree to the Terms of Service.');
        return;
    }

    // Hämtar användare som redan existerar i localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Kollar ifall användaren redan finns
    const userExists = users.some(u => u.email === email);
    if (userExists) {
        alert('User already exists!');
        return;
    }

    const user = { email, password };

    // Lägger till användaren i listan och sparar i localStorage
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Sign up successful!');
    window.location.href = 'login.html'; // Tar användaren tillbaka till startsidan
});

// Funktion för att validera e-postformat
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // En simpel regex för att validera epost
    return regex.test(email);
}
