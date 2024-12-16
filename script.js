document.addEventListener('DOMContentLoaded', () => {
    const carImage = document.getElementById('car');
    const carContainer = document.querySelector('.car-container');
    const snapSections = document.querySelectorAll('.snap-section');

    // JavaScript to handle car image changes based on slide visibility
    const car = document.getElementById('car'); // Ensure this ID is correct

    // Object mapping slide IDs to their respective car images
    const carImages = {
        slide2: './assets/miot.png', // Image for slide2
    };

    const updateCarVisibilityAndImage = (currentSlideId) => {
        if (currentSlideId === 'slide2') {
            carContainer.classList.remove('hidden');
            carImage.src = carImages[currentSlideId];
        } else {
            carContainer.classList.add('hidden');
        }
    };

    // Intersection Observer to detect active slide
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    updateCarVisibilityAndImage(entry.target.id);
                }
            });
        },
        { threshold: 0.1 } // Detect when 30% of the section is visible
    );

    // Observe each section
    snapSections.forEach((section) => observer.observe(section));
});

// Define a flag to prevent multiple scroll actions at once
let isScrolling = false;
let scrollSpeed = 1000;  // Adjust this value to control the speed of scroll (in milliseconds)

// Handle scroll event
window.addEventListener('wheel', function (e) {
    if (isScrolling) return;  // Prevent multiple scrolling actions at the same time

    isScrolling = true;  // Lock scrolling until the animation is complete

    // Check if scrolling down or up
    const scrollDirection = e.deltaY > 0 ? 'down' : 'up';

    // Get all the sections
    const sections = document.querySelectorAll('.snap-section');
    const container = document.querySelector('.snap-container');

    // Determine the current section
    let currentSectionIndex = 0;
    sections.forEach((section, index) => {
        if (section.getBoundingClientRect().top <= window.innerHeight / 2) {
            currentSectionIndex = index;
        }
    });

    // Determine the target section based on scroll direction
    let targetSectionIndex = currentSectionIndex;
    if (scrollDirection === 'down' && currentSectionIndex < sections.length - 1) {
        targetSectionIndex = currentSectionIndex + 1;
    } else if (scrollDirection === 'up' && currentSectionIndex > 0) {
        targetSectionIndex = currentSectionIndex - 1;
    }

    // Scroll to the target section
    smoothScrollTo(sections[targetSectionIndex].offsetTop);

    // Allow scrolling after the animation completes
    setTimeout(() => {
        isScrolling = false;
    }, scrollSpeed);
});

// Function to smoothly scroll to a given position
function smoothScrollTo(targetPosition) {
    const startPosition = document.documentElement.scrollTop || document.body.scrollTop;
    const distance = targetPosition - startPosition;
    const duration = scrollSpeed;

    let startTime = null;

    // Scroll animation function
    function animateScroll(currentTime) {
        if (!startTime) startTime = currentTime;
        let progress = currentTime - startTime;

        // Calculate the scroll increment
        let increment = easeInOut(progress, startPosition, distance, duration);

        document.documentElement.scrollTop = increment;
        document.body.scrollTop = increment;

        if (progress < duration) {
            requestAnimationFrame(animateScroll);
        }
    }

    // Ease-in-out function for smooth scrolling
    function easeInOut(t, b, c, d) {
        t /= d; // Update t first
        let ts = t * t; // Now use t in the calculation
        let tc = ts * t;
        return b+c*(tc + -3*ts + 3*t);
    }

    requestAnimationFrame(animateScroll);  // Start the animation
}

// Set the width of the sidebar to 250px (show it)
function openNav() {
    document.getElementById("mySidepanel").style.width = "250px";
}
  
// Set the width of the sidebar to 0 (hide it)
function closeNav() {
    document.getElementById("mySidepanel").style.width = "0";
}