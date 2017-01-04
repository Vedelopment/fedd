console.log('sanity check!');

$(document).ready(function() {

    // OPEN HAMBURGER MENU
    $('#more').click(function() {
        $("#mySidenav").addClass('sidenav-open');
    })

    // CLOSE HAMBURGER MENU
    $('.closebtn').click(function() {
        $("#mySidenav").removeClass('sidenav-open');
    })

});
