document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    let currentIndex = 0;
    const totalImages = galleryItems.length;
    let slideshowInterval;

    // Open lightbox when clicking on a gallery item
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            currentIndex = parseInt(this.getAttribute('data-index'));
            const imgSrc = this.querySelector('img').getAttribute('src');
            
            lightboxImage.setAttribute('src', imgSrc);
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Start slideshow only when a gallery item is clicked
            startSlideshow();
        });
    });
    
    // Close lightbox
    lightboxClose.addEventListener('click', function() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
        clearInterval(slideshowInterval); // Stop slideshow when closing lightbox
    });
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
            clearInterval(slideshowInterval); // Stop slideshow when clicking outside
        }
    });
    
    // Navigate to previous image
    lightboxPrev.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent closing the lightbox when clicking the previous button
        currentIndex = (currentIndex === 0) ? totalImages - 1 : currentIndex - 1;
        updateLightboxContent();
    });
    
    // Navigate to next image
    lightboxNext.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent closing the lightbox when clicking the next button
        currentIndex = (currentIndex === totalImages - 1) ? 0 : currentIndex + 1;
        updateLightboxContent();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
            clearInterval(slideshowInterval); // Stop slideshow on Escape
        } else if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex === 0) ? totalImages - 1 : currentIndex - 1;
            updateLightboxContent();
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex === totalImages - 1) ? 0 : currentIndex + 1;
            updateLightboxContent();
        }
    });
    
    // Update lightbox content
    function updateLightboxContent() {
        const currentItem = galleryItems[currentIndex];
        const imgSrc = currentItem.querySelector('img').getAttribute('src');
        
        // Fade out effect
        lightboxImage.style.opacity = '0';
        
        setTimeout(() => {
            lightboxImage.setAttribute('src', imgSrc);
            
            // Fade in effect
            lightboxImage.style.opacity = '1';
        }, 300);
    }

    // Start the slideshow only when the lightbox is active
    function startSlideshow() {
        slideshowInterval = setInterval(function() {
            currentIndex = (currentIndex === totalImages - 1) ? 0 : currentIndex + 1;
            updateLightboxContent();
        }, 3000); // Change image every 3 seconds
    }
});
