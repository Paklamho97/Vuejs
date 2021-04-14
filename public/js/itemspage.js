let listing = document.querySelector('#listing');
let tb = document.querySelector('#textbox');
b1.onchange = handler

function handler(event){
    let b = event.toString();
    listing.innerHTML = b;


}
