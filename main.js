let currentImage = null;
document.addEventListener('DOMContentLoaded', function () {
    console.log("helloo")
    var registerData = document.getElementById('register')
    console.log(registerData, "rr")
    if (registerData) {
        registerData.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log("jjj")
            var name = document.getElementById('name').value
            var email = document.getElementById('email').value
            var password = document.getElementById('password').value
            console.log(name, email, password)
      const users = JSON.parse(localStorage.getItem("users")) || {};
            users[email] = {
                name: name,
                email: email,
                password: password
            }
            localStorage.setItem('users', JSON.stringify(users))
            alert("Registered Successfully")
            window.location.href = "login.html"
        })
    }

    var loginData = document.getElementById('login')
    if (loginData) {
        loginData.addEventListener('submit', (e) => {
            e.preventDefault();
            var email = document.getElementById('email').value
            var password = document.getElementById('password').value
            var userData = JSON.parse(localStorage.getItem('users')) || {}         
            if(userData[email]  && userData[email].password === password){    
                // var emailData = {
                //     email : email
                // } 
                // localStorage.setItem('Useremail',JSON.stringify(emailData))   
                localStorage.setItem('Useremail',email)      
                alert("Logged In Successfuly")
                window.location.href = "home.html";
            }else{
                alert("Invalid Credentials or yet to Register??")
            }
        })
    }
    var orderData = document.getElementById('pop-form')
    if(orderData){
    orderData.addEventListener('submit', async(e) => {
            e.preventDefault();
       var address = document.getElementById('add').value
       var qty = document.getElementById('qty').value
       var phone = document.getElementById('phone').value
       var notes = document.getElementById('cust').value
       var useremail = localStorage.getItem('Useremail')
       console.log(useremail,"ss")
       var image = currentImage.src
      var details = {
        address : address,
        qty:qty,
        phone:phone,
        notes:notes,
        email:useremail,
        image:image
       }
       console.log(details,"11")
       const response = await fetch('/sendData',{
        method:"POST",
        headers:{
            "content-Type" :"application/json"
        },
        body: JSON.stringify(details)
       })

       const result = await response.text();
       console.log(result,"22")
       alert(result);
      cancelPopUp();

    })
    }
})   
 function openBuyPopup(button){
            console.log("Inside")
            const container = button.closest('.d1')
            console.log(container,"container")
            currentImage = container.querySelector('img');
            console.log(currentImage,"kk")
            document.getElementById("pop").style.display = "block";
        }
function cancelPopUp(){
            console.log("Inside")
            document.getElementById("pop-form").reset()
            document.getElementById("pop").style.display = "none";
        }