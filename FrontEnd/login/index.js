const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const checkLogin = document.querySelector('input[type="submit"]')
const errorLogin = document.querySelector('.error')


checkLogin.addEventListener('click', async (event) => {
    event.preventDefault();
   await fetch('http://localhost:5678/api/users/login',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
         body: JSON.stringify({ email: emailInput.value, password: passwordInput.value })
    }).then((res) =>  res.json())
      .then((data) => {
          if (data.message) {
              errorLogin.style.display ="block";    
            } else if (data.error) {
                errorLogin.style.display ="block";    
            }   
            else {
                document.location.href="/FrontEnd/author/index.html";
                sessionStorage.setItem(data.userId , data.token);
            }                         
        }) 
    })
        
    