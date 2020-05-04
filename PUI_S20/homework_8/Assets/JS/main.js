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