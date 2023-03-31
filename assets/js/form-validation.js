// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });

  let name = document.getElementById("inputName");
  let mobile = document.getElementById("inputMobile");
  let email = document.getElementById("inputEmail");
  let subject = document.getElementById("inputSubject");
  let message = document.getElementById("inputMessage");
  let formMessage = document.querySelector(".form-message");

  document.getElementById("contactForm").addEventListener("submit", (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (
      name.value &&
      isValidEmail(email.value) &&
      subject.value &&
      message.value
    ) {
      sendEmail();

      formMessage.classList.add("show");
      setTimeout(() => {
        formMessage.classList.remove("show");
      }, 2000);
    }

    return false;
  });

  function sendEmail() {
    Email.send({
      SecureToken: "9c45e8df-72ea-444c-aef3-3b5e72b3609a",
      To: "abul.king1990@gmail.com",
      From: "abuleditor2@gmail.com",
      Subject: subject.value,
      Body: ` 
      <strong>Name:</strong> ${name.value}<br/> 
      <strong>Mobile:</strong> ${mobile.value}<br/> 
      <strong>Email:</strong> ${email.value}<br/> 
      <strong>Subject:</strong> ${subject.value}<br/> 
      <strong>Message:</strong> <br/>${message.value}`,
    }).then((message) => console.log(message));
  }

  // Helper function to validate email address format
  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
    return regex.test(email);
  }
})();
