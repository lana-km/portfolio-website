// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            console.log('Form submitted:', formData);

            // Show success message
            alert('Vielen Dank für deine Nachricht! Ich werde mich bald bei dir melden.');

            // Reset form
            contactForm.reset();
        });
    }
}

// Make it available globally (no-module mode)
window.initContactForm = initContactForm;
