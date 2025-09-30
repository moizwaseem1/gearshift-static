document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            
            const isOpen = navLinks.classList.contains('open');
            menuToggle.innerHTML = isOpen ? '&#10005;' : '&#9776;'; // X or Hamburger
        });
    }
});

const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('form-success');

function validateEmail(email) {
    // Simple regex for email format validation
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function checkRequired(inputs) {
    let isValid = true;
    inputs.forEach(input => {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');

        if (input.value.trim() === '') {
            formGroup.classList.add('error');
            errorMessage.textContent = `${input.previousElementSibling.textContent} is required.`;
            isValid = false;
        } else {
            formGroup.classList.remove('error');
            errorMessage.textContent = '';
        }
    });
    return isValid;
}

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Stop default submission

        const requiredInputs = [
            document.getElementById('name'),
            document.getElementById('email'),
            document.getElementById('message')
        ];
        
        let isValid = checkRequired(requiredInputs);
        const emailInput = document.getElementById('email');

        // Specific Email Validation
        if (emailInput.value.trim() !== '' && !validateEmail(emailInput.value)) {
            emailInput.parentElement.classList.add('error');
            emailInput.parentElement.querySelector('.error-message').textContent = 'Email is not valid.';
            isValid = false;
        }

        if (isValid) {
            // Since this is a static site, we just display a success message
            contactForm.reset();
            formSuccess.textContent = "Thank you! Your inquiry has been sent (mock success).";
            formSuccess.style.display = 'block';

            // Hide success message after 5 seconds
            setTimeout(() => {
                formSuccess.style.display = 'none';
            }, 5000);
        }
    });
}

