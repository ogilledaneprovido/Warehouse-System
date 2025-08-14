document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const role = document.getElementById('role').value;
    const errorMsg = document.getElementById('errorMsg');

    if (!username || !password || !role) {
        errorMsg.textContent = 'Please fill in all fields and select a role.';
        errorMsg.style.display = 'block';
        return;
    }

    errorMsg.style.display = 'none';
    alert(`Welcome, ${username}! (Role: ${role.replace(/_/g, ' ')})`);
    // window.location.href = 'dashboard.html'; // Redirect after login
});
