document.addEventListener("DOMContentLoaded", () => {
  const carList = document.querySelector("#car-list");
  const carDetails = document.querySelector("#car-details");
  const addCarButton = document.querySelector("#addCarbtn");
  const formContainer = document.getElementById("form-container");
  addCarButton.addEventListener("click", () => {
    formContainer.style.display = "block";
  });
  
  // adds a list of owner names who are in the parking lot
  fetch("http://localhost:3000/cars")
    .then((response) => response.json())
    .then((cars) => {
      cars.forEach((car) => {
        const li = document.createElement("li");
        li.textContent = car.ownername;
        li.addEventListener("click", (e) => {
          e.preventDefault();
          let carID = car.id;
          fetch(`http://localhost:3000/cars/${carID}`)
            .then((response) => response.json())
            .then((carData) => {
              console.log(carData);
              carDetails.innerHTML = `
                  <img src="${carData.carimage}">
                  <h2>${carData.carmodel}</h2>
                  <p>The owner number is ${carData.ownernumber} while the car number is ${carData.carnumber}</p>
                  <button id="Editbtn">Update</button>
                  <button id="Delbtn">Check Out</button>
              `;
              const editBtn = document.querySelector("#Editbtn");
              const delBtn = document.querySelector("#Delbtn");
              editBtn.addEventListener("click", () => {
                const updatedCar = {
                  carmodel: "updated car model",
                  ownername: "updated owner name",
                  ownernumber: "updated owner number",
                  carimage: "updated car image",
                  carnumber: "updated car number"
                };
                fetch(`http://localhost:3000/cars/${carID}`, {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(updatedCar),
                })
                  .then((response) => response.json())
                  .then((updatedData) => {
                    console.log(updatedData);
                  });
              });
              delBtn.addEventListener("click", () => {
                fetch(`http://localhost:3000/cars/${carID}`, {
                  method: "DELETE",
                })
                  .then((response) => response.json())
                  .then((deletedData) => {
                    console.log(deletedData);
                  });
              });
            });
        });
        carList.appendChild(li);
      });
    });

  const newCarForm = document.querySelector("#new-car-form");
  newCarForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const carmodel = document.querySelector("#carmodel").value;
    const ownername = document.querySelector("#ownername").value;
    const ownernumber = document.querySelector("#ownernumber").value;
    const carimage = document.querySelector("#carimage").value;
    const carnumber = document.querySelector("#carnumber").value;
    const newCar = { carmodel, ownername, ownernumber, carimage, carnumber };
    fetch("http://localhost:3000/cars", {
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
          <span>${car.carmodel}</span>
          `;
          carList.appendChild(newCarElement);
          newCarForm.reset();
          formContainer.style.display = "none";
        });
    });
  });
  
  
  
  
  
  