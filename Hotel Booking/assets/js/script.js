// const password = document.getElementById('password');
// const form = document.getElementById('login_form');
// const error1 = document.getElementById('error_msg1');
// const error2 = document.getElementById('error_msg2');



// function myFunction() {

//     var email = document.getElementById("email").value;


//     var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;



//     if (reg.test(email) == false) {
//         document.getElementById("error_msg1").style.color = "red";
//         document.getElementById("error_msg1").innerHTML = "Invalid EMail id!";
//         // alert('Invalid Email Address ->'+email);
//         return false;
//     }
//     else {
//         document.getElementById("error_msg1").style.color = "DarkGreen";
//         document.getElementById("error_msg1").innerHTML = "Valid Email!";
//     }

//     return true;
// }




// form.addEventListener('submit', (e) => {


//     if (password.value.length < 6) {
//         error2.innerText = 'Password must contains atleast 8 characters';
//     }
//     else {
//         document.getElementById("error_msg2").style.color = "DarkGreen";
//         document.getElementById("error_msg2").innerHTML = "Valid password!";
//     }

//     e.preventDefault();


// })







document.getElementById("login_form").addEventListener('submit', function(e) {

    e.preventDefault();

    document.getElementById("error_msg1").style.display = "none";
    document.getElementById("error_msg2").style.display = "none";
    document.getElementById("successMessage").style.display = "none";
   

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    let isValid = true;

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (!emailRegex.test(email)) {
        document.getElementById("error_msg1").style.display = "block";
        isValid = false;
      }

      // Validate password
      if (password.length < 6) {
        document.getElementById("error_msg2").style.display = "block";
     
        isValid = false;
      }

     
      if (isValid) {
        document.getElementById("successMessage").style.display = "block";
      }
    });



