function showPosition(position) 
{
    let apiKey = "44283735812afd1f31a23ba0d72b42f9"; //00357676d8a58f27db3f03db83abf955
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    new Promise(
        (myResolve) => {
            makeRequest(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`, myResolve);
        }
    ).then(
        (value) => {    console.log("inside parentPromise:" +value);   }
    );
}

function showCityName(city) 
{
    let apiKey = "00357676d8a58f27db3f03db83abf955"; //00357676d8a58f27db3f03db83abf955
    new Promise(
        (myResolve) => {
            makeRequest(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`, myResolve);
        }
    ).then(
        (value) => {    console.log("inside parentPromise:" +value);   }
    );
}

function makeRequest(apiCall, myResolve)
{
    apiCall += "&units=" + $("input[name=unit]:checked", '#allUnits').val();//The jquery syntax gives us the value of the selected radio button
    console.log(apiCall);
    $.ajax(
        {
            url: apiCall,
            method: 'GET',
            success: (response) => {
                console.log(response);
                document.getElementById("temperature").innerHTML = `${(response.main.temp).toFixed(1)}`;
                document.getElementById("icon").innerHTML = `${response.weather[0].description}`;
                myResolve(response.name);
            },
            error: (response) => {
                if(response.responseJSON.message === "city not found")
                    alert(response.responseJSON.message);
                else
                    alert("Could not get the temp right now. Try again later");
            },  
        }
    );
} 

function getTemp(element) 
{
    //alert(element);
    if(element.value == "cur_loc") {
        const position = {
            coords: {
                latitude: 28.7041,
                longitude: 77.1025
            }
        }
        showPosition(position);
    } else {
        alert(element.value);
        showCityName(element.value);
    }
}

function changeUnit(unit)
{
    let tempdiv = document.getElementById("temperature");
    let temp = tempdiv.innerHTML;
    if(temp == "")
        return;
    else {
        if(unit.value == "metric") //means we have to convert to celcius
            tempdiv.innerHTML = ((temp - 32) * (5/9)).toFixed(1);
        else //means we have to convert to fahrenheit
            tempdiv.innerHTML = ((temp * (9/5)) + 32).toFixed(1);
    }
}