function toggleMenu() {
    const navLinks = document.getElementById("navLinks");
    const hamburger = document.getElementById("hamburger");
    navLinks.classList.toggle("open");
    hamburger.classList.toggle("open");
}
// Dropdown toggle for mobile
document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            const menu = this.nextElementSibling;
            menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
        });
    }
})

// Auto blog count
document.addEventListener('DOMContentLoaded', function() {
    const blogs = [
        'youtube-earnings-india-2026.html',
        'Blogs/how-to-download-youtube-thumbnail/',
        'Blogs/youtube-thumbnail-size-guide/',
        'Blogs/5-Best-YouTube-Thumbnail-Tips-to-Increase-Clicks-(CTR)-in-2026/',
        'Blogs/how-to-get-1000-youtube-subscribers-fast/',
        'Blogs/youtube-thumbnail-seo-guide/',
        'Blogs/youtube-CTR-guide-2026'
    ];
    
    const blogCountEl = document.querySelector('.blog-count');
    if (blogCountEl) {
        blogCountEl.innerText = blogs.length;
    }
});