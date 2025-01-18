const database = {
    users: {},
};

// User Registration
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (database.users[email]) {
        document.getElementById('registerMessage').textContent = 'User already exists.';
    } else {
        database.users[email] = {
            name,
            password,
            barrels: 12,
            bookingHistory: []
        };
        document.getElementById('registerMessage').textContent = 'Registration successful!';
    }
});

// User Login
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    if (database.users[email] && database.users[email].password === password) {
        document.getElementById('loginMessage').textContent = 'Login successful!';
        document.getElementById('booking').style.display = 'block';
        document.getElementById('bookingHistory').innerHTML = '';
        database.users[email].bookingHistory.forEach(history => {
            const listItem = document.createElement('li');
            listItem.textContent = history;
            document.getElementById('bookingHistory').appendChild(listItem);
        });
    } else {
        document.getElementById('loginMessage').textContent = 'Invalid credentials.';
    }
});

// Booking a Cylinder
document.getElementById('bookCylinder').addEventListener('click', function() {
    const email = document.getElementById('loginEmail').value;

    if (database.users[email] && database.users[email].barrels > 0) {
        database.users[email].barrels--;
        const bookingDate = new Date().toLocaleString();
        database.users[email].bookingHistory.push(bookingDate);

        const listItem = document.createElement('li');
        listItem.textContent = bookingDate;
        document.getElementById('bookingHistory').appendChild(listItem);
        document.getElementById('bookingMessage').textContent = 'Cylinder booked successfully!';
    } else {
        document.getElementById('bookingMessage').textContent = 'No barrels left to book.';
    }
});
