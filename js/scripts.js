$( function() {

	var $window = $( window ),
		//wave vars
		$waveGroup = $( '.wave-group' ),
		waveGroupHeight = $waveGroup.height(),
		$waveBackground = $( '.wave-background' ),
        $waveMiddleground = $( '.wave-middleground' ),
        $waveForeground = $( '.wave-foreground' ),
		$waveBackgroundBlock = $( '.wave-background-block' ),
        $waveMiddlegroundBlock = $( '.wave-middleground-block' ),
        $waveForegroundBlock = $( '.wave-foreground-block' ),
        backgroundBgPosition = $waveBackground.css( 'background-position-y' ),
        middlegroundBgPosition = $waveMiddleground.css( 'background-position-y' ),
        foregroundBgPosition = $waveForeground.css( 'background-position-y' );
		backgroundBlockTop = $waveBackgroundBlock.css( 'top' ),
        middlegroundBlockTop = $waveMiddlegroundBlock.css( 'top' ),
        foregroundBlockTop = $waveForegroundBlock.css( 'top' ),
        //sticky nav vars
        $navUl = $( 'nav ul' ),
        $navItems = $( 'nav ul li a' ),
        isNavDisplayed = true;

	//*********** WAVE PARALLAX **********//
	$( 'div[data-type="background"]' ).each( function(){
        var $bgobj = $( this ); // assigning the object
     
        $window.scroll( function() {
            var yPos = -( $window.scrollTop() / $bgobj.data( 'speed' ) ); 

	        //move each wave block based on the parallax movement of the background
	        if ( $bgobj.attr('class') === 'wave-background' ) {

	        	parallaxWave( yPos, $waveBackgroundBlock, $waveBackground, backgroundBgPosition, backgroundBlockTop );

        	} else if ( $bgobj.attr('class') === 'wave-middleground' ) {

				parallaxWave( yPos, $waveMiddlegroundBlock, $waveMiddleground, middlegroundBgPosition, middlegroundBlockTop );

        	} else if ( $bgobj.attr('class') === 'wave-foreground' ) {

				parallaxWave( yPos, $waveForegroundBlock, $waveForeground, foregroundBgPosition, foregroundBlockTop );
	            $waveGroup.height( waveGroupHeight + yPos );

        	}

        }); 
    });

	var parallaxWave = function( yPos, blockEl, waveEl, bgPosition, blockTop ) {
		var yPosUpdate = parseInt( bgPosition, 10) + yPos,
	        coords = '50% '+ yPosUpdate + 'px',
	        updateBlockTop = parseInt( blockTop, 10 ) + yPos,
	        borderTop = -yPos + 'px solid transparent';
	 
	        // Move the background
	        waveEl.css({ backgroundPosition: coords });
	 
	        // Move the block & add a border on top so full background img is visible
	        blockEl.css( 'top', updateBlockTop );
	}

	//*********** NAV DISPLAY **********//
	if ( $window.height() > 670 ) {
		$( 'nav' ).hide();
		isNavDisplayed = false;
	}


	//*********** HEADER STICKINESS **********//
	var navStickiness = function() {
		var winScrollTop = $(window).scrollTop(),
			offsetTriggerTitle = 153;
		
		if( offsetTriggerTitle <= winScrollTop ){
			if ( !$navUl.hasClass( 'sticky-nav' ) ) {				
				$navUl.addClass( 'sticky-nav' ).stop().animate( { 'top': '0' }, 1000 );
				//animating css to stop - see: http://stackoverflow.com/questions/12238016/how-to-stop-a-jquery-ui-addclass-removeclass	
			}
		}
		else {
			$navUl.stop().css( 'top', '' ).removeClass( 'sticky-nav' );
		}
	};

	//*********** NAV CLICK **********//
	//for all nav handling first check if it is displayed
	if ( isNavDisplayed ) {
		$navItems.on( 'click', function( evt ) {
			console.log('clicke');

			evt.preventDefault();

			var id = $(this).attr('id');

			if ( id === 'home' ) {
				$window.scrollTop( 0 );
			} else if ( id === 'about' ) {
				$window.scrollTop( 155 );
			} else if ( id === 'work' ) {
				$window.scrollTop( 238 );
			} else if ( id === 'contact' ) {
				$window.scrollTop( 760 );
			}
		});

		$window.scroll( function() {
			console.log( $window.scrollTop());
			navStickiness();
		});
	}//end check if nav is displayed

});