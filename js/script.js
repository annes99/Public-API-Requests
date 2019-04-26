const search = document.querySelector('.search-container');
const gallery = document.querySelector('#gallery');
let modal = document.createElement('div');
const script = document.body.querySelector('script');
document.body.insertBefore(modal, script);
modal.setAttribute('class', 'modal-container');
$('.modal-container').hide();


/*** Fetch Data From API ***/

$.ajax({
    url: 'https://randomuser.me/api/?results=12&nat=gb,us,au,nz,de',
    dataType: 'json',
    success: function (data) {
        generateGallery(data.results);
        generateModal(data.results);
        //generateSearch(data.results); //still needs to be done
    }
});
 
function generateGallery(data){
    gallery.innerHTML = data.map(item => `
        <div class="card" id="${item.dob.date}">
            <div class="card-img-container">
                <img class="card-img" src="${item.picture.medium}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${item.name.first} ${item.name.last}</h3>
                <p class="card-text">${item.email}</p>
                <p class="card-text cap">${item.location.city}</p>
            </div>
        </div>
    `).join(''); 
}


function generateModal(data){

    // click on card => show modal
    $('.card').on('click', function (event) {
    
        console.log(data);

        const result = data.filter(function (entry) { return entry.dob.date === $(event.target).attr('id'); });
        const profileData = result[0];
    
        createModalHTML(profileData);

        $('.modal-container').show();

        /* click events for modal window next prev buttons

        $('#modal-next').on('click', () =>{
            console.log('modal NEXT clicked');
            createModalHTML(data[5]);
            $('#modal-close-btn').on('click', () =>$('.modal-container').hide());
            });

        $('#modal-prev').on('click', () =>{
            console.log('modal PREV clicked');
            createModalHTML(data[3]);
            //$('.modal-container').hide();
            $('#modal-close-btn').on('click', () =>$('.modal-container').hide());
        });
        */

        // closing hide modal window
        $('#modal-close-btn').on('click', () =>$('.modal-container').hide());
    });
    
}

// function to add modal window to index.html dynamically
function createModalHTML (input) {
    modal.innerHTML = `
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${input.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${input.name.first} ${input.name.last}</h3>
                <p class="modal-text">${input.email}</p>
                <p class="modal-text cap">${input.location.city}</p>
                <hr>
                <p class="modal-text">${input.phone}</p>
                <p class="modal-text-street">${input.location.street}, ${input.location.city}, ${input.location.state} ${input.location.postcode}</p>
                <p class="modal-text">Birthday: ${formatDate(input.dob.date)}</p>
            </div>
        </div>
    `;
}

/***  Searchbar Functionality  (still needs to be done)***/

// add searchbar
/*
function generateSearch(data){
    search.innerHTML  = `
        <form action="#" method="get">
            <input type="search" id="search-input" class="search-input" placeholder="Search...">
            <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
        </form> 
    `; 
}
*/

/*** Helper Functions  ***/

// format date from yyyy-mm-ddThh:mm:ssZ => dd/mm/yyyy
function formatDate(date) {
    const input = new Date(date);
    const day = input.getDate();
    const month = input.getMonth() + 1;
    const year = input.getFullYear();
    return `${day <= 9 ? '0' + day : day}/${month<=9 ? '0' + month : month}/${year}`;
}
