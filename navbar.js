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

        'Blogs/youtube-CTR-guide-2026',

        'Blogs/youtube-impressions-guide',

        'Blogs/youtube-ctr-vs-watch-time',

        'Blogs/youtube-algorithm-2026-guide'
        
    ];
    
    const blogCountEl = document.querySelector('.blog-count');
    if (blogCountEl) {
        blogCountEl.innerText = blogs.length;
    }
    
});

// AdSense Auto Ads - Skip on policy pages
var noAdPages = [
    '/about.html',
    '/privacy-policy.html',
    '/terms-of-service.html',
    '/contact.html'
];

var currentPage = window.location.pathname;
var isNoAdPage = noAdPages.some(function(page) {
    return currentPage.includes(page);
});

if (!isNoAdPage) {
    var adsenseScript = document.createElement('script');
    adsenseScript.async = true;
    adsenseScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4293673248342437';
    adsenseScript.setAttribute('crossorigin', 'anonymous');
    document.head.appendChild(adsenseScript);
}