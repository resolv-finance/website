const validateEmail = (email) => {
  return email.indexOf('@') !== -1;
};

async function registerUser() {
  const form = document.querySelector('form');
  const input = document.getElementById('input');
  const successBox = document.getElementById('success-box');
  const errorBox = document.getElementById('error-box');
  const feedbackBox = document.getElementById('feedback-box');
  const email = document.getElementById('email-input').value;

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

  form.classList.add('loading');
  const response = await fetch('/.netlify/functions/index', options);
  
  if (response.ok) {
    input.classList.add('d-none');
    successBox.classList.remove('d-none');
    feedbackBox.classList.add('d-none');
  }
  else {
    input.classList.add('d-none');
    errorBox.classList.remove('d-none');
  }
  form.classList.remove('loading');
}
