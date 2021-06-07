window.addEventListener('load',()=>{
        current()
        forecast()
        sunset()
        tides()
        rainForecast()
})    

function current(){
    let temperature_degree = document.querySelector(".temperature-degree");
    let location_timezone = document.querySelector(".location-timezone")
    let temperature_description = document.querySelector(".temperature-description")
    let windDir = document.querySelector(".windDir");
    let windKPH = document.querySelector(".windKPH");
    let iconI =document.querySelector(".icon");
    let longLongBeach =170.66708658194227
    let latLongBeach =-45.76215944760145
    //this is proxy for local  important(if it doesn't work refresh the proxy)
    //const proxy = 'https://cors-anywhere.herokuapp.com/';
    const api = `http://api.weatherapi.com/v1/current.json?key=398c896f724743ebaa723704211505&q=${latLongBeach},${longLongBeach}`; 
    // const api ="http://api.openweathermap.org/data/2.5/weather?lat=-45.7512639511625&lon=170.64543794371073&appid=dd587bab833b756ed9a69d4b922f0747";
    fetch(api)
    .then(res=>{
        return res.json();
    })
    .then(data=>{
        console.log("data test")
        console.log(data);
        //get data what we need
        const {temp_c,wind_dir,wind_kph} = data.current;   
        const {text,icon} = data.current.condition;
        const {name} = data.location;     
        temperature_degree.textContent = temp_c;   
        location_timezone.textContent = name;   
        location_timezone.textContent = "Long Beach";  
        temperature_description.textContent = `Description: ${text}`;
        iconI.src = icon;
        windDir.textContent = `${wind_dir}`;
        windKPH.textContent = `${wind_kph} kph`;
        })
}


function sunset(){
   //A variable for todays date
   let currentDate =  new Date().toISOString().slice(0, 10)

   console.log("current date is :"+currentDate);//Logging todays date for testing
   fetch(`http://api.weatherapi.com/v1/astronomy.json?key=398c896f724743ebaa723704211505&q=dunedin&dt=${currentDate}`)//fetching data for todays date
   .then(res => {
       return res.json();
   })
   .then(data1 => {
       console.log("this is sunset ");
       console.log(data1); //Writes the sunset data to the html element with the "sunset" id.
       document.getElementById("sunset").innerHTML = "Sunset: " + data1.astronomy.astro.sunset;      
   })
}
 

