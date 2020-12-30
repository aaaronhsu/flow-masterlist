const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const move = urlParams.get('move')
const prop = urlParams.get('prop')

// Change to your URL (Must have Access-Control-Allow-Origin header to allow CORS)
var tsvUrl;

if (prop == "stringing") tsvUrl = "stringing.tsv";
if (prop == "staffing") tsvUrl = "staffing.tsv";
if (prop == "whipping") tsvUrl = "whipping.tsv";

function capitalize(string) {
    return string[0].toUpperCase() + string.slice(1);
}

function capitalizePhrase(string) {
	var words = string.split(' ');
	var str = '';
	for (var i = 0; i < words.length; i++) {
		str += capitalize(words[i]) + " ";
	}
	return str.slice(0, -1);
}

function lowercase(string) {
	return string[0].toLowerCase() + string.slice(1);
}

function handleTSVResult(tsvString) {
  // Get the div element to append the data to
  var dataArea = document.querySelector('#tsv_data');
  
  // Split csv to rows
  var rows = tsvString.split('\n');
  
  var htmlStr = '';
  var found = false;
  
  // Iterate over each row
  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    
    // split row to cells
    var cells = row.split('	');
    
    // Extract data from cell 1 and 2 of current row
	
	// Add extracted CSV data to string
	if (cells[0] == move) {
		
		var name = cells[0];
		var difficulty = cells[1];
		var description = cells[2];

		var tip1 = cells[3];
		var tip2 = cells[4];
		var tip3 = cells[5];
		var tip4 = cells[6];

		var video1T = cells[7];
		var video1 = cells[8];
		var video2T = cells[9];
		var video2 = cells[10];
		var video3T = cells[11];
		var video3 = cells[12];

		var move1 = cells[13];
		var move2 = cells[14];
		var move3 = cells[15];

		var demonstration = cells[16];
		
		// Move Header
		htmlStr += '<h1 class="sticky-top heading-text text-center mt-3">'
		htmlStr += capitalizePhrase(name);
		htmlStr += '</h1><div class="container-fluid">';
		htmlStr += '<h3 class="description text-center">Type: <span class="';
		htmlStr += prop;
		htmlStr += '">';
		htmlStr += capitalize(prop);
		htmlStr += '</span> | Difficulty: <span class="';
		
		if (difficulty == "1" || difficulty == "2") htmlStr += "easy";
		else if (difficulty == "3" || difficulty == "4") htmlStr += "medium";
		else if (difficulty == "5" || difficulty == "6") htmlStr += "hard";
		else if (difficulty == "7" || difficulty == "8") htmlStr += "expert";
		else if (difficulty == "9" || difficulty == "10") htmlStr += "god";
		
		htmlStr += '">';
		htmlStr += capitalize(difficulty);
		htmlStr += '</span></h3></div><div class="row my-5"><div class="col-sm-7">';

		// Description
		htmlStr +='<div class="container-fluid text-center">';
		if (demonstration.charAt(0) == "h") {
			htmlStr += '<iframe class="img-fluid mx-auto d-block mb-3 video" src="';
			htmlStr += demonstration;
			htmlStr += '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
		}
		else {
			htmlStr += '<img class="img-fluid mx-auto d-block mb-3 video" src="../images/noVideo.jpg">';
		}
		htmlStr += '<h3 class="description text-center">';
		htmlStr += description;
		htmlStr += '</h3></div></div><div class="col-sm-4"><div class="row">';

		// Tips
		htmlStr += '<div class="col-sm"><center><h3 class="list-head">Tips</h3><li class="list-unstyled list-text">';
		if (tip1 != '') {
			htmlStr += '<ul>- ' + tip1 + '</ul>';

			if (tip2 != '') {
				htmlStr += '<ul>- ' + tip2 + '</ul>';

				if (tip3 != '') {
					htmlStr += '<ul>- ' + tip3 + '</ul>';

					if (tip4 != '') {
						htmlStr += '<ul>- ' + tip4 + '</ul>';
					}
				}
			}
		}
		else {
			htmlStr += '<ul> There are no tips here yet :(';
		}
		htmlStr += '</li></center></div></div><div class="row">';


		// Videos
		htmlStr += '<div class="col-sm"><center><h3 class="list-head">Videos</h3><li class="list-unstyled list-text">';
		if (video1T != '') {
			htmlStr += '<ul>- <a class="' + prop + '" href="' + video1 + '" target="_blank">' + video1T + '</a></ul>';

			if (video2T != '') {
				htmlStr += '<ul>- <a class="' + prop + '" href="' + video2 + '" target="_blank">' + video2T + '</a></ul>';

				if (video3T != '') {
					htmlStr += '<ul>- <a class="' + prop + '" href="' + video3 + '" target="_blank">' + video3T + '</a></ul>';
				}
			}
		}
		else {
			htmlStr += '<ul> There are no videos here yet :(';
		}
		htmlStr += '</li></center></div></div></div></div><hr class="white-60"></hr><br>';

		// Related Moves
		if (move1 != '') {
			htmlStr += '<div class="container-fluid"><h3 class="heading-text text-center">Related Moves</h3><div class="container-fluid pb-3"><div class="row">';
			htmlStr += '<div class="col-sm" onclick="window.location=\'';
			htmlStr += '?move=' + move1 + '&prop=' + prop + '\';">';
			htmlStr += '<center class="other-moves rounded py-3 pointer"><a class="' + prop + '">';
			htmlStr += move1;
			htmlStr += '</a></center></div>';

			if (move2 != '') {
				htmlStr += '<div class="col-sm" onclick="window.location=\'';
				htmlStr += '?move=' + move2 + '&prop=' + prop + '\';">';
				htmlStr += '<center class="other-moves rounded py-3 pointer"><a class="' + prop + '">';
				htmlStr += move2;
				htmlStr += '</a></center></div>';

				if (move3 != '') {
					htmlStr += '<div class="col-sm" onclick="window.location=\'';
					htmlStr += '?move=' + move3 + '&prop=' + prop + '\';">';
					htmlStr += '<center class="other-moves rounded py-3 pointer"><a class="' + prop + '">';
					htmlStr += move3;
					htmlStr += '</a></center></div>';
				}
			}
		}
		htmlStr += '</div></div></div>';
		
		found = true;
		break;
	}
  }

  if (!found) {
	htmlStr += '<h1 class="sticky-top heading-text text-center mt-3">'
	htmlStr += 'No Move Here :('
	htmlStr += '</h1><div class="container-fluid">';
	htmlStr += '<h3 class="description text-center">'
	htmlStr += 'If you think this is a mistake, please let Aaron know. Unfortunately, it probably is a mistake.';
	htmlStr += '</h3>';
  }
  
  // Set the string generated from CSV as HTML of the dedicated div
  dataArea.innerHTML = htmlStr;
}

// Init Ajax Object
var ajax = new XMLHttpRequest();

// Set a GET request to the URL which points to your CSV file
ajax.open('GET', tsvUrl);

// Set the action that will take place once the browser receives your CSV
ajax.onreadystatechange = function() {
  if (ajax.readyState === XMLHttpRequest.DONE && ajax.status === 200) {
    // Request was successful
    var tsvData = ajax.responseText;

    // Do something with that data here
    handleTSVResult(tsvData);
  }
}

// Send request
ajax.send();