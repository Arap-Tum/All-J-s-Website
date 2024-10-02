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