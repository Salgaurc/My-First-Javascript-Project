// Toggle between showing the Register and Login forms
const registerBtn = document.querySelector('.registerBtn');
registerBtn.addEventListener('click', () => showRegisterForm());

function showRegisterForm() {
  document.getElementById('signupForm').classList.remove('hidden');
  document.getElementById('loginForm').classList.add('hidden');
  document.getElementById('buttonContainer').classList.add('hidden');
}

const loginBtn = document.querySelector('.loginBtn');
loginBtn.addEventListener('click', () => showLoginForm());

function showLoginForm() {
  document.getElementById('loginForm').classList.remove('hidden');
  document.getElementById('signupForm').classList.add('hidden');
  document.getElementById('buttonContainer').classList.add('hidden');
}

document.getElementById('goToRegister').addEventListener('click', function (event) {
  event.preventDefault();
  document.getElementById('loginForm').classList.add('hidden');
  document.getElementById('signupForm').classList.remove('hidden');
});

document.getElementById('goToLogin').addEventListener('click', function (event) {
  event.preventDefault();
  document.getElementById('signupForm').classList.add('hidden');
  document.getElementById('loginForm').classList.remove('hidden');
});

// Register form validation
function registerUser() {
  const user = {
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    birthDate: document.getElementById('birthDate').value,
    favorites : [],
    addedApartments: [],
  };

  let isValid = validateForm(user);
  if (isValid) {
    saveUser(user);
    alert('User registered successfully!');
    showLoginForm(); // Switch to login form after registration
  }
}

function validateForm(user) {
  let isValid = true;

  // Validate email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(user.email)) {
    showError('emailError', 'Invalid email format.');
    isValid = false;
  } else {
    clearError('emailError');
  }

  // Validate password
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^\w\s]).{6,}$/;
  if (!passwordPattern.test(user.password)) {
    showError('passwordError', 'Password must be at least 6 characters, contain letters, numbers, and special characters.');
    isValid = false;
  } else {
    clearError('passwordError');
  }

  // Additional form validations here (firstName, lastName, birthDate)

  return isValid;
}

function showError(elementId, message) {
  document.getElementById(elementId).innerText = message;
}

function clearError(elementId) {
  document.getElementById(elementId).innerText = '';
}

function saveUser(user) {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
}

// Login form validation - at button push
function loginUser() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  // Clear previous errors
  document.getElementById('loginEmailError').innerText = '';
  document.getElementById('loginPasswordError').innerText = '';

  if (email === "") {
    showError('loginEmailError', 'Please enter an email!');
    return;
  }

  let usersFromLS = JSON.parse(localStorage.getItem('users')) || [];
  let foundUser = usersFromLS.find(user => user.email === email);

  if (!foundUser) {
    showError('loginEmailError', 'User not found!');
  } else if (foundUser.password !== password) {
    showError('loginPasswordError', 'Incorrect password!');
  } else {
    alert('Login successful');
    localStorage.setItem('loggedUser', JSON.stringify(foundUser));
    window.location.href = './../Homepage/homepage.html';
  }
}