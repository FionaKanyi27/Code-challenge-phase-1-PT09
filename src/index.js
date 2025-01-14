// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
    const cakeList = document.getElementById("cake-list");
    const cakeName = document.getElementById("cake-name");
    const cakeImage = document.getElementById("cake-image");
    const cakeDescription = document.getElementById("cake-description");
    const descriptionForm = document.getElementById("description-form");
    const descriptionInput = document.getElementById("description");
    const reviewList = document.getElementById("review-list");
    const reviewForm = document.getElementById("review-form");
    const reviewInput = document.getElementById("review");
  
    let cakes = []; // To hold cake data
    let currentCake = null; // Currently selected cake
  
    // Fetch cakes data from JSON file
    fetch("cakes.json")
      .then((response) => response.json())
      .then((data) => {
        cakes = data.cakes; // Store cakes data
        renderCakeList(cakes); // Render cake list
        if (cakes.length > 0) {
          displayCakeDetails(cakes[0]); // Display details of the first cake
        }
      })
      .catch((error) => console.error("Error fetching cakes:", error));
  
    // Render cake list in the navigation
    function renderCakeList(cakes) {
      cakes.forEach((cake) => {
        const li = document.createElement("li");
        li.textContent = cake.name;
        li.addEventListener("click", () => displayCakeDetails(cake));
        cakeList.appendChild(li);
      });
    }
  
    // Display details of the selected cake
    function displayCakeDetails(cake) {
      currentCake = cake;
      cakeName.textContent = cake.name;
      cakeImage.src = cake.image_url;
      cakeImage.alt = cake.name;
      cakeDescription.textContent = cake.description;
      descriptionInput.value = cake.description; // Pre-fill description form
      renderReviews(cake.reviews);
    }
  
    // Render reviews for the selected cake
    function renderReviews(reviews) {
      reviewList.innerHTML = ""; // Clear existing reviews
      reviews.forEach((review) => {
        const li = document.createElement("li");
        li.textContent = review;
        reviewList.appendChild(li);
      });
    }
  
    // Update cake description
    descriptionForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent form submission
      const updatedDescription = descriptionInput.value;
      if (currentCake) {
        currentCake.description = updatedDescription; // Update description in data
        cakeDescription.textContent = updatedDescription; // Update UI
      }
    });
  
    // Add a new review
    reviewForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent form submission
      const newReview = reviewInput.value.trim();
      if (newReview && currentCake) {
        currentCake.reviews.push(newReview); // Add review to data
        const li = document.createElement("li");
        li.textContent = newReview;
        reviewList.appendChild(li); // Add to UI
        reviewInput.value = ""; // Clear input
      }
    });
  });
  