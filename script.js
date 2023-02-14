if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', { scope: '/' });
}

anime({
    targets: '.line-logo .lines path',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 1500,
    delay: function (el, i) { return i * 250 },
    direction: 'alternate',
    loop: true
});


//za loading strelicu staviti settimeout funkciju, 3000 oznacuje 3 sekunde za loadanje
setTimeout(() => {
    document.querySelector('.loading').style.display = 'none';
}, 3000)


/**Modal */

var modal = document.getElementById('modal');
var button = document.getElementById('button');
var span = document.getElementsByClassName('close-modal')[0];

//Pokaži modal kada korisnik klikne na 'not you?'
button.onclick = function () {
    modal.style.display = 'block'
}

span.onclick = function () {
    modal.style.display = 'none'

}
//kad korisnik klikne na bilo koji dio ekrana da se isto prozor zatvori
window.onclick = function (event) {
    if (event.target == modal) { //event je događaj, event.target je referenca je na sami objekt, događaj moze biti onclick ili mouse over itd
        // console.log(event.target); Referenca na objekt
        modal.style.display = 'none';
    }

}

/*
 * FOOTER
 */

//da se sama godina ažurira svake godine
const year = new Date().getFullYear();
document.getElementById('year').innerText = year;

/*
 * GREETING
 */

const greeting = document.getElementById('greeting');
const hour = new Date().getHours();
// console.log(hour); da vidimo koliko je sati

const welcomeTypes = ['Good Morning!', 'Good Afternoon!', 'Good Evening!'];

let welcomeText = '';
if (hour < 12) {
    welcomeText = welcomeTypes[0];
} else if (hour < 18) {
    welcomeText = welcomeTypes[1];
} else {
    welcomeText = welcomeTypes[2];
}

greeting.innerHTML = `${welcomeText}`

/*
* DATE
*/
const options = { weekday: 'long', month: 'long', day: 'numeric' }
let date = new Date();
document.getElementById('date').innerHTML = date.toLocaleDateString('en-US', options);

/*
* SET USER'S NAME
*/

function setUser() {
    let name = document.getElementById('name').value;
    localStorage.setItem('user', name);
    let modal = document.getElementById('modal');
    modal.style.display = 'none';
}

(function showUser() {
    let user = localStorage.getItem('user');
    document.getElementById('user').innerText = `${!user ? 'Hey there stranger' : user}`;
})();

/*
 * TO DO lista
 */
//create <span> add class ='close' to each <span>
const myNodeList = document.getElementsByTagName('li');
var i;
for (i = 0; i < myNodeList.length; i++) {
    const span = document.createElement('span');
    const text = document.createTextNode('\u00D7');
    span.className = 'close';
    span.appendChild(text);
    myNodeList[i].appendChild(span);
}

// Get each <span> with class = 'close', add event listener on them, once they are being clicked, remove them from DOM
const close = document.getElementsByClassName('close');
var i;
for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        const div = this.parentElement;
        div.remove();
    }
}

// Add a 'checkmark' next to each task and strikethrough each of them

const list = document.getElementById('list');
list.addEventListener('click', (event) => {
    if (event.target.tagName == 'LI') { //tagname vraća velika slova zato je LI 
        event.target.classList.toggle('checked');
        if (document.querySelector('li').classList.contains('checked')) {
            const audio = new Audio('assets/audio/ping.mp3');
            audio.play();
        }

    }
})

//TODO: Add an event listener that will listen for 'enter' key - to add a task

function newTask() {
    const li = document.createElement('li'); //kreiramo varijablu koja ce kreirati list item
    let inputValue = document.getElementById('inputField').value; //dohvatit cemo element inputField odnosno vrijednost koju je korisnik upisao
    const task = document.createTextNode(inputValue); //svaki put kad korisnik unese vrijednost unutar samog input fielda i submita ga, napravit cemo list item s vrijednosti koju je korisnik upisao
    const error = document.getElementById('error')
    li.appendChild(task);

    if (inputValue === '' || inputValue === 'John') {
        error.style.display = 'inline';
        setTimeout(function () {
            error.style.display = 'none';
        }, 3000)
    } else {
        document.getElementById('list').appendChild(li);
    }

    document.getElementById('inputField').value = ''; //kada se doda novi item u listu input field je ponovo prazan

    const span = document.createElement('span');
    const txt = document.createTextNode('\u00D7');

    span.className = 'close';
    span.appendChild(txt);
    li.appendChild(span);

    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            const div = this.parentElement;
            div.remove();
        }
    }
}

//enter 
const input = document.getElementById('inputField');
input.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('add').click();
    }
})

function share() {
    const ul = document.getElementById('list');
    const listItems = document.getElementsByTagName('li');
    let objects = {};

    for (i = 0; i <= listItems.length - 1; i++) {
        objects[i] = { task: listItems[i].firstChild.nodeValue }

    }

    (async () => {
        const response = await fetch('https://63de3f163d94d02c0ba7d44f.mockapi.io/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objects)
        })
        return console.log(response.json());
    })()
}

