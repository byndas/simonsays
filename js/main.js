var pc = [], user = [], level = 0, index = 0, audio = [ '#a0', '#a1', '#a2', '#a3' ];

document.onselectstart = new Function("return false");

document.ondragstart = new Function("return false");

$( document ).ready( function page() {


  function sound() { // on-click, sounds btn & toggles blackout

    $( '#pad1' ).click( function pad1() {

      $( '#a0' ).trigger( 'play' );

      $( '#pad1' ).addClass( 'blackout' );

      setTimeout( function blackout1() {

        $( '#pad1' ).removeClass( 'blackout' )

      }, 500 );

    } ); // closes pad1()

    $( '#pad2' ).click( function pad2() {

      $( '#a1' ).trigger( 'play' );

      $( '#pad2' ).addClass( 'blackout' );

      setTimeout( function blackout2() {

        $( '#pad2' ).removeClass( 'blackout' )

      }, 500 );

    } ); // closes pad2()

    $( '#pad3' ).click( function pad3() {

      $( '#a2' ).trigger( 'play' );

      $( '#pad3' ).addClass( 'blackout' );

      setTimeout( function blackout3() {

        $( '#pad3' ).removeClass( 'blackout' )

      }, 500 );

    } );  // closes pad3()

    $( '#pad4' ).click( function pad4() {

      $( '#a3' ).trigger( 'play' );

      $( '#pad4' ).addClass( 'blackout' );

      setTimeout( function blackout4() {

        $( '#pad4' ).removeClass( 'blackout' )

      }, 500 );

    } ); // closes pad4()

  }; // closes sound()


  function checkLevel() { // covers all levels and final victory

    $( 'pad' ).addClass( 'freeze' );

    if ( level === 20 ) {

      $( '#aWin' ).trigger( 'play' );

      $('#levels').html( 'WON!' );

      setTimeout( function won() {

        $( 'start' ).trigger( 'click' );

      }, 5000 );


    }

    else if ( pc.length > -1 ) { pcTurn(); }

  }; // closes checkLevel()


  function pcTurn() { // pushes random pad to pc[], starts next level & replay() after 750ms

    pc.push( '#pad' + ( Math.floor( Math.random() * 4 ) + 1 ) );

    level++;

    $( '#levels' ).html( level );

    setTimeout( replay, 1000 );

  }; // closes pcTurn()


  function replay() { // replays entire pc[] at 1 second intervals, then clears user[] & starts UserInput()

    $( 'pad' ).addClass( 'freeze' );

    for ( var i = 0; i < pc.length; i++ ) {

      ( function iife( i ) { // Instantly Instatiated Functional Expression (IIFE)

        window.setTimeout( function window() {

          $( audio[ pc[ i ].substring( 4 ) - 1 ] ).trigger( 'play' );

          $( pc[ i ] ).addClass( 'blackout' );

          setTimeout( function blackoutPcI() {

            $( pc[ i ] ).removeClass( 'blackout' )

          }, 500 );

        }, i * 1000 ); // closes window.setTimeout()

      } ( i ) ); // closes iife()

      setTimeout( function userLength() {

        user.length = 0;

        index = 0;

      }, 1 + ( 750 * i ) );

    }; // closes for-loop

    userInput();

    setTimeout( function freezeBtn() {

      $( 'pad' ).removeClass( 'freeze' )

    }, ( 1001 * pc.length ) );

  }; // closes replay()


  function userInput() { // compares user[index] & pc[index] on each user click

    $( 'pad' ).off( 'click' ); // detaches past click-handler

    sound(); // re-connects sound

    $( 'pad' ).on( 'click', function userClick() { // on user-click...

      user.push( '#' + this.id ); // pushes #pad to user[]

      if ( JSON.stringify( user ) !== JSON.stringify( pc ) ) {

        if ( user[ index ] !== pc[ index ] ) {
          // replay() clears index

          wrongMove();

        } // closes inner-if

        else {

          index++;

          userInput();

        }  // closes else

      } // closes outer-if

      else {

        checkLevel();

      } // closes else

    } ); // closes userClick()

  }; // closes userInput()


  function wrongMove() { // re-starts level or game

    $( 'pad' ).addClass( 'freeze' );

    $( '#aLose' ).trigger( 'play' );

    if ( $( 'strict' ).hasClass( 'strictModeOn' ) ) {

      pc.length = 0;

      user.length = 0;

      setTimeout( function clickStart() {

        $( 'start' ).trigger( 'click' );

      }, 1000 );

    } // closes if

    else {

      user.length = 0;

      setTimeout( replay, 1500 );

    }

  }; // closes wrongMove()


  $( 'strict' ).click( function strictMode() {

    $( 'strict' ).toggleClass( 'strictModeOn' );

  } );  // closes strictMode()


  sound();

  $( 'start' ).click( function startGame() {

    $( 'pad' ).removeClass( 'blackout' );

    level = 0;

    user.length = 0; // clears user[]

    pc.length = 0; // clears pc[]

    checkLevel(); // starts first level

  } );  // closes startGame()


} ); // closes page()
