$("document").ready(function() {

});

function loadData() {
    let $address = $('#address');
    let street = $('#street').val();
    let city = $('#city').val();
    let address = `${street},${city}`;

    $address.text("Address: " + address + "");
    console.log(`${address}`);
    let streetViewURL = `http://maps.googleapis.com/maps/api/streetview?size=600x400&location=${address}`;

    $('#photo').attr("src", streetViewURL);

    return false;
};

$('#form-container').submit(loadData);

// const fetch = require('node-fetch');
// let url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Vict&types=geocode&language=fr&key=AIzaSyAwSPV4foS-hiuzLV-vPLArQMBWHUJDhdU&sessiontoken=1234567890'
// const key = 'AIzaSyAwSPV4foS-hiuzLV-vPLArQMBWHUJDhdU&sessiontoken=1234567890'
// url += key
// let places=[];
// let dataNow = Date();

//         fetch(url)  
//         .then(res => res.json())
//         .then(json => {for (let i=0; i<2; i++) {
//             places.push(json.predictions[i].description);}
//             //return places;
//             console.log(places);
//             console.log(dataNow);
//         });
    