// Get the current user from localStorage
let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
let allUsers = JSON.parse(localStorage.getItem('users'))
let allApartments = JSON.parse(localStorage.getItem('apartments'))
let myApartments = allApartments.filter(apt => apt.addedBy === loggedUser.email)

console.log(myApartments)

// Check if loggedUser exists and is a valid object, if not, redirect to login page
if (loggedUser && loggedUser.firstName) {
    document.getElementById("greeting").textContent = `Hello, ${loggedUser.firstName}`;
    displayApartments(myApartments); //! Display apartments only if a user is logged in
} else {  
    window.location.href = './../Login&Register/login&register.html';  //! redirect to login page
}

// Log out functionality
function logout() {
    alert('Logging out...');
    localStorage.removeItem('loggedUser'); // Clear user from localStorage
    window.location.href = './../Login&Register/login&register.html'; // Redirect to login page
}

// Function to display all apartments from localStorage
function displayApartments(apts) {    

    const housesCardsContainer = document.getElementById('housesCardsContainer'); // Container for apartment cards
    housesCardsContainer.innerHTML = ''; // Clear previous content (if any)   

    //! Aici adaugam toate apartamentele tuturor userilor (nu doar ale noastre)
    if (apts.length > 0) {
        // Iterate through each favorite apartment
        apts.forEach(apartment => {            
            const name = apartment.name || 'Unknown Name'; 
            const city = apartment.city || 'Unknown City'; 
            const areaSize = apartment.areaSize || 'N/A'; 
            const rentPrice = apartment.rentPrice || 'N/A'; 
            const availableDate = apartment.availableDate || 'N/A'; 
            const hasAC = apartment.hasAC ? 'Yes' : 'No'; 
            const yearBuilt = apartment.yearBuilt || 'N/A'; 
            const streetName = apartment.streetName || 'Unknown Street'; 
            const streetNumber = apartment.streetNumber || 'N/A'; 
            const image = apartment.image || 'default-image.jpg'; 

            // Create a card for each favorite apartment
            const card = document.createElement('div'); // Create a new div for the apartment card
            card.className = 'house-card'; // Add 'house-card' class for styling
            card.innerHTML = `
                <img src="${image}" alt="${name}" class="house-image">
                <div class="house-details">
                    <h3>${name}</h3> 
                    <p><strong>City:</strong> ${city}</p>
                    <p><strong>Street:</strong> ${streetName} ${streetNumber}</p>
                    <p><strong>Area:</strong> ${areaSize} (&#13217;)</p>
                    <p><strong>Price:</strong> $${rentPrice}/month</p>
                    <p><strong>Availability:</strong> ${availableDate}</p> 
                    <p><strong>AC:</strong> ${hasAC}</p> 
                    <p><strong>Year built:</strong> ${yearBuilt}</p>
                   
                    <button class="deleteButton" data-id="${apartment.id}">Delete</button>
                </div>
            `;
            housesCardsContainer.appendChild(card); // Add the card to the apartments container
        });

        // Add event listener for favorite buttons
        document.querySelectorAll('.deleteButton').forEach(button => {
            button.addEventListener('click', function() {
                const apartmentId = parseInt(this.getAttribute('data-id')); // Get the apartment ID                
                deleteApartment(apartmentId)
            });
        });
    } else {
        // Message if no favorite apartments
        housesCardsContainer.innerHTML = '<p>No favorite apartments available.</p>'; // Display message
    }
}

function deleteApartment(apartmentId) {
    // 1. Check if loggedUser exists and has added apartments
    if (loggedUser && Array.isArray(loggedUser.addedApartments)) {
        // Find the index of the apartment to delete
        const deleteIndex = loggedUser.addedApartments.findIndex(apartment => apartmentId === apartmentId);

        // If apartment found, remove it
        if (deleteIndex !== -1) {
            loggedUser.addedApartments.splice(deleteIndex, 1);
        }
        // Update localStorage for loggedUser
        localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
    }

    // 2. Update the global apartments array in localStorage
    const allAptIndex = allApartments.findIndex(apt => apt.id === apartmentId);

    // If apartment found in allApartments, remove it
    if (allAptIndex !== -1) {
        allApartments.splice(allAptIndex, 1);
        localStorage.setItem('apartments', JSON.stringify(allApartments)); // Save updated apartments back to localStorage
    }

    // 3. Update the 'users' key in localStorage to reflect the deletion for the loggedUser
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(user => user.email === loggedUser.email);

    // If the user is found in the users array, update their data
    if (userIndex !== -1) {
        users[userIndex] = loggedUser; // Replace the user data with the updated loggedUser data
        localStorage.setItem('users', JSON.stringify(users)); // Save the updated users array back to localStorage
    }

    // 4. Update myApartments after the deletion
    myApartments = allApartments.filter(apt => apt.addedBy === loggedUser.email);

    // 5. Refresh the displayed apartments
    displayApartments(myApartments); // Refresh all apartments after the deletion
    displayApartments(allApartments);
}