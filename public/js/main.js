
/* BOX2 IMG LINKS AND HOVER CHANGES */

// Grab all elements with the class 'sub-box' from the DOM
var subBoxes = document.querySelectorAll('.sub-box');

/**
 * This function changes the image source of a given box (sub-container) when hovered over.
 * @param {HTMLElement} box - The sub-container to attach the event listeners to.
 * @param {string} newPath - The new image source to be used on hover.
 */
function changeImageOnHover(box, newPath) {
    // Get the hover-image element inside the provided box.
    var hoverImageContainer = box.querySelector('.hover-image');

    // Attach an event listener to the box that listens for a mouseover (hover) event.
    box.addEventListener('mouseover', function() {
        // Set the hover image as the background of the hover-image container.
        hoverImageContainer.style.backgroundImage = 'url(' + newPath + ')';
        // Show the hover-image container.
        hoverImageContainer.style.display = 'block';
    });

    // Attach an event listener to the box that listens for a mouseout event.
    box.addEventListener('mouseout', function() {
        // Hide the hover-image container.
        hoverImageContainer.style.display = 'none';
    });
}

// Loop through each sub-container in the 'subBoxes' NodeList.
for (var i = 0; i < subBoxes.length; i++) {
    // Fetch the path to the hover image from the data-hover-image attribute of the sub-box.
    var hoverImagePath = subBoxes[i].getAttribute('data-hover-image');
    
    // For each sub-container, apply the changeImageOnHover function to give it the hover effect.
    changeImageOnHover(subBoxes[i], hoverImagePath);
}







/* QUIZ POP-UP */

// References to DOM elements related to the quiz
var quizButton = document.getElementById('quizButton');
var quizModal = document.getElementById('quizModal');
var submitQuiz = document.getElementById('submitQuiz');
var quizQuestion = document.getElementById('quizQuestion');
var option1 = document.getElementById('option1');
var option2 = document.getElementById('option2');
var option3 = document.getElementById('option3');
var quizFeedback = document.getElementById('quizFeedback');
var quizOptions = document.querySelectorAll('input[name="quizOption"]');

// Sample quiz questions with their options and correct answers
var questions = [
    {
        question: "What color is the sky?",
        options: ["Red", "Blue", "Green"],
        correctIndex: 1
    },
    {
        question: "Which animal can fly?",
        options: ["Dog", "Bird", "Elephant"],
        correctIndex: 1
    }
];

var currentCorrectIndex; // Stores the correct answer index of the current question

// Check if a quiz button is present in the DOM
if (quizButton) {

    // Display a random quiz question when the quiz button is clicked
    quizButton.addEventListener('click', function() {
        var randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        quizQuestion.textContent = randomQuestion.question;
        option1.textContent = randomQuestion.options[0];
        option2.textContent = randomQuestion.options[1];
        option3.textContent = randomQuestion.options[2];

        currentCorrectIndex = randomQuestion.correctIndex; // Update correct index
        quizFeedback.textContent = ''; // Reset feedback
        quizOptions.forEach(opt => opt.checked = false); // Reset option selections
        quizModal.style.display = 'flex'; // Show the quiz modal
    });

    // Evaluate the selected answer when the quiz is submitted
    submitQuiz.addEventListener('click', function() {
        var selectedOption;
        for (var i = 0; i < quizOptions.length; i++) {
            if (quizOptions[i].checked) {
                selectedOption = i; // Store selected option index
                break;
            }
        }
    
        // Display feedback based on answer correctness
        if (selectedOption === currentCorrectIndex) {
            quizFeedback.textContent = 'Congrats!';
            quizFeedback.style.color = 'green';
            quizFeedback.style.opacity = '1';
            setTimeout(() => {
                quizModal.style.display = 'none'; // Hide the quiz modal after a delay
            }, 2000);
        } else {
            quizFeedback.textContent = 'Try Again!';
            quizFeedback.style.color = 'red';
            quizFeedback.style.opacity = '1';
            setTimeout(() => {
                quizFeedback.style.opacity = '0'; // Fade out feedback after a delay
            }, 1000);
        }
    });
}








