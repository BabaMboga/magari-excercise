document.addEventListener('DOMContentLoaded', () => {
    const carList = document.querySelector('#car-list');
    const carDetails = document.querySelector('#car-details');
  
    // adds a list of owner names who are in the parking lot
    fetch('http://localhost:3000/cars')
      .then(response => response.json())
      .then(cars => {
        cars.forEach(car => {
          const li = document.createElement('li');
          li.textContent = car.ownername;
          li.addEventListener('click', () => {
            fetch(`http://localhost:3000/cars/${car.id}`)
              .then(response => response.json())
              .then(carsDetails => {
                carDetails.innerHTML = `
                  <img src="${carDetails.carimage}">
                  <h2>${carDetails.carmodel}</h2>
                  <p>The owner number is ${carDetails.ownernumber} while the car number is ${carDetails.carnumber}</p>
                  <button id="Editbtn">Update</button>
                  <button id="Delbtn">Check Out</button>
                `;
                carsDetails.style.display = 'block';
              });
          });
          carList.appendChild(li);
        });
      });
  
    const newCarForm = document.querySelector('#new-car-form');
  
    newCarForm.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const make = document.querySelector('#make').value;
      const model = document.querySelector('#model').value;
      const year = document.querySelector('#year').value;
      const color = document.querySelector('#color').value;
  
      const newCar = { make, model, year, color };
  
      fetch('http://localhost:3000/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCar)
      })
      .then(response => response.json())
      .then(car => {
        const newCarElement = document.createElement('li');
        newCarElement.innerHTML = `
          <span>${car.make} ${car.model} (${car.year}) - ${car.color}</span>
          <button class="details-btn">Details</button>
          <div class="car-details hidden">
            <p>Make: ${car.make}</p>
            <p>Model: ${car.model}</p>
            <p>Year: ${car.year}</p>
            <p>Color: ${car.color}</p>
          </div>
        `;
        carList.appendChild(newCarElement);
  
        // reset the form
        newCarForm.reset();
      });
    });
  });
  