

function APIRequest(){
    let request = new XMLHttpRequest();
    var loc= getLocation();    
    request.open("GET", `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${loc}?unitGroup=metric&key=CW895JQUE2AA76MT29TE9CEEU&contentType=json`);
    request.send();
    var details;
    request.onload = () =>{
        console.log(request);
        if (request.status === 200){
            console.log("Fetch was successful!!");
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
    toSet[0].innerHTML= `Set Location: ${address.toUpperCase()}`;
}
function setAlerts(alerts){
    toSet = document.getElementsByClassName("alerts");
    if (alerts!=""){
        toSet[0].innerHTML= `Alerts: ${alerts}`;
    }
    else{
        toSet[0].innerHTML= `There are No Active Alerts for this Location`;
    }
}
function setTemp(temp){
    toSet = document.getElementsByClassName("temp");
    toSet[0].innerHTML= `Temp: ${temp}`;
}
function setfeelslike(feelslike){
    toSet = document.getElementsByClassName("feelslike");
    toSet[0].innerHTML= `Feelslike: ${feelslike}`;
}


