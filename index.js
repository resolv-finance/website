const validateEmail = (email) => {
  return email.indexOf('@') !== -1;
};

async function registerUser() {
  const form = document.getElementById('input');
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

  const response = await fetch('https://resolv.netlify.app/.netlify/functions/index', options);
  
  if (response.ok) {
    form.classList.add('d-none');
    successBox.classList.remove('d-none');
    feedbackBox.classList.add('d-none');
  }
  else {
    form.classList.add('d-none');
    errorBox.classList.remove('d-none');
  }
}
