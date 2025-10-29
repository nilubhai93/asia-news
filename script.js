// Main JavaScript for Asia News Website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Search Functionality
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results-content');
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function(e) {
            const query = e.target.value.trim();
            
            if (query.length < 2) {
                searchResults.innerHTML = '';
                return;
            }
            
            // Simulate search results
            const results = simulateSearch(query);
            displaySearchResults(results);
        }, 300));
    }

    // Modal Functions
    window.openLoginModal = function() {
        document.getElementById('loginModal').style.display = 'block';
    }

    window.closeLoginModal = function() {
        document.getElementById('loginModal').style.display = 'none';
    }

    window.openSignupModal = function() {
        document.getElementById('signupModal').style.display = 'block';
    }

    window.closeSignupModal = function() {
        document.getElementById('signupModal').style.display = 'none';
    }

    window.switchToSignup = function() {
        closeLoginModal();
        openSignupModal();
    }

    window.switchToLogin = function() {
        closeSignupModal();
        openLoginModal();
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const loginModal = document.getElementById('loginModal');
        const signupModal = document.getElementById('signupModal');
        
        if (event.target === loginModal) {
            closeLoginModal();
        }
        if (event.target === signupModal) {
            closeSignupModal();
        }
    });

    // Form Submissions
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add login logic here
            alert('Login functionality would be implemented here');
            closeLoginModal();
        });
    }

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add signup logic here
            alert('Signup functionality would be implemented here');
            closeSignupModal();
        });
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add contact form logic here
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            // Add newsletter subscription logic here
            alert(`Thank you for subscribing with ${email}!`);
            newsletterForm.reset();
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading animation to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.story-card, .news-item, .category-card, .article-card, .team-member');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function simulateSearch(query) {
    // This is a mock function - in a real application, you would make an API call
    const mockResults = [
        { title: 'ASEAN Summit Concludes with Historic Trade Agreement', category: 'Politics', url: '#' },
        { title: 'Singapore AI Startup Raises $50M in Funding', category: 'Technology', url: '#' },
        { title: 'Asian Markets Rally on Positive Economic Data', category: 'Business', url: '#' },
        { title: 'Climate Change Summit: Asian Nations Commit to Carbon Neutrality', category: 'Environment', url: '#' }
    ];
    
    return mockResults.filter(result => 
        result.title.toLowerCase().includes(query.toLowerCase()) ||
        result.category.toLowerCase().includes(query.toLowerCase())
    );
}

function displaySearchResults(results) {
    const searchResults = document.querySelector('.search-results-content');
    
    if (results.length === 0) {
        searchResults.innerHTML = '<p class="no-results">No results found</p>';
        return;
    }
    
    const resultsHTML = results.map(result => `
        <div class="search-result-item">
            <a href="${result.url}" class="search-result-link">
                <h4>${result.title}</h4>
                <span class="search-result-category">${result.category}</span>
            </a>
        </div>
    `).join('');
    
    searchResults.innerHTML = resultsHTML;
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .story-card,
    .news-item,
    .category-card,
    .article-card,
    .team-member {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .search-result-item {
        padding: 0.75rem;
        border-bottom: 1px solid #e9ecef;
    }
    
    .search-result-item:last-child {
        border-bottom: none;
    }
    
    .search-result-link {
        text-decoration: none;
        color: inherit;
        display: block;
    }
    
    .search-result-link h4 {
        margin: 0 0 0.25rem 0;
        font-size: 0.9rem;
        color: #333;
    }
    
    .search-result-category {
        font-size: 0.8rem;
        color: #007bff;
        font-weight: 600;
    }
    
    .no-results {
        text-align: center;
        color: #6c757d;
        padding: 1rem;
        margin: 0;
    }
`;
document.head.appendChild(style);