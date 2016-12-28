console.log('sanity check!');



$(document).ready(function() {

    $('#more').click(function() {
        // $(this).hide();
        $("#mySidenav").addClass('sidenav-open');
    })

    $('.closebtn').click(function() {
        // $('#more').show();
        $("#mySidenav").removeClass('sidenav-open');
    })


});
