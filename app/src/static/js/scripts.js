//const db = require("./dbconnector");

window.onload = function() { // Execute when the page has loaded.
    var mb = document.getElementById("btn");
    mb.addEventListener("click", refresh_grafana, false);

    const arc = document.querySelector("svg path");
        const temperature = document.querySelector("#temperature");
        const range = document.querySelector("#range");
        const arc_length = arc.getTotalLength();
        const step = arc_length / (50 - 10);
        const value = (20 - 10) * step;
        arc.style.strokeDasharray = `${value} ${arc_length - value}`;
        temperature.textContent = 20 + "℃";

    fetch('http://localhost:5000/users/table')
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById('user-table-body');

            data.forEach(user => {
                console.log('creating elements');
                const row = document.createElement('tr');
                const nameCell = document.createElement('td');
                nameCell.textContent = user.name;
                const phoneNumber = document.createElement('td');
                phoneNumber.textContent = user.phonenumber;
                const minTemp = document.createElement('td');
                minTemp.textContent = user.mintemp;
                const maxTemp = document.createElement('td');
                maxTemp.textContent = user.maxtemp;

                row.appendChild(nameCell);
                row.appendChild(phoneNumber);
                row.appendChild(minTemp);
                row.appendChild(maxTemp);

                const form = document.createElement('form');
                const deleteCell = document.createElement('td');
                const div = document.createElement('div');
                const input = document.createElement('input');
                const deleteButton = document.createElement('button');
                div.class = "input";
                form.action = "/delete";
                form.method = "post";
                input.type = 'number';
                input.value = user.id;
                input.name = "idValue";
                input.hidden = true;
                deleteButton.textContent = 'Delete';
                deleteButton.className = 'btn btn-danger';
                deleteButton.type = "submit";

                div.appendChild(input);
                form.appendChild(div);
                form.appendChild(deleteButton);
                deleteCell.appendChild(form);

                row.appendChild(deleteCell); 

                tbody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });

        let isCelsius = true; // Track the temperature unit
        const temperatureValueCelsius = 20; // Initial temperature value in Celsius
        const temperatureValueFahrenheit = (temperatureValueCelsius * 9/5) + 32;

        function updateTemperature() {
            const temperatureLabel = document.getElementById('temperature');
            const minvalueLabel = document.getElementById('minvalue');
            const maxvalueLabel = document.getElementById('maxvalue');
            let temperatureValue;
            let minvalue;
            let maxvalue;
    
            if (isCelsius) {
                // Display in Celsius
                temperatureValue = temperatureValueCelsius;
                minvalue = 10;
                maxvalue = 50;
                temperatureLabel.textContent = temperatureValue + '℃';
            } else {
                // Display in Fahrenheit
                temperatureValue = temperatureValueFahrenheit;
                minvalue = (10 * 9/5) + 32; // Convert min Celsius to Fahrenheit
                maxvalue = (50 * 9/5) + 32; // Convert max Celsius to Fahrenheit
                temperatureLabel.textContent = temperatureValue + '℉';
            }
    
            // Update min and max values in the HTML
            minvalueLabel.textContent = minvalue + (isCelsius ? '℃' : '℉');
            maxvalueLabel.textContent = maxvalue + (isCelsius ? '℃' : '℉');

        }
    
        const toggleSwitch = document.getElementById('toggleSwitch');
    
        toggleSwitch.addEventListener('change', () => {
            isCelsius = !isCelsius; 
            updateTemperature(); 
        });
        
        updateTemperature();
        updateGuage();
        checkNum();
}
let iframe = "http://localhost:3000/d-solo/b239302c-3889-4b70-ba56-e47fc9afc41b/temperature?orgId=1&from=${1695832904598}&to=${1695833204598}&refresh=auto&panelId=1"
function refresh_grafana() {

    document.getElementById("iframe").src += '';
}

function checkNum() {
    const phoneNumberInput = document.getElementById('phonenum');
    const errorText = document.getElementById('errorText');

    phoneNumberInput.addEventListener('input', function () {
        const phoneNumber = phoneNumberInput.value;
        
        const numericPhoneNumber = phoneNumber.replace(/\D/g, '');

        if (/^\d{10}$/.test(numericPhoneNumber)) {
            errorText.textContent = '';
        } else {
            errorText.textContent = 'Please enter a valid 10-digit number.';
        }
        phoneNumberInput.value = numericPhoneNumber;
    });
}
var oldTemp = 0; 
async function updateGuage() {
    fetch('http://localhost:5000/temp/guage')
    .then(response => response.json())
    .then(data => {
        const newTemp = data.temperature; 
        const temperature = document.getElementById('temperature');
        if (newTemp != oldTemp) {
            temperature.textContent = newTemp; 
            console.log(newTemp + ' degrees');
            oldTemp = newTemp; 
        }
    })
    .catch(error => {   
     console.error('Error fetching temperature data:', error);
    });
}


setInterval(updateGuage, 1000);
