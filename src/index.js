document.addEventListener("DOMContentLoaded", () => {
  const baseUrl = "http://localhost:3000";

  // Function to fetch and display the first cake's details
  function loadFirstCake() {
    fetch(`${baseUrl}/cakes/1`)
      .then((response) => response.json())
      .then(displayCakeDetails);
  }

  // Function to fetch and display the menu of all cakes
  function loadCakeMenu() {
    fetch(`${baseUrl}/cakes`)
      .then((response) => response.json())
      .then((cakes) => {
        const cakeList = document.getElementById("cake-list");
        cakeList.innerHTML = ""; // Clear the list
        cakes.forEach((cake) => {
          const cakeItem = document.createElement("li");
          cakeItem.textContent = cake.name;
          cakeItem.dataset.id = cake.id;
          cakeList.appendChild(cakeItem);
        });
      });
  }

  // Function to display cake details
  function displayCakeDetails(cake) {
    const cakeName = document.getElementById("cake-name");
    const cakeImage = document.getElementById("cake-image");
    const cakeDescription = document.getElementById("cake-description");
    const reviewList = document.getElementById("review-list");

    cakeName.textContent = cake.name;
    cakeImage.src = cake.image_url;
    cakeImage.alt = cake.name;
    cakeDescription.textContent = cake.description;

    reviewList.innerHTML = ""; // Clear the reviews
    cake.reviews.forEach((review) => {
      const reviewItem = document.createElement("li");
      reviewItem.textContent = review;
      reviewList.appendChild(reviewItem);
    });
  }

  // Event listener for cake menu clicks to load cake details
  document.getElementById("cake-list").addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
      const cakeId = event.target.dataset.id;
      fetch(`${baseUrl}/cakes/${cakeId}`)
        .then((response) => response.json())
        .then(displayCakeDetails);
    }
  });

  // Event listener for submitting a new review
  document.getElementById("review-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const reviewInput = document.getElementById("review");
    const newReview = reviewInput.value.trim();
    if (newReview) {
      const reviewList = document.getElementById("review-list");
      const newReviewItem = document.createElement("li");
      newReviewItem.textContent = newReview;
      reviewList.appendChild(newReviewItem);

      // Extra Bonus: Save the new review on the server
      const cakeId = document.querySelector(".cake-details img").alt;
      fetch(`${baseUrl}/cakes/${cakeId}`)
        .then((response) => response.json())
        .then((cake) => {
          cake.reviews.push(newReview);
          return fetch(`${baseUrl}/cakes/${cakeId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ reviews: cake.reviews }),
          });
        });

      reviewInput.value = ""; // Clear the input
    }
  });

  // Event listener for submitting a new description
  document
    .getElementById("description-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const descriptionInput = document.getElementById("description");
      const newDescription = descriptionInput.value.trim();
      if (newDescription) {
        const cakeId = document.querySelector(".cake-details img").alt;
        document.getElementById("cake-description").textContent =
          newDescription;

        // Extra Bonus: Save the new description on the server
        fetch(`${baseUrl}/cakes/${cakeId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ description: newDescription }),
        });

        descriptionInput.value = ""; // Clear the input
      }
    });

  // Event listener for removing a review when clicked
  document.getElementById("review-list").addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
      event.target.remove();
    }
  });

  // Initial load
  loadFirstCake();
  loadCakeMenu();
});
