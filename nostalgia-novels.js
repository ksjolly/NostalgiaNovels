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

  const val1 = Math.floor(Math.random() * 15);
  const val2 = (val1 + 1) % 15;
  const val3 = (val2 + 1) % 15;
  const val4 = (val3 + 1) % 15;
  const val5 = (val4 + 1) % 15;
  

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
        <div class = "card"> <a href="${books[val1].amazon_product_url}" target="_blank"> <img class="dogimage" src="${books[val1].book_image}"> </a> <div class = "container"> <h3 class = "h3-title"> ${books[val1].title} </h3>  <h5> ${books[val1].author} </h5> <p class = "cardp"> ${books[val1].description} </p> </div> </div>
        <div class = "card"> <a href="${books[val2].amazon_product_url}" target="_blank"> <img class="dogimage" src="${books[val2].book_image}"> </a> <div class = "container"> <h3 class = "h3-title"> ${books[val2].title} </h3> <h5> ${books[val2].author} </h5> <p class = "cardp"> ${books[val2].description} </p> </div> </div>
        <div class = "card"> <a href="${books[val3].amazon_product_url}" target="_blank"> <img class="dogimage" src="${books[val3].book_image}"> </a><div class = "container"> <h3 class = "h3-title"> ${books[val3].title} </h3> <h5> ${books[val3].author} </h5> <p class = "cardp"> ${books[val3].description} </p> </div> </div>
        <div class = "card"> <a href="${books[val4].amazon_product_url}" target="_blank"> <img class="dogimage" src="${books[val4].book_image}"> </a><div class = "container"> <h3 class = "h3-title"> ${books[val4].title} </h3>  <h5> ${books[val4].author} </h5> <p class = "cardp"> ${books[val4].description} </p></div></div>
        <div class = "card"> <a href="${books[val5].amazon_product_url}" target="_blank"> <img class="dogimage" src="${books[val5].book_image}"> </a><div class = "container"> <h3 class = "h3-title"> ${books[val5].title} </h3> <h5> ${books[val5].author} </h5> <p class = "cardp"> ${books[val5].description} </p></div></div> 
        </div> </section>`
    });
});


