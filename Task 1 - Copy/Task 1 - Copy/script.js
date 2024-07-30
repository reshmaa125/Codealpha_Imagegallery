document.addEventListener('DOMContentLoaded', () => {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('main-image');
    const loadingIndicator = document.querySelector('.loading-indicator');
    const lightThemeButton = document.getElementById('light-theme');
    const darkThemeButton = document.getElementById('dark-theme');
    const controlBar = document.querySelector('.control-bar');
    const imageCounter = document.getElementById('image-counter');
    const totalImages = document.getElementById('total-images');

    let currentImageIndex = 0;

    function preloadImage(src) {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve(img.src);
        });
    }

    async function loadImage(src) {
        loadingIndicator.style.display = 'block';
        mainImage.style.display = 'none';
        const preloadedSrc = await preloadImage(src);
        mainImage.src = preloadedSrc;
        mainImage.style.display = 'block';
        loadingIndicator.style.display = 'none';
    }

    function showImage(index) {
        const thumbnail = thumbnails[index];
        const fullSrc = thumbnail.getAttribute('data-full');
        loadImage(fullSrc);
        currentImageIndex = index;
        updateControlBar();
    }

    function updateControlBar() {
        imageCounter.textContent = currentImageIndex + 1;
        totalImages.textContent = thumbnails.length;
    }

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            showImage(index);
        });
    });

    lightThemeButton.addEventListener('click', () => {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
    });

    darkThemeButton.addEventListener('click', () => {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
    });

    // Load the first image initially
    if (thumbnails.length > 0) {
        showImage(0);
    }
});
