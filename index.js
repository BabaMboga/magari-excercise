    const newCarForm = document.querySelector('#new-car-form');
const carList = document.querySelector('#car-list');

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
  });
});