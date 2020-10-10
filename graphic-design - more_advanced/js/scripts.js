$('.form-floating-label input, .form-floating-label textarea').focusin(function(){
  $(this).parent().addClass('has-value');
});

$('.form-floating-label input, .form-floating-label textarea').blur(function(){
  if(!$(this).val().length > 0) {
    $(this).parent().removeClass('has-value');
  }
})

//function that take only numbers
function isInputNumber(evt) {
  var ch = String.fromCharCode(evt.which);
  if (!(/[0-9]/.test(ch))) {
      evt.preventDefault();
  }
}


$(document).ready(function() {
  // Declare Variables
  var econd = null; //email condition
  var tcond = null; //text condition
  var cond = null; //general condition
  var pcond = null; //phone condition

  // function 1: for email validation
  function validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  }
  // ******
  // function 2 : continuing validation of email "Interacting with the user"
  function finalEmailValidation() {
      var result = $("#e");
      var emaill = $("#email").val();

      if (validateEmail(emaill)) {
          $("#email").css("borderColor", "green");
          result.text("");
          econd = 1;
          return true;
      } else {
          if (emaill) {
              econd = 0;
              return false;
          }
      }
  }

  $("#email").blur(function() {
      var result = $("#e");

      if (finalEmailValidation() == false) {
          result.text("This email is not valid!");
          result.css("color", "red");
          $("#email").css("borderColor", "red");
          econd = 0;
      }
  });


  // *****************************************************************************
  // function 3 : Prevent entering numbers in text fields
  /*$(".text").blur(function() {
      var num = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      var textValue = $(this).val();
      var $id = $(this).attr("id");
      var feedback = $("h" + $id);
      tcond = 1;
      feedback.text("");

      for (var j = 0; j < textValue.length; j++) {
          for (var k = 0; k < 10; k++) {
              if (textValue[j] == num[k] || textValue[j] == 0 && textValue[j] != " ") {
                  tcond = 0;
                  feedback.text("This input is not valid! Hint: Remove any numbers.");
                  feedback.css("color", "red");
                  $(this).css("borderColor", "red");
                  break;
              }
          }
      }

      if (tcond == 1) {
        $(this).css("borderColor", "green");
    }

  });
  */
  //===============================================================================================================

  //function 4 : to validate the phone number
  function validatePhone() {
      var content = $("#number").val();
      if (content != "" && (content.length < 11 || content.length > 11 || content[0] != 0 || content[1] != 1)){
        pcond = 0;
        return false;}
      else return true;
  }

  //*****************************************************************************
  //function 4 : A way to make sure there are no empty input fields and interacting with the user
  $(':input').on('input', function() {
      cond = 1;
      var $id = $(this).attr("id");
      var phFeed = $("#hnumber");  //feedback to the user under the phone no input field

      if (finalEmailValidation() && $id == "email")
          $(this).css("borderColor", "green");

      else if (($id == "fname" || $id == "university" || $id == "faculty" || $id == "department"))
          $(this).css("borderColor", "green");

      else if ($id == "year")
          $(this).css("borderColor", "green");

      else if ($id == "number" && validatePhone()) {
          $(this).css("borderColor", "green");
          phFeed.text("");
          pcond = 1;
      }

      bttnAvailable();
      return false;
  });

    // if there is an empty input field after clicking on it and leaving it,then a msg "You Must Fill This Info" will appear below that input field 
    // also to warn the user if the phone no isnt correct
  $(":input").blur(function() {
      var content = $(this).val();
      var $id = $(this).attr("id");
      var phFeed = $("#hnumber");

      if (!content) {
          cond = 0
          $(this).css("borderColor", "red");
          $(this).attr("placeholder", "You Must Fill This Info");
          if ($id == "number") phFeed.text("");
      }

      if ($id == "number" && !validatePhone()) {
          phFeed.text("This Phone Number is Not Valid !");
          phFeed.css("color", "red");
          $(this).css("borderColor", "red");
          pcond = 0;
          cond = 0
      }

      bttnAvailable();
      return false;
    });
  
  //===============================================================
  $('select').blur(bttnAvailable);
  //===============================================================

  //function 6 IT is Time to submit that button,right? :/ 
  function bttnAvailable() {
    var finalCond = 0;   //to count the filled input fields
    var noAlert = null;  //to store the value of each warning "if it exists"
    var inputs = 0; //to count all input fileds

    //checking that all input fields are filled
    $(":input:not(button)").each(function () {
        if (!$(this).val()) finalCond = 0;
        else finalCond++;
        inputs++;
    });

    //checking that there are no warnings
    $("h6").each(function() {
        noAlert = $(this).val();
        if (noAlert != "") finalCond = 0;
    });

    // console.log(finalCond+" Email "+econd+" text "+tcond+" normal cond "+cond);

    //checking that all inputs are filled , email & phone no are available & no numbers in text fields.. then making btn available  
    if (finalCond == inputs && econd == 1 && cond == 1 && pcond == 1) {
        $(".johayna").attr("disabled", false);
        $(".johayna").css("cursor", "pointer");
    } 
    else {
        $(".johayna").attr("disabled", true);
        $(".johayna").css("cursor", "not-allowed");
    }
 }  
});

