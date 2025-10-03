document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            
            const isOpen = navLinks.classList.contains('open');
            menuToggle.innerHTML = isOpen ? '&#10005;' : '&#9776;'; 
        });
    }
});

const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('form-success');

function validateEmail(email) {
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
        e.preventDefault(); 

        const requiredInputs = [
            document.getElementById('name'),
            document.getElementById('email'),
            document.getElementById('message')
        ];
        
        let isValid = checkRequired(requiredInputs);
        const emailInput = document.getElementById('email');
        
        if (emailInput.value.trim() !== '' && !validateEmail(emailInput.value)) {
            emailInput.parentElement.classList.add('error');
            emailInput.parentElement.querySelector('.error-message').textContent = 'Email is not valid.';
            isValid = false;
        }

        if (isValid) {
            contactForm.reset();
            formSuccess.textContent = "Thank you! Your inquiry has been sent (mock success).";
            formSuccess.style.display = 'block';
            
            setTimeout(() => {
                formSuccess.style.display = 'none';
            }, 5000);
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const filterToggles = document.querySelectorAll('.filter-toggle');

    filterToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const parentDropdown = this.closest('.filter-dropdown');
            
            const isActive = parentDropdown.classList.contains('active');
            
            document.querySelectorAll('.filter-dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
            
            if (!isActive) {
                parentDropdown.classList.add('active');
            }
        });
    });
});