/* MAP AND POINTS OF INTEREST */

// Listening for the document to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Check if any '.point-of-interest' elements exist on the page
    if (document.querySelector('.point-of-interest')) {
        // Collecting all the '.point-of-interest' and '.info-points' elements
        var points = document.querySelectorAll('.point-of-interest');
        var infoSets = document.querySelectorAll('.info-points');

        // Loop through each point of interest
        Array.prototype.forEach.call(points, function(point) {
            point.addEventListener('click', function() {
                // Get the 'data-info' attribute value which corresponds to an info set ID
                var targetInfo = this.getAttribute('data-info');

                // Hide all the info sets
                Array.prototype.forEach.call(infoSets, function(set) {
                    set.style.display = 'none';
                });

                // Display the info set that matches the clicked point of interest
                document.getElementById(targetInfo).style.display = 'flex';
            });
        });
    }
});







/* NPC CARDS FOR PEOPLE PAGE */

// Check if the page contains NPC cards before executing the script
if(document.querySelector('.npc-card')) {

    // References to modal elements
    var npcModal = document.getElementById('npcModal');
    var npcModalTitle = document.getElementById('npcModalTitle');
    var npcModalSubtitle = document.getElementById('npcModalSubtitle');
    var npcModalDetails = document.getElementById('npcModalDetails');
    var npcModalDescription = document.getElementById('npcModalDescription');
    var npcModalImage = npcModal.querySelector('.img-container');
    var npcModalContent = document.querySelector('.npc-modal-content');

    // List of all NPC cards on the page
    var npcCards = document.querySelectorAll('.npc-card');

    // Add a click event listener to each NPC card
    for(var i = 0; i < npcCards.length; i++) {
        npcCards[i].addEventListener('click', function(e) {
            var card = e.currentTarget;

            // Extract and update the modal content using attributes and child elements of the clicked card
            npcModalImage.style.backgroundImage = card.getAttribute('data-modal-img');
            npcModalTitle.textContent = card.querySelector('h3').textContent;
            npcModalSubtitle.textContent = card.querySelector('.title').textContent;
            npcModalDetails.innerHTML = card.querySelector('.details').innerHTML;
            npcModalDescription.textContent = card.querySelector('.description').textContent;

            // Show the NPC modal
            npcModal.style.display = 'flex';
        });
    }

    // Add a click event listener to the modal to close it when the background (but not content) is clicked
    npcModal.addEventListener('click', function(e) {
        if(e.target === npcModal) {
            npcModal.style.display = 'none';
        }
    });

    // Prevent the modal content's click event from propagating to the modal itself (avoiding unintentional close)
    npcModalContent.addEventListener('click', function(e) {
        e.stopPropagation();
    });
}







/* IMAGE CAROUSEL FUNCTIONALITY */

// Check if the carousel's main image container exists on the page
if (document.getElementById('gallery-carousel-image')) {

    // References to the carousel's main image and navigation buttons
    var img = document.getElementById('gallery-carousel-image');
    var rightBtn = document.getElementById('gallery-carousel-right-btn');
    var leftBtn = document.getElementById('gallery-carousel-left-btn');

    // Array of image URLs for the carousel
    var pictures = [
        'css/images/Ebberthrall01.jpg',
        'css/images/Ebberthrall02.jpg',
        'css/images/Ebberthrall03.jpg'
    ];

    // Initialize the carousel with the first image from the array
    img.src = pictures[0];
    
    // Position variable to track the currently displayed image's index in the array
    var position = 0;

    // Function to navigate to the next image in the carousel
    function moveRight() {
        // If we're at the last image, wrap around to the first one
        if (position >= pictures.length - 1) {
            position = 0;
            img.src = pictures[position];
            return;
        }
        
        // Otherwise, navigate to the next image
        img.src = pictures[position + 1];
        position++;
    }

    // Function to navigate to the previous image in the carousel
    function moveLeft() {
        // If we're at the first image, wrap around to the last one
        if (position < 1) {
            position = pictures.length - 1;
            img.src = pictures[position];
            return;
        }

        // Otherwise, navigate to the previous image
        img.src = pictures[position - 1];
        position--;
    }

    // Attach the navigation functions to the respective navigation buttons
    rightBtn.addEventListener("click", moveRight);
    leftBtn.addEventListener("click", moveLeft);
}







