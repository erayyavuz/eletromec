
setTimeout(function() {
    "use strict"; // start of use strict

    $(document).on('click', '.banner-buttons ul li', function(){
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

	// Events to enabled or disabled the dropdown button
	$('#product-button').mouseenter(function(){
		$(this).addClass("btn-selected");
	}).mouseleave(function(){
		if( $($('.dropdown-menu')[0]).is(':visible') === false ){
			$('#product-button').removeClass('btn-selected');
		}
	});

	$($('.dropdown-menu')[0]).mouseleave(function(){
		$('#product-button').removeClass('btn-selected');
	});    
}, 0);
