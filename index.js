document.addEventListener('DOMContentLoaded',() => {
    const carList = document.querySelector('#car-list');
    const carDetails = document.querySelectorAll('#car-details');

    fetch ('')
    .then(response => response.json)
    .then(cars)
})