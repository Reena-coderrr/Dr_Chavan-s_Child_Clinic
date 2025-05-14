// Initialize EmailJS (replace with your own Public Key)
(function() {
    emailjs.init("ozzJNtsGaH0W2aP5i"); // 🔁 Replace this
})();

document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.classList.add('loading');
            submitButton.disabled = true;

            // Send form via EmailJS
            emailjs.sendForm('service_staixte', 'template_46uivvc', contactForm) // 🔁 Replace these
                .then(function(response) {
                    // Success
                    contactForm.reset();
                    showNotification('Thank you for your message! We will get back to you soon.', 'success');
                }, function(error) {
                    // Failure
                    console.error('EmailJS Error:', error);
                    showNotification('Oops! Something went wrong. Please try again later.', 'error');
                })
                .finally(() => {
                    // Reset button state
                    submitButton.classList.remove('loading');
                    submitButton.disabled = false;
                });
        });
    }

    // ✅ Notification function (unchanged)
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <p>${message}</p>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;

        document.body.appendChild(notification);

        Object.assign(notification.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: type === 'success' ? '#dcfce7' : type === 'error' ? '#fee2e2' : '#e0f2fe',
            color: type === 'success' ? '#166534' : type === 'error' ? '#991b1b' : '#0369a1',
            padding: '1rem',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            zIndex: '1000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: '400px',
            transform: 'translateY(100px)',
            opacity: '0',
            transition: 'all 0.3s ease'
        });

        const content = notification.querySelector('.notification-content');
        Object.assign(content.style, {
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
        });

        const closeBtn = notification.querySelector('.notification-close');
        Object.assign(closeBtn.style, {
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'inherit',
            fontSize: '1rem'
        });

        setTimeout(() => {
            notification.style.transform = 'translateY(0)';
            notification.style.opacity = '1';
        }, 10);

        const hideTimeout = setTimeout(() => {
            hideNotification();
        }, 5000);

        closeBtn.addEventListener('click', () => {
            clearTimeout(hideTimeout);
            hideNotification();
        });

        function hideNotification() {
            notification.style.transform = 'translateY(100px)';
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }
});
