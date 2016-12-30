console.log('sanity check!');



$(document).ready(function() {

    $('#restaurantSearch').click(function(event) {
      event.preventDefault();
      console.log('restaurant search submitted');
      var vegetarianBox = $("#cbox1").is(':checked');
      var veganBox = $("#cbox2").is(':checked');
      var glutenFreeBox = $("#cbox3").is(':checked');
      var dairyFreeBox = $("#cbox4").is(':checked');
      var kosherBox = $("#cbox5").is(':checked');
      var nutAllergyBox = $("#cbox6").is(':checked');
      console.log(vegetarianBox);
      console.log(veganBox);
      console.log(glutenFreeBox);
      console.log(dairyFreeBox);
      console.log(kosherBox);
      console.log(nutAllergyBox);
    });

});
