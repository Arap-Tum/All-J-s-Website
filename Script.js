// Slidehow functionality
let slideIndex = 0;
showSlides();

function showSlides() {
    let slides =document.getElementsByClassName("slides");
    let dots = document.getElementsByClassName("dot");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display ="block";
    dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 7000) // Change image every 7 seconds
}

//THE TOGGLE MENU
const toggleButton = document.getElementById('toggle-button');
const menu = document.getElementById('menu');

// Toggle the menu when the toggle button is clicked
toggleButton.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevents the click from closing the menu immediately
    menu.classList.toggle('active');
});

// Close the menu when clicking anywhere outside of the menu
document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !toggleButton.contains(e.target)) {
        menu.classList.remove('active');
    }
});

