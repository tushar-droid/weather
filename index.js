window.onload= function()
{
    var input = document.getElementById("loc");
    input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
    event.preventDefault();
    APIRequest();
  }
});
}



function APIRequest(){
    let request = new XMLHttpRequest();
    var loc= getLocation();    
    request.open("GET", `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${loc}?unitGroup=metric&key=CW895JQUE2AA76MT29TE9CEEU&contentType=json`);
    request.send();
    var details;
    request.onload = () =>{
        if (request.status === 200){
            details = JSON.parse(request.response);  
        } 
        else{
            console.log('error ${request.status} ${request.statusText}');
        }
        address= details.address;
        alerts= details.alerts;
        temp= details.currentConditions.temp;
        feelslike= details.currentConditions.feelslike;
        setLocation(address);
        setAlerts(alerts);
        setTemp(temp);
        setfeelslike(feelslike);
    };
}

function getLocation(){
    return document.getElementById("loc").value;
}


function setLocation(address){
    toSet = document.getElementsByClassName("location");
    toSet[0].innerHTML= `<b>Set Location :</b>\u00A0\u00A0\u00A0\u00A0${address.toUpperCase()}`;
}
function setAlerts(alerts){
    toSet = document.getElementsByClassName("alerts");
    if (alerts!=""){
        console.log(alerts);
        toSet[0].style.color="red";
        toSet[0].innerHTML= `<b>Alerts :</b>\u00A0\u00A0\u00A0\u00A0${alerts[0]['event']}\u00A0!!!`;
    }
    else{
        toSet[0].style.color="black";
        toSet[0].innerHTML= `<b>There are No Active Alerts for this Location</b>`;
    }
}
function setTemp(temp){
    toSet = document.getElementsByClassName("temp");
    toSet[0].innerHTML= `<b>Temp :</b>\u00A0\u00A0\u00A0\u00A0${temp}`;
}
function setfeelslike(feelslike){
    toSet = document.getElementsByClassName("feelslike");
    toSet[0].innerHTML= `<b>Feelslike :</b>\u00A0\u00A0\u00A0\u00A0${feelslike}`;
}