/* IMAGE GRID GALLERY FUNCTIONALITY */

// Check if a gallery element exists on the page
if (document.querySelector('.gallery')) {

    // Flag to track if the image is in full size or not
    var isFullSize = false;

    // Handles the gallery item click event: Opens the image in a modal
    function handleGalleryItemClick() {
        // Get the large version of the clicked image
        var imageSrc = this.getAttribute('data-image');
        
        // Reference to the modal's image container
        var modalImage = document.getElementById('modalImage');
        
        // Reset image to default size and update its source
        isFullSize = false;
        modalImage.classList.remove('full-size');
        modalImage.src = imageSrc;
        
        // Display the modal
        document.getElementById('imageModal').style.display = "block";
    }

    // Handles the modal click event: Closes the modal when clicked outside the image
    function handleModalClick(e) {
        if (e.target === this) {
            this.style.display = 'none';
        }
    }

    // Toggle between default and full-size image view on click
    function toggleImageSize() {
        var modalImage = document.getElementById('modalImage');

        // Toggle the image size based on the current state
        if (isFullSize) {
            modalImage.classList.remove('full-size');
        } else {
            modalImage.classList.add('full-size');
        }
        
        // Flip the state flag
        isFullSize = !isFullSize;
    }

    // Attach click event listeners to each gallery item to open the corresponding image in a modal
    var galleryItems = document.querySelectorAll('.gallery-item');
    for (var i = 0; i < galleryItems.length; i++) {
        galleryItems[i].addEventListener('click', handleGalleryItemClick);
    }

    // Attach click event listener to the modal image to toggle its size
    var modalImage = document.getElementById('modalImage');
    modalImage.addEventListener('click', toggleImageSize); 

    // Attach click event listener to the modal to close it when clicked outside the image
    document.getElementById('imageModal').addEventListener('click', handleModalClick);
}



/* TIMELINE FUNCTIONALITY */

// Check if a timeline element exists on the page
if (document.querySelector('.timeline')) {
    // Get reference to the timeline popup
    var popup = document.getElementById('timeline-popup');

    // Retrieve all timeline points on the page
    var timelinePoints = document.querySelectorAll('.timeline-point');
    
    // Add click event listeners to each timeline point
    for (var i = 0; i < timelinePoints.length; i++) {
        timelinePoints[i].addEventListener('click', function(event) {
            // Get the clicked timeline point
            var targetDiv = event.currentTarget;

            // References to the popup image and text containers
            var popupImg = document.getElementById('timeline-popup-img');
            var popupText = document.getElementById('timeline-popup-text');

            // Update popup content based on the attributes of the clicked timeline point
            popupImg.src = targetDiv.getAttribute('data-image'); 
            popupText.querySelector('p:first-child').textContent = "Location: " + targetDiv.getAttribute('data-location'); 
            popupText.querySelector('p:nth-child(2)').textContent = "Established: " + targetDiv.getAttribute('data-year'); 
            popupText.querySelector('p:nth-child(3)').textContent = targetDiv.getAttribute('data-description');

            // Display the populated popup
            popup.style.display = 'flex'; 
        });
    }

    // Close the popup when clicking outside of its content (on the overlay)
    popup.addEventListener('click', function(event) {
        if (event.target === popup) {
            popup.style.display = 'none'; 
        }
    });
}





/* Hamburger Menu Functionality */

// Waits for the document to be fully loaded
$(document).ready(function(){
    
    // Adds an event listener for a click on the hamburger icon
    $('.hamburger').click(function(){
        
        // Toggles the 'active' class for the navigation list upon click, which shows/hides the menu
        $('nav ul').toggleClass('active');
    });
});






