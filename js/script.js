const search = document.querySelector('.search-container');
const gallery = document.getElementById('gallery');


fetch('https://randomuser.me/api/?results=12&nat=gb,us')
.then(response => response.json())
.then(data => generateGallery(data.results))
//.then(data => generateModal(data.results))
fetch('https://randomuser.me/api/?results=12&nat=gb,us')
.then(response => response.json())
//.then(data => generateSearch(data.results))
.then(data => console.log(data.results));


function generateGallery(data){
    const html = data.map(item => `
    <div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${item.picture.medium}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${item.name.first} ${item.name.last}</h3>
            <p class="card-text">${item.email}</p>
            <p class="card-text cap">${item.location.city}, ${item.location.state}</p>
        </div>
    </div>
    `).join(''); 
    gallery.innerHTML = html;
}

function generateModal(data){
    const html = data.map(item => `
        <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${item.picture.large}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${item.name.first} ${item.name.last}</h3>
                    <p class="modal-text">${item.email}</p>
                    <p class="modal-text cap">${item.location.city}</p>
                    <hr>
                    <p class="modal-text">${item.cell}</p>
                    <p class="modal-text">${item.location.street}, ${item.location.city}, ${item.location.state} ${item.location.postcode}</p>
                    <p class="modal-text">Birthday: ${item.dob.date}</p>
                </div>
            </div>
            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div> 
    `).join(''); 
    gallery.innerHTML = html;
}

function generateSearch(data){
    const html = `
        <form action="#" method="get">
            <input type="search" id="search-input" class="search-input" placeholder="Search...">
            <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
        </form> 
    `; 
    search.innerHTML = html;
}

