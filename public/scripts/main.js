// constants
const backdrop = document.getElementById('backdrop');
const burgerMenu = document.getElementById('burger-menu');
const sideBar = document.getElementById('authentication-links')

// variables




// global variables


// neutral code


// functions
function toggleBackdrop(option) {
    switch (option) {
        case "sideBar":
            console.log('succes')
            backdrop.classList.toggle('display-block');
            sideBar.classList.toggle('display-flex');
            burgerMenu.classList.toggle('active-burger');
            setTimeout(() => {
                sideBar.classList.toggle('translateX-0');
            }, 1);
            break;
    }
}


// event listeners
window.addEventListener('resize', () => {
    if (window.innerWidth >= 600 && burgerMenu.classList.contains("active-burger")){
        toggleBackdrop("sideBar")
    } 
})

burgerMenu.addEventListener('click', () => {
    toggleBackdrop("sideBar")
})

backdrop.addEventListener('click', () => {
    toggleBackdrop("sideBar")
})