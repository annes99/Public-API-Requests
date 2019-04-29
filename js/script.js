// creating a <div> element for modal window and insert it after <div> with id="gallery"
const $modal = $('<div></div>').insertAfter('#gallery').attr('id', 'modal');
// counting click's of modal window prev/next button
let count = 1;

/**** Fetch Data From API ****/

// function to fetch data, check status response and extract json data
function getData(url) {
    return fetch(url)
        .then(status)
        .then(json)
        .catch(function (error) {
            console.log('Request failed', error);
        });
}

// getting json data of 12 random users from API and then iterate over the data to dynamically add them to index.html
getData('https://randomuser.me/api/?results=12&nat=gb,us,au,ca,nz&noinfo')
    .then(data => data.results.forEach(result => {

        $('#gallery').append(`
        <div class="card" id="${result.dob.date}">
            <div class="card-img-container">
                <img class="card-img" src="${result.picture.medium}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${result.name.first} ${result.name.last}</h3>
                <p class="card-text">${result.email}</p>
                <p class="card-text cap">${result.location.city}</p>
            </div>
        </div>
    `);

        $modal.append(`
        <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${result.picture.large}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${result.name.first} ${result.name.last}</h3>
                    <p class="modal-text">${result.email}</p>
                    <p class="modal-text cap">${result.location.city}</p>
                    <hr>
                    <p class="modal-text">${result.cell}</p>
                    <p class="modal-text-street">${result.location.street}, ${result.location.city}, ${result.location.state} ${result.location.postcode}</p>
                    <p class="modal-text">Birthday: ${formatDate(result.dob.date)}</p>
                </div>
            </div>  
            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div>
    `);
        // at first hide modal window elements, so they won't show when page first loads
        $('.modal-container').hide();

        $('.search-container').html(`
        <form action="#" method="get">
            <input name="q" type="search" id="search-input" class="search-input" placeholder="Search...">
            <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
        </form> 
    `);
    }));

/**** CLICK EVENTS ***/

// if card element is clicked, get the index and show modal window element with same index
$(document).on('click', '.card', function (event) {
    event.preventDefault();
    let $index = $(event.currentTarget).index();
    $('#modal').children().eq($index).show();
});

// if modal window next button is clicked, add 1 to click count 
// and show modal window element with same index (index = count)
$(document).on('click', '#modal-next', (event) => {
    event.preventDefault();
    count++;
    if (count > 12) {
        count = 1;
    }
    $('.modal-container').hide();
    $(`.modal-container:nth-child(${count})`).show();
});

// if modal window prev button is clicked, subtract 1 from click count 
// and show modal window element with same index (index = count)
$(document).on('click', '#modal-prev', (event) => {
    count--;
    if (count < 1) {
        count = 12;
    }
    $('.modal-container').hide();
    $(`.modal-container:nth-child(${count})`).show();

});

// when 'X' is clicked on modal window, hide it
$(document).on('click', '#modal-close-btn', () => $('.modal-container').hide());

// on submit, get the search input from user
// find a match for search input in card div's whith it's index
// if there's a match show that gallery element, if not alert a message 
$(document).on('submit', function (event) {
    event.preventDefault();
    const $searchValue = $('#search-input').val().toLowerCase();

    let $value = $('#gallery').find(`.card:contains(${$searchValue})`).index();
    if ($value >= 0) {
        $('#gallery').children().hide();
        $('#gallery').children().eq($value).show();
    } else if ($value < 0) {
        alert(`No mach for ${$searchValue}`);
        $('#gallery').children().show();
    }

});

/**** HELPER FUNCTIONS  ****/

// format date from json object yyyy-mm-ddThh:mm:ssZ to dd/mm/yyyy
function formatDate(date) {
    const input = new Date(date);
    const day = input.getDate();
    const month = input.getMonth() + 1;
    const year = input.getFullYear();
    // if day or month value is less than 10 add 0 in front
    return `${day <= 9 ? '0' + day : day}/${month <= 9 ? '0' + month : month}/${year}`;
}
// if server response status is 200 - 299 it's succsess
// else show error message with status code
function status(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}
// extract json from response
function json(response) {
    return response.json();
}