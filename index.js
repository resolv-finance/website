const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

async function registerUser() {
  const form = document.getElementById('form');
  const successBox = document.getElementById('success-box');
  const errorBox = document.getElementById('error-box');
  const feedbackBox = document.getElementById('feedback-box');
  const email = document.getElementsByName('email')[0].value;

  if (!validateEmail(email)) {
    feedbackBox.classList.add('d-block');
    return;
  }
 
  const headers = new Headers();
headers.append('Content-Type', 'application/json');
  
  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify({email}),
  };

  const response = await fetch('functions/index', options);
  
  if (response.ok) {
    form.classList.add('d-none');
    successBox.classList.remove('d-none');
  }
  else {
    form.classList.add('d-none');
    errorBox.classList.remove('d-none');
  }
}