document.addEventListener('DOMContentLoaded', function() {
  var cards = document.querySelectorAll('.card');
  cards.forEach(function(card) {
    card.style.cursor = 'pointer';
    card.addEventListener('click', function() {
      window.location.href = 'chi_tiet_san.html';
    });
  });
});