// create api-key.js file with const API_KEY="your_api_key" in this same directory to use
const BASE_URL = 'https://api.nytimes.com/svc/books/v3/lists/'
//const BASE_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
const API_KEY = 'CzgFs866JsEt87jzvQ5K7IgbR7TrLAqR';


const formEl = document.getElementById('best-books-form');
const yearEl = document.getElementById('year');
//const monthEl = document.getElementById('month');
//const dateEl = document.getElementById('date');
const bookEl = document.getElementById('books-container');
const notice = document.getElementById("maintenance-notice");

setTimeout(function(){
    notice.style.display = 'none';
},5000);

class MonthAndDay {
  constructor(month, day) {
    this.month = month;
    this.day = day;
  }

  getMonth() {
    return this.month;
  }

  getDay() {
    return this.day;
  }

  setMonth() {
    // return random month value up to 12
    this.month = Math.floor(Math.random() * (12) + 1 );
  }

  setDay() {
      // return random month value up to 28 (inclusive)
      this.day =  Math.floor(Math.random() * (28) + 1);
  }

}

function checkValidity() {
  console.log('we got here');
	var year_input = document.querySelector("#year");
	
	if (!(year_input > 2008 && year_input < 2023)) {
		year_input.setCustomValidity("Enter a value between 2009 and 2022");
	} else {
		year_input.setCustomValidity(""); // be sure to leave this empty!
		alert("Correct!");
	}
}
formEl.addEventListener('submit', function (e) {
  e.preventDefault();

  let monthandday = new MonthAndDay(0,0);
  monthandday.setMonth();
  monthandday.setDay();
  console.log(monthandday.getMonth());
  console.log(monthandday.getDay());
  const year = yearEl.value;
  let month = monthandday.getMonth();
  let date = monthandday.getDay();

  if(month.toString().length == 1)
  {
    month = "0" + month.toString();
    console.log('The month is ', month);
  }

  if(date.toString().length == 1)
  {
    date = "0" + date.toString();
    console.log('The date is ', date);
  }


  console.log('the year is ', year);

  // Fetch bestselling books for date and add top 5 to page
  const url = `${BASE_URL}${year}-${month}-${date}/hardcover-fiction.json?api-key=${API_KEY}`;
  console.log('the url is as follows');
  console.log(url);
  fetch(url)
    .then(function (data) {
      return data.json();
    })
    .then(function (responseJson) {
      console.log(responseJson);

      let book = responseJson.results.books[0].title;
      let books = responseJson.results.books;
      console.log(books);
      console.log(book);
      return books;
    })
    .then(function(books) {
      //console.log('did we get here', book);
      bookEl.innerHTML 
        = `<section> <div class = "flex-container">
        <div class = "card"> <a href="${books[0].amazon_product_url}" target="_blank"> <img class="dogimage" src="${books[0].book_image}"> </a> <div class = "container"> <h3 class = "h3-title"> ${books[0].title} </h3>  <h5> ${books[0].author} </h5> <p class = "cardp"> ${books[0].description} </p> </div> </div>
        <div class = "card"> <a href="${books[1].amazon_product_url}" target="_blank"> <img class="dogimage" src="${books[1].book_image}"> </a> <div class = "container"> <h3 class = "h3-title"> ${books[1].title} </h3> <h5> ${books[1].author} </h5> <p class = "cardp"> ${books[1].description} </p> </div> </div>
        <div class = "card"> <a href="${books[2].amazon_product_url}" target="_blank"> <img class="dogimage" src="${books[2].book_image}"> </a><div class = "container"> <h3 class = "h3-title"> ${books[2].title} </h3> <h5> ${books[2].author} </h5> <p class = "cardp"> ${books[2].description} </p> </div> </div>
        <div class = "card"> <a href="${books[3].amazon_product_url}" target="_blank"> <img class="dogimage" src="${books[3].book_image}"> </a><div class = "container"> <h3 class = "h3-title"> ${books[3].title} </h3>  <h5> ${books[3].author} </h5> <p class = "cardp"> ${books[3].description} </p></div></div>
        <div class = "card"> <a href="${books[4].amazon_product_url}" target="_blank"> <img class="dogimage" src="${books[4].book_image}"> </a><div class = "container"> <h3 class = "h3-title"> ${books[4].title} </h3> <h5> ${books[4].author} </h5> <p class = "cardp"> ${books[4].description} </p></div></div> 
        </div> </section>`
    });
});


