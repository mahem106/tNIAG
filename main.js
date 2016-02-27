'use strict'

document.addEventListener('DOMContentLoaded', init);

var starRow;
var controller;
var total = 0;
//var totalCleared = 46;
//var numsCleared = [];

function init() {
  createBoard();

  $('#restart').click(restart);
  $('#check').click(checkNum);
  $('#tries').click(tries);
  $('#numbers').on('click', '.number', clickNumber);
}
function createBoard() {
  var prevAmtStars = controller;
	controller = Math.floor((Math.random() * 9) + 1);
  // Prevents repeated numbers of stars
  if(controller === prevAmtStars) {
    controller = Math.floor((Math.random() * 9) + 1);
  }

	var cont = document.getElementById('stars');
		if(starRow !== undefined) {
			while (cont.firstChild) {
  		cont.removeChild(cont.firstChild);
			};
		}

	starRow = document.createElement('table');
  starRow.setAttribute("cellspacing", 2);
  starRow.setAttribute('class', 'starRow');

	var stars = document.createElement('tr');
	starRow.appendChild(stars);

	for (var i = 0; i < controller; i++) {
    var cell = document.createElement('td');
    var star = document.createElement('img');
    star.setAttribute('src', 'numbers/star.gif');
    star.setAttribute('height', 120);
    star.setAttribute('width', 120);
    cell.setAttribute("id", 'star');
    cell.appendChild(star);
		stars.appendChild(cell);
  }
  cont.appendChild(starRow);
}

function clickNumber(event) {
	event.stopPropagation();
	var $this = $(this);
	var wasSelected = $this.hasClass('selected');

	if(!wasSelected) {
		$this.addClass('selected');
    total += parseInt($this.text());
	} else {
    $this.removeClass('selected');
    total -= parseInt($this.text());
  }
}

function restart() {
  createBoard();
  $('.tries').text('5');
  if($('.number').hasClass('used')) {
  $('.number').removeClass('used');
  }
}

function checkNum() {
  if(total === controller) {
    $('#stars').addClass('animated bounce');
    setTimeout(function() {
        $('#stars').removeClass('animated bounce');
    }, 1000);
    $('.selected').addClass('animated fadeOut');
    setTimeout(function() {
        $('.fadeOut').removeClass('animated fadeOut')
        $('.selected').addClass('used');
    }, 1001);
    //checkForLose();
    total = 0;
    setTimeout(function() {
      $('.selected').removeClass('selected');
      checkForWin();
      createBoard();
    }, 1150);

  } else {
    $('.selected').removeClass('selected');
    $('#stars').addClass('animated headShake');
    setTimeout(function() {
        $('#stars').removeClass('animated headShake');
    }, 1000);
    total = 0;

  }
}

function checkForWin() {
  console.log('checking for win');
  console.log($('.used').length);
  if($('.used').length === 10) {
    alert('You win! Very impressive!!')
  } //else {
  //
  // }
}
// Not implemented yet...
// function checkForLose() {
//   totalCleared -= total;
//   var triesLeft = $('.tries').text();
//   console.log('totalCleared: ', totalCleared);
//   console.log('triesLeft: ', triesLeft);
//   console.log('controller: ', controller);
//   if(totalCleared < controller && triesLeft === '0') {
//     alert('No more moves, click Restart to play again.')
//   }
// }

function tries() {
  var triesLeft = $('.tries').text();
  if(triesLeft === '0') {
    return;
  } else {
  createBoard();
  console.log('total: ', total);
  $('.tries').text(triesLeft - 1);
  }
}
