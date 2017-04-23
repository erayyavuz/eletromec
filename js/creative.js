
setTimeout(function() {
    "use strict"; // start of use strict

    $('.banner-buttons ul li').on('click', function(){
        // get the actual banner on the page
        var currentImage = $(this).attr('data-banner');
        // set default path to images
        var path = 'img/banners/';
        // transiction effect when change the image
        $('#banner').fadeOut(function(){
            $(this).attr('src', path + currentImage + '.jpg');
            $(this).fadeIn();
        });
        // remove the style of current active item
        removeActiveItens();
        // add the active style for the element selected
        $(this).addClass('active');
    });

    function removeActiveItens() {
        $('.banner-buttons ul li').each(function(){
            $(this).removeClass('active');
        });
    }
}, 0);