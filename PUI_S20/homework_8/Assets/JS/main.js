//js file for homepage

//smooth scrolling function
//taken from w3schools
$(document).ready(function() {
    // Add smooth scrolling to all links in navbar
    $(".navbar a, #scrollDown").on('click', function(event) {
        //make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            //prevent default anchor click behavior
            event.preventDefault();
            //store hash
            var hash = this.hash;
            
            //using jQuery's animate() method to add smooth page scroll
            //option number 900 specifies the number of ms it takes to scroll to target area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 900, function() {
                //add hash to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        }
    });
})


/* Anime.js */
// Wrap every letter in a span
var textWrapper = document.querySelector('.ml11 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml11 .line',
    scaleY: [0,1],
    opacity: [0.5,1],
    easing: "easeOutExpo",
    duration: 700
  })
  .add({
    targets: '.ml11 .line',
    translateX: [0, document.querySelector('.ml11 .letters').getBoundingClientRect().width + 10],
    easing: "easeOutExpo",
    duration: 700,
    delay: 100
  }).add({
    targets: '.ml11 .letter',
    opacity: [0,1],
    easing: "easeOutExpo",
    duration: 600,
    offset: '-=775',
    delay: (el, i) => 34 * (i+1)
  }).add({
    targets: '.ml11',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });

/* END */