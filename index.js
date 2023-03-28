document.addEventListener("DOMContentLoaded", () => {
  const carList = document.querySelector("#car-list");
  const carDetails = document.querySelector("#car-details");
  const addCarButton = document.querySelector('#addCarbtn');
  const formContainer = document.getElementById('form-container');

  addCarButton.addEventListener('click', () => {
        formContainer.style.display = "block";
});

  // adds a list of owner names who are in the parking lot
  fetch("http://localhost:3001/cars")
    .then((response) => response.json())
    .then((cars) => {
      cars.forEach((car) => {
        const li = document.createElement("li");
        li.textContent = car.ownername;
        li.addEventListener("click", (e) => {
          e.preventDefault();
       let carID = car.id;
       fetch(`http://localhost:3001/cars/${carID}`)
            .then((response) => response.json())
            .then((carData) => {
              console.log (carData)
              carDetails.innerHTML = `
                  <img src="${carData.carimage}">
                  <h2>${carData.carmodel}</h2>
                  <p>The owner number is ${carData.ownernumber} while the car number is ${carDetails.carnumber}</p>
                  <button id="Editbtn">Update</button>
                  <button id="Delbtn">Check Out</button>
                `;
            //  carsDetails.style.display = "block";
            });
        });
        carList.appendChild(li);
      });
    });

  //   addCarButton.addEventListener('click',)

  const newCarForm = document.querySelector("#new-car-form");

  newCarForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const carmodel = document.querySelector("#carmodel").value;
    const ownername = document.querySelector("#ownername").value;
    const ownernumber = document.querySelector("#ownernumber").value;
    const carimage = document.querySelector("#carimage").value;
    const carnumber = document.querySelector("#carnumber").value;
    const addCarBtn = document.getElementById("addCarbtn");
const formContainer = document.getElementById("form-container");

addCarBtn.addEventListener("click", () => {
  formContainer.style.display = "block";
});


    const newCar = { carmodel, ownername, ownernumber, carimage, carnumber };

    fetch("http://localhost:3001/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCar),
    })
      .then((response) => response.json())
      .then((car) => {
        const newCarElement = document.createElement("li");
        newCarElement.innerHTML = `
          <span>${car.carmodel} ${car.ownername} ${car.ownernumber}  ${car.carimage} ${car.carnumber}</span>
          
          <div class="car-details hidden">
            <p>: ${car.ownername}</p>
            
          </div>
        `;
        carList.appendChild(newCarElement);

        // reset the form
        newCarForm.reset();
      });
  });
});
