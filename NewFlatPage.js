let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
let users = JSON.parse(localStorage.getItem("users"));

// Check if loggedUser exists and is a valid object
if (loggedUser && loggedUser.firstName) {
  document.getElementById("greeting").textContent = `Hello, ${loggedUser.firstName}`;
} else {
  //! if not loggedUser, redirect to login page
  window.location.href = "./../Login&Register/login&register.html";
}

// Log out functionality
function logout() {
  alert("Logging out...");
  // Clear user from localStorage
  localStorage.removeItem("loggedUser");
  // Redirect to Login
  window.location.href = "./../Login&Register/login&register.html";
}

const apartmentImages = [
  "../Images/apimg1.jpg",
  "../Images/apimg2.jpg",
  "../Images/apimg3.jpg",
  "../Images/apimg4.jpg",
  "../Images/apimg5.jpg",
  "../Images/apimg6.jpg",
  "../Images/apimg7.png",
  "../Images/apimg8.jpg",
  "../Images/apimg9.jpg",
  "../Images/apimg10.jpg",
  "../Images/apimg11.jpg",
  "../Images/apimg12.jpg",
  "../Images/apimg13.jpg",
  "../Images/apimg14.jpg",
  "../Images/apimg15.jpg",
];

// Function to get a random image for the apartment
function getRandomApartmentImage() {
  const randomIndex = Math.floor(Math.random() * apartmentImages.length);
  return apartmentImages[randomIndex];
}

document.getElementById("addApartmentForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const apartment = {
    id: Date.now(),
    name: document.getElementById("apartmentName").value,
    city: document.getElementById("city").value,
    streetName: document.getElementById("streetName").value,
    streetNumber: parseInt(document.getElementById("streetNumber").value),
    areaSize: parseInt(document.getElementById("areaSize").value),
    hasAC: document.getElementById("hasAC").value === "true",
    yearBuilt: parseInt(document.getElementById("yearBuilt").value),
    rentPrice: parseInt(document.getElementById("rentPrice").value),
    availableDate: document.getElementById("availableDate").value,
    image: getRandomApartmentImage(),
    addedBy: loggedUser.email,
  };

  addApartment(apartment);
  addApartmentToUserArray(apartment)
  alert("Apartment added successfully!");
  resetForm("addApartmentForm"); // Reset form after submission
});

// Function to save apartment to the global apartments list
function addApartment(apartment) {
  let apartments = JSON.parse(localStorage.getItem("apartments")) || [];
  apartments.push(apartment);
  localStorage.setItem("apartments", JSON.stringify(apartments));
}


// Function to add apartment to the user's addedApartments array and update the user in localStorage
function addApartmentToUserArray(apartment) {  
  let foundUser = users.find(user => user.email === loggedUser.email);

  if (foundUser) {
    foundUser.addedApartments.push(apartment);
    

    // Find the index of the current user in the users array
    let userIndex = users.findIndex(user => user.email === loggedUser.email);

    // Replace the current user with the updated foundUser in the users array
    users[userIndex] = foundUser;

    // Update the users in localStorage
    localStorage.setItem("users", JSON.stringify(users));

    // Update the loggedUser in localStorage
    loggedUser.addedApartments.push(apartment);
    localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
  } else {
    alert('User not found');
  }
}


// Function to reset the form
function resetForm(formId) {
  document.getElementById(formId).reset(); // Reset the form fields
}
