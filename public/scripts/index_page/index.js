// constants
const days = document.getElementsByClassName('day');

// variables


// global variables


// neutral code


// functions
function showDaysOfTheMonth () {
    for (let i = 0; i < days.length; i++) {
        const day = days[i];
        day.innerHTML = `<p class="day-count"> ${i+1} </p>`
    }
}


// event listeners
window.onload = () => {
    showDaysOfTheMonth()
}