"use strict";

var calculatorDsiplay = null;

// Add a listener to DOM load.
document.addEventListener("DOMContentLoaded", function () {
    console.log("JS loaded");

    calculatorDsiplay = document.getElementById('value');
    // From nodelist to an array.
    var divs = [].slice.call(document.getElementsByTagName('div'), 0);
    divs.forEach(function (div) {
        // console.log(div);
        if (div.id === '')
            div.addEventListener('click', function (div) {
                onKeyClick(this.innerHTML);
            });
    });
});

function onKeyClick(value) {
    // console.log(value);
    calculatorDsiplay.innerHTML += value;
}