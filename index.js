document.addEventListener('DOMContentLoaded',() => {
    const carList = document.querySelector('#car-list');
    const carDetails = document.querySelectorAll('#car-details');


// adds a list of owner names who are in the parking lot
    fetch ('http://localhost:3000/cars')
    .then(response => response.json)
    .then(cars => {
        cars.forEach(car => {
            const li = document.createElement('li');
            li.textContent = car.ownername;
            li.addEventListener('click',() =>{
                fetch(`http://localhost:3000/characters/${car.id}`)
              .then(response => response.json())
              .then(carDetails => {
                
                carDetails.innerHTML = `
                  <img src="${carDetails.carimage}">
                  <h2>${carDetails.carmodel}</h2>
                  <p>'The owner number is'${carDetails.ownernumber} 'while the car number is' ${carDetails.carnumber}</p>
                  <button id="Editbtn">Update</button>
                  <button id="Delbtn">Check Out</button>
                `;
                carDetails.style.display = 'block';
              });
            })
    })
})