//forecast + date function
function forecast(){
    //prebuilt JavaScript function
    let date = new Date();
    //console log date
    console.log(date)
    //convert format for div using prebuilt date functions
    document.querySelector(".dateDiv").innerHTML = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear();
    //convert prebuilt JavaScript function integers to Weekdays
    let weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    weekday[7] = "Sunday";
    weekday[8] = "Monday";
    weekday[9] = "Tuesday";
    weekday[10] = "Wednesday";
    weekday[11] = "Thursday";
    weekday[12] = "Friday";
    //forecast fetch api
fetch("https://api.openweathermap.org/data/2.5/onecall?lat=-45.76&lon=170.66&exclude=minutely,hourly,alerts&appid=090efffe1f5ac8ffdaeb3fa9cd5cb5a5")  
.then(response => {
    return response.json();
})
.then(data=>{
    //object title
    console.log('WeatherForecastData');
    //console all fetch data
    console.log(data);
    //daily min and max constants
    let day1max = data.daily[0].temp.max;
    let day1min = data.daily[0].temp.min;
    let day2max = data.daily[1].temp.max;
    let day2min = data.daily[1].temp.min;
    let day3max = data.daily[2].temp.max;
    let day3min = data.daily[2].temp.min;
    let day4max = data.daily[3].temp.max;
    let day4min = data.daily[3].temp.min;
    let day5max = data.daily[4].temp.max;
    let day5min = data.daily[4].temp.min;
    let day6max = data.daily[5].temp.max;
    let day6min = data.daily[5].temp.min;
    let day7max = data.daily[6].temp.max;
    let day7min = data.daily[6].temp.min;
    //convert Kelvin to Celsius
    let celsiusConvert = 273.15; 
    //select divs to input information
    document.querySelector(".dayOne").innerHTML = "Today: max " + (Math.floor(day1max-celsiusConvert)) + " min " + (Math.floor(day1min-celsiusConvert));
    document.querySelector(".dayTwo").innerHTML = "Tomorrow: max " + (Math.floor(day2max-celsiusConvert)) + " min " + (Math.floor(day2min-celsiusConvert));
    document.querySelector(".dayThree").innerHTML = weekday[date.getDay()+2] + ": max " + (Math.floor(day3max-celsiusConvert)) + " min " + (Math.floor(day3min-celsiusConvert));
    document.querySelector(".dayFour").innerHTML = weekday[date.getDay()+3] + ": max " + (Math.floor(day4max-celsiusConvert)) + " min " + (Math.floor(day4min-celsiusConvert));
    document.querySelector(".dayFive").innerHTML = weekday[date.getDay()+4] + ": max " + (Math.floor(day5max-celsiusConvert)) + " min " + (Math.floor(day5min-celsiusConvert));
    document.querySelector(".daySix").innerHTML = weekday[date.getDay()+5] + ": max " + (Math.floor(day6max-celsiusConvert)) + " min " + (Math.floor(day6min-celsiusConvert))
    document.querySelector(".daySeven").innerHTML = weekday[date.getDay()+6] + ": max " + (Math.floor(day7max-celsiusConvert)) + " min " + (Math.floor(day7min-celsiusConvert));
    //wind forecast - direction/speed
    //assign wind speed for each day
    let day1windSpeed = data.daily[0].wind_gust;
    let day2windSpeed = data.daily[1].wind_gust;
    let day3windSpeed = data.daily[2].wind_gust;
    let day4windSpeed = data.daily[3].wind_gust;  
    let day5windSpeed = data.daily[4].wind_gust;
    let day6windSpeed = data.daily[5].wind_gust;
    let day7windSpeed = data.daily[6].wind_gust;
    //wind direct array and convert to string direction
    let windDirArray = []; 
    for (let i = 0; i<7; i++)
    {
        let deg = data.daily[i].wind_deg;
        if (deg>348.75 && deg<=11.25){
            deg = "N";
        }else if (deg>11.25 && deg<=33.75){
            deg = "NNE";
        }else if (deg>56.25 && deg<=78.75){
            deg = "NE";
        }else if (deg>78.75 && deg<=101.25){
            deg ="E";
        }else if (deg>101.25 && deg<=123.75){
            deg ="ESE";
        }else if (deg>123.75 && deg<=146.25){
            deg ="SE";
        }else if (deg>146.25 && deg<=168.75){
            deg = "SSE";
        }else if (deg>168.75 && deg<=191.25){
            deg ="S";
        }else if (deg>191.25 && deg<=213.75){
            deg ="SSW";
        }else if (deg>213.75 && deg<=236.25){
            deg ="SW";
        }else if (deg>236.25 && deg<=258.75){
            deg ="WSW";
        }else if (deg>258.75 && deg<=281.25){
            deg ="W";
        }else if (deg>281.25 && deg<=303.75){
            deg ="WNW";
        }else if (deg>303.75 && deg<=326.25){
            deg ="NW";
        }else {
            deg ="NNW";
        }
        windDirArray.push(deg);
    }
    //assign wind direction to each day
    console.log("Wind7Days");
    console.log(windDirArray);
    let day1windDir = windDirArray[0];
    let day2windDir = windDirArray[1];
    let day3windDir = windDirArray[2];
    let day4windDir = windDirArray[3];  
    let day5windDir = windDirArray[4];
    let day6windDir = windDirArray[5];
    let day7windDir = windDirArray[6];
    //convert from miles to kph
    let kphConvert = 1.609;
    //insert both data sets into each day div
    document.querySelector(".dayOneWind").innerHTML = "Today: " + (Math.floor(day1windSpeed*kphConvert)) + "kph " + day1windDir;
    document.querySelector(".dayTwoWind").innerHTML = "Tomorrow: " + (Math.floor(day2windSpeed*kphConvert)) + "kph " + day2windDir;;
    document.querySelector(".dayThreeWind").innerHTML = weekday[date.getDay()+2] + ": " + (Math.floor(day3windSpeed*kphConvert)) + "kph " + day3windDir;
    document.querySelector(".dayFourWind").innerHTML = weekday[date.getDay()+3] + ": " + (Math.floor(day4windSpeed*kphConvert)) + "kph " + day4windDir;
    document.querySelector(".dayFiveWind").innerHTML = weekday[date.getDay()+4] + ": " + (Math.floor(day5windSpeed*kphConvert)) + "kph " + day5windDir;
    document.querySelector(".daySixWind").innerHTML = weekday[date.getDay()+5] + ": " + (Math.floor(day6windSpeed*kphConvert)) + "kph " + day6windDir;
    document.querySelector(".daySevenWind").innerHTML = weekday[date.getDay()+6] + ": " + (Math.floor(day7windSpeed*kphConvert)) + "kph " + day7windDir;;
});
}
//Tides API
function tides(){
    let currentDate =  new Date().toISOString().slice(0, 10)

    fetch(`https://api.niwa.co.nz/tides/data?lat=-45.75267922950535&long=%20170.6485988707358&numberOfDays=7&startDate=${currentDate}&datum=LAT&apikey=tPRtQsDJgAIGkPvOXaoiRMkU0hXqH3hN`)
    .then(res => {
        return res.json()})
    .then(data=>{
        console.log('Tide data');
        convert(data)//Passes Tides API data to the convert method
    })
    
    function convert(data){

        let newFormatDate = [];
        console.log(data);

        let  weekday= new Array(7)
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
        let tide=data.values;

        let fullFormatDateAndTime = data.values[2].time; //Full date and time format form API.
        let tideValue= data.values[2].value; //reading the tide value from api
        let tideValue1= data.values[3].value; 
        let tideValue2= data.values[4].value; 
        let tideValue3= data.values[5].value; 
        let fullFormatdate = fullFormatDateAndTime.slice(0, 10);//Slices the date section from the full date and time format.
        let fullFormatTime = formatTime(fullFormatDateAndTime);//Slices the time section form the full date and time format.

        newFormatDate[1] = fullFormatdate.slice(5, 7)//Slices the month from the date section and puts it into a array
        newFormatDate[2] = fullFormatdate.slice(8, 10)//Slices the day from the date section and puts into array

        let newDate = (`${newFormatDate[2]}-${newFormatDate[1]}`)//Switches the month and day around and put into the 'newDate' variable
        let fullFormatTime1= formatTime(data.values[3].time);
        let fullFormatTime2= formatTime(data.values[4].time);
        let fullFormatTime3= formatTime(data.values[5].time);

        displayData(newDate, fullFormatTime,fullFormatTime1,fullFormatTime2,fullFormatTime3,tideValue,tideValue1,tideValue2,tideValue3)//Passes the new date and time variables to the display method
    }

    function formatTime(fullFormatDateAndTime) {
        return fullFormatDateAndTime.slice(11, 16);
    }

    function displayData(newDate, fullFormatTime,fullFormatTime1,fullFormatTime2,fullFormatTime3,tideValue,tideValue1,tideValue2,tideValue3){
        let tides = document.querySelector(".tides")
        for (let i=2; i<6;i++)
        {
            let p = document.createElement("p")
        //if there are rain
        if(tide[i].newDate && tide[i].fullFormatTime && tide[i].tideValue)     
        {   if(i===0)
            {           
                p.textContent= `Date: ${newDate} \n Time: ${fullFormatTime} AM Tide: ${tideValue}m \n`;
            }         
            else{
                p.textContent= `${weekday[((date.getDay()+i)%7)]} Date: ${newDate} \n Time: ${fullFormatTime} AM Tide: ${tideValue}m \n`;
            }           
        }  
            let h1T = document.createElement('h3')
            h1T.innerText += (`Date: ${newDate} \n Time: ${fullFormatTime} AM Tide: ${tideValue}m \n`)
            // h1T.innerText += (`Date: ${newDate} \n\n Time: ${fullFormatTime} AM Tide: ${tideValue}m 
            //                 \n Time: ${fullFormatTime1}AM Tide: ${tideValue1}m
            //                 \n Time: ${fullFormatTime2}PM Tide: ${tideValue2}m 
            //                 \n Time: ${fullFormatTime3}PM Tide: ${tideValue3}m`)

        tides.appendChild(h1T);

        }
       
        
    }
}


//Rain chance forecast + date function

function rainForecast(){
   
 //forecast fetch api
//  let key =db043626f7788c90f0f6b25051eead4f
fetch("https://api.openweathermap.org/data/2.5/onecall?lat=-45.76&lon=170.66&exclude=minutely,hourly,alerts&appid=db043626f7788c90f0f6b25051eead4f")  
.then(response => {
    return response.json();
})
.then(data=>{

    rainChance(data)
    console.log("Rian forecast"); 
    console.log(data);   
});
}
//create a week array
let rainChance=(data)=>{
    let date = new Date();
    let  weekday= new Array(7)
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    let daily = data.daily;
    let rainForecast = document.querySelector(".Rain-forecast")
    
    for(let i =0 ; i < daily.length; i++)
    {  
        let rainBox=document.createElement("div")
        let p = document.createElement("p")
        //if there are rain
        if(daily[i].rain)     
        {   if(i===0)
            {           
                p.textContent= `Today chance of rain is ${daily[i].rain*100}%`;
            }         
            else{
                p.textContent= `${weekday[((date.getDay()+i)%7)]} chance of rain is ${daily[i].rain*100}%`;
            }           
        }  
        //if there are no rian     
        if(!daily[i].rain)  
        {         
            if(i===0)
            {           
                p.textContent= "Today no rain";
            } 
            else{
                p.textContent=`${weekday[((date.getDay()+i)%7)]} no rain`;
            }         
        }
        rainBox.appendChild(p)
        rainForecast.appendChild(rainBox)
    }
}


