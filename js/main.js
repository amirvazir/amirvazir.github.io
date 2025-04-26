/*
    Copyright (c) 2025 Amir Vazir
    All Rights Reserved
    
    This JavaScript file and its contents are protected by copyright law.
    Unauthorized copying, modification, distribution, or use of this code is strictly prohibited.
    For licensing inquiries, please contact: [Your Contact Information]
*/

// Add basic protection against code copying
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
});

document.addEventListener('keydown', function(e) {
    // Prevent Ctrl+U (View Source)
    if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        return false;
    }
    // Prevent Ctrl+S (Save)
    if (e.ctrlKey && e.keyCode === 83) {
        e.preventDefault();
        return false;
    }
    // Prevent Ctrl+Shift+I (Developer Tools)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        e.preventDefault();
        return false;
    }
});

// Disable text selection
document.addEventListener('selectstart', function(e) {
    e.preventDefault();
    return false;
});

(function ($) {
    "use strict";
    
    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            // Get the target element
            var target = $(this.hash);
            
            // Check if target exists
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 30
                }, 1500, 'easeInOutExpo');
                
                // Update active class in navbar
                $('.navbar-nav .active').removeClass('active');
                $(this).addClass('active');
                
                // Close mobile menu if open
                if ($('.navbar-collapse').hasClass('show')) {
                    $('.navbar-collapse').collapse('hide');
                }
            }
        }
    });
    
    // Typed Initiate
    if ($('.header h2').length == 1) {
        var typed_strings = $('.header .typed-text').text();
        var typed = new Typed('.header h2', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }
    
    // Skills
    $('.skills').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});
    
    // Back to top button functionality
    $('.back-to-top').click(function (e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    
    // Consolidated scroll event handler
    $(window).scroll(function () {
        // Back to top button visibility
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
            $('.back-to-top').addClass('show');
        } else {
            $('.back-to-top').fadeOut('slow');
            $('.back-to-top').removeClass('show');
        }
        
        // Call the reveal function for animations
        reveal();
    });
})(jQuery);

// Scroll Reveal Animation
function reveal() {
    var reveals = document.querySelectorAll(".reveal, .about, .education, .experience, .service, .portfolio, .review, .contact");
    
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

// Add reveal class to elements
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.content-inner');
    sections.forEach(section => {
        section.classList.add('reveal');
    });

    // Initialize scroll reveal
    reveal();
});

// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Typed.js
    if (document.querySelector('.typed-text')) {
        new Typed('.typed-text', {
            strings: ['UI/UX Designer', 'Full Stack Developer', 'React Specialist', 'Mobile Developer', 'UI Engineer'],
            typeSpeed: 50,
            backSpeed: 30,
            loop: true
        });
    }
    
    // Show initial tooltip on copy icon
    const copyIcon = document.querySelector('.copy-icon');
    if (copyIcon) {
        copyIcon.setAttribute('title', 'Copy to clipboard');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (!target) return; // Skip if target doesn't exist
        
        const headerOffset = 30;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
        
        // Update active class in navbar
        if (this.closest('.navbar-nav')) {
            document.querySelectorAll('.navbar-nav .active').forEach(item => {
                item.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Function to copy email to clipboard
function copyEmail() {
    const email = "amirvazir.dev@gmail.com";
    navigator.clipboard.writeText(email)
        .then(() => {
            // Show temporary tooltip or notification
            const copyIcon = document.querySelector('.copy-icon');
            
            // Add temporary success class
            copyIcon.classList.add('copy-success');
            copyIcon.setAttribute('title', 'Copied!');
            
            // Remove class after 2 seconds
            setTimeout(() => {
                copyIcon.classList.remove('copy-success');
                copyIcon.setAttribute('title', 'Copy to clipboard');
            }, 2000);
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
        });
}

