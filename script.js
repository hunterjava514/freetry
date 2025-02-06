document.getElementById('accountForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const domain = document.getElementById('domain').value;

    if (username && domain) {
        const generatedEmail = generateEmail(username, domain);
        const generatedPassword = generatePassword();
        
        document.getElementById('generatedEmail').textContent = generatedEmail;
        document.getElementById('generatedPassword').textContent = generatedPassword;
        document.getElementById('result').style.display = 'block';
    } else {
        alert('Please enter a valid username.');
    }
});

function generateEmail(username, domain) {
    return `${username.toLowerCase()}@${domain}`;
}

function generatePassword() {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=";
    let password = "";
    
    for (let i = 0; i < 12; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    
    return password;
}
