// Favoritos Card

$(document).ready(function () {
    $('.fa-heart').click(function () {
        $(this).toggleClass('fav');
    })
});


var lastScrollTop = 0;

$(window).scroll(function (event) {

    var st = $(this).scrollTop();

    if (st < 100) {
        $("#btnTop").removeClass('active');
    } else {
        if (st > lastScrollTop) {
            $("#btnTop").removeClass('active');
        } else {
            $("#btnTop").addClass('active');
        }
    }

    lastScrollTop = st;

});


// Scroll to bottom on document ready
$(document).ready(function () {
    $("html, body").animate({
        scrollTop: $(document).height()
    }, 200);
    return false;
});


// Smooth scroll
$(document).ready(function () {
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        var target = this.hash,
            $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 200, function () {
            window.location.hash = target;
        });
    });
});
