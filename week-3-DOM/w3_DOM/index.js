let c = 0;
function callback() {
    document.querySelectorAll("h2")[1].innerHTML = c;
    c += 1;
}

setInterval(callback, 1000);