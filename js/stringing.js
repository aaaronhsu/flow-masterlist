const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// Change to your URL (Must have Access-Control-Allow-Origin header to allow CORS)
var tsvUrl;

function handleTSVResult(tsvString) {
  // Get the div element to append the data to
  var dataArea = document.querySelector('#tip_list');
  
  // Split csv to rows
  var rows = tsvString.split('\n');
  
  var htmlStr = '';
  
  // Iterate over each row
  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    
    // split row to cells
    var cells = row.split('	');
    
    // Extract data from cell 1 and 2 of current row
	
	
  var level = cells[0];
  
  htmlStr += '<hr>'
	
	htmlStr += '<h3 class="list-header ml-5 stringing">General Tips for ' + level + ' stringers</h3>';

	  for (var a = 1; a < cells.length; a++) {
	  	if (cells[a] == '') break;

      htmlStr += '<ul class="list-info">– ' + cells[a] + '</ul>';
      htmlStr += '<br>'
	  }
    
  }
  
  htmlStr += '<hr>';
  
  // Set the string generated from CSV as HTML of the dedicated div
  dataArea.innerHTML = htmlStr;
}

// Init Ajax Object
var ajax = new XMLHttpRequest();

tsvUrl = "../stringing/stringingTips.tsv";
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