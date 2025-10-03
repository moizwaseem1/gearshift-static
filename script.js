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
document.addEventListener('DOMContentLoaded', function() {
    // ... [Existing filter dropdown script here] ...

    // --- Contact Form Validation Script ---
    const contactForm = document.querySelector('.contact-form-layout');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            // Assume validation fails initially
            let formIsValid = true; 

            // Fields that must be validated
            const requiredFields = ['firstName', 'email', 'message'];
            
            requiredFields.forEach(fieldId => {
                const input = document.getElementById(fieldId);
                const parentGroup = input.closest('.form-group');

                // 1. Check if the input is empty
                if (!input.value.trim()) {
                    formIsValid = false;
                    // Add an error class for visual feedback (CSS needed)
                    parentGroup.classList.add('error'); 
                } else {
                    // Remove error class if field is now valid
                    parentGroup.classList.remove('error');
                }
            });

            // 2. Check for valid email format (only if not empty)
            const emailInput = document.getElementById('email');
            const emailGroup = emailInput.closest('.form-group');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

            if (emailInput.value.trim() && !emailRegex.test(emailInput.value.trim())) {
                formIsValid = false;
                emailGroup.classList.add('error');
            } else if (emailGroup.classList.contains('error') && emailRegex.test(emailInput.value.trim())) {
                emailGroup.classList.remove('error');
            }

            // Prevent form submission if validation failed
            if (!formIsValid) {
                event.preventDefault();
                alert('Please fill out all required fields (First Name, Email, and Message).');
            }
        });
    }
});

