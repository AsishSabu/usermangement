const form = document.getElementById('form');
form.addEventListener('submit', (event) => {
  if (!validate()) {
    event.preventDefault();
  }
});

function validate() {
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const mobile = document.getElementById('mobile');
  const password = document.getElementById('password');

  const nameerr = document.getElementById('nameerr');
  const emailerr = document.getElementById('emailerr');
  const mobileerr = document.getElementById('mobileerr');
  const passworderr = document.getElementById('passworderr');

  const nameRegex = /^[A-Z]/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // General email validation

  let isValid = true;

  // Name field
  if (name.value.trim() === '') {
    nameerr.textContent = 'Field is required';
    isValid = false;
    setTimeout(function () {
      nameerr.textContent = '';
    }, 3000);
  } else if (name.value.trim().length < 4) {
    nameerr.textContent = 'Name must be at least 4 characters';
    isValid = false;
    setTimeout(function () {
      nameerr.textContent = '';
    }, 3000);
  } else if (!nameRegex.test(name.value.trim())) {
    nameerr.textContent = 'First letter should be capital';
    isValid = false;
    setTimeout(function () {
      nameerr.textContent = '';
    }, 3000);
  }

  // Email field
  if (email.value.trim() === '') {
    emailerr.textContent = 'Field is required';
    isValid = false;
    setTimeout(function () {
      emailerr.textContent = '';
    }, 3000);
  } else if (!emailRegex.test(email.value.trim())) {
    emailerr.textContent = 'Invalid email format.';
    isValid = false;
    setTimeout(function () {
      emailerr.textContent = '';
    }, 3000);
  }

  // Mobile field
  const mobileValue = mobile.value.trim();
  if (mobileValue === '') {
    mobileerr.textContent = 'Mobile number must be filled out';
    setTimeout(function () {
      mobileerr.textContent = '';
    }, 3000);
    isValid = false;
  } else if (!/^\d+$/.test(mobileValue)) {
    mobileerr.textContent = 'Mobile number must be digits';
    setTimeout(function () {
      mobileerr.textContent = '';
    }, 3000);
    isValid = false;
  } else if (mobileValue.length !== 10) {
    mobileerr.textContent = 'Mobile Number must have 10 digits';
    setTimeout(function () {
      mobileerr.textContent = '';
    }, 3000);
    isValid = false;
  }else if (!/^[789]\d{9}$/.test(mobileValue)) {
    mobileerr.textContent = 'Invalid mobile number';
    setTimeout(function () {
      mobileerr.textContent = '';
    }, 3000);
    isValid = false;
  }
    
  

    // Password field
    if (password.value.trim() === '') {
        passworderr.textContent = 'Field is required';
        setTimeout(function () {
            passworderr.textContent = '';
          }, 3000);
        isValid = false;
    } else if (password.value.length < 4) {
        passworderr.textContent = 'Password must be at least 4 characters long';
        setTimeout(function () {
            passworderr.textContent = '';
          }, 3000);
        isValid = false;
    }
 

  

  return isValid;
}

const alert = document.getElementById('alert')
setTimeout(()=>{
    alert.style.display = 'none'
},3000)
