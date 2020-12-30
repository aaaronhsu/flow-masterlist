const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// Change to your URL (Must have Access-Control-Allow-Origin header to allow CORS)
var tsvUrl;

function handleTSVResult(tsvString) {
  // Get the div element to append the data to
  var dataArea = document.querySelector('#move_list');
  
  // Split csv to rows
  var rows = tsvString.split('\n');
  
  var htmlStr = '';

  var prop = "stringing";

  var unorganizedData = [];
  
  // Iterate over each row
  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    
    // split row to cells
    var cells = row.split('	');
    
    // create holder string

    var holderString = '';
	
	
    var move = cells[0];

    if (move == "staffing") prop = "staffing";
    else if (move == "whipping") prop = "whipping";
    else {
      holderString += '<li class="list-group-item pointer" onclick="window.location=\'';
      holderString += '../moves/moves.html?';
      holderString += 'move=' + move;
      holderString += '&prop=' + prop;
      holderString += '\';"><h3 class="item ' + prop + '"';
      holderString += 'href="#">';
      holderString += move + '</h3></li>';
    }

    unorganizedData.push([move, holderString]);
  }
  
  unorganizedData.sort((a, b) => a[1].localeCompare(b[1]));

  for (var i = 0; i < unorganizedData.length; i++) {
    htmlStr += unorganizedData[i][1];
  }
  
  // Set the string generated from CSV as HTML of the dedicated div
  dataArea.innerHTML = htmlStr;
}

// Init Ajax Object
var ajax = new XMLHttpRequest();

tsvUrl = "../moves/moves.tsv";
// Set a GET request to the URL which points to your CSV file
ajax.open('GET', tsvUrl);

// Set the action that will take place once the browser receives your CSV
ajax.onreadystatechange = function() {
  if (ajax.readyState === XMLHttpRequest.DONE && ajax.status === 200) {
    // Request was successful
    var csvData = ajax.responseText;

    // Do something with that data here
    handleTSVResult(csvData);
  }
}

// Send request
ajax.send();

function filterSearch() {
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('search-bar');
  filter = input.value.toUpperCase();
  ul = document.getElementById("moves list-group");
  li = ul.getElementsByTagName('li');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
  a = li[i].getElementsByTagName("h3")[0];
  txtValue = a.textContent || a.innerText;
  if (txtValue.toUpperCase().indexOf(filter) > -1) {
    li[i].style.display = "";
  } else {
    li[i].style.display = "none";
  }
  }
}