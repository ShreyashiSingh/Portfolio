document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const themeBtn = document.getElementById('themeToggleBtn');
    const icon = themeBtn.querySelector('i');
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section');
    const headings = document.querySelectorAll('section h2');
    let originalPositions = {}; 

    themeBtn.addEventListener('click', toggleTheme);

    function toggleTheme() {
        if (body.style.backgroundColor === 'black') {
            body.style.backgroundColor = '#f4f4f4';
            body.style.color = '#333';
            icon.classList.remove('fas', 'fa-sun');
            icon.classList.add('fas', 'fa-moon');
        } else {
            body.style.backgroundColor = 'black';
            body.style.color = '#fff';
            icon.classList.remove('fas', 'fa-moon');
            icon.classList.add('fas', 'fa-sun');
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            sections.forEach(section => {
                section.style.display = 'none';
            });

            const target = document.querySelector(this.getAttribute('href'));
            target.style.display = 'block';

            const offsetTop = target.offsetTop;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });

            const heading = target.querySelector('h2');
            if (heading) {
                const words = heading.textContent.split(' ');
                heading.innerHTML = '';
                words.forEach((word, index) => {
                    const span = document.createElement('span');
                    span.textContent = word + ' ';
                    span.className = 'smoky-text';
                    span.style.animationDelay = `${index * 0.5}s`; 
                    heading.appendChild(span);
                });
            }

            setTimeout(() => {
                AOS.refresh();
            }, 100);

            setTimeout(() => {
                sections.forEach(section => {
                    section.style.display = 'block';
                });
            }, 10000);
        });
    });

    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('#backToTop').fadeIn();
        } else {
            $('#backToTop').fadeOut();
        }
    });

    $('#backToTop').click(function() {
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });

    AOS.init({
        startEvent: 'DOMContentLoaded',
        offset: 120,
        once: false,
    });

    headings.forEach(heading => {
        originalPositions[heading.innerText] = {
            x: heading.getBoundingClientRect().left,
            y: heading.getBoundingClientRect().top
        };

        heading.addEventListener('mousedown', function(e) {
            const randomX = Math.min(Math.floor(Math.random() * window.innerWidth * 0.6), window.innerWidth - heading.offsetWidth);
            const randomY = Math.min(Math.floor(Math.random() * window.innerHeight * 0.6), window.innerHeight - heading.offsetHeight);

            heading.style.transition = 'transform 0.5s';
            heading.style.transform = `translate(${randomX}px, ${randomY}px)`;

            const message = document.createElement('span');
            message.innerHTML = '<i class="fas fa-comment-dots"></i> Dare catching me!';
            message.style.position = 'absolute';
            message.style.top = `${e.clientY}px`;
            message.style.left = `${e.clientX}px`;
            message.style.transition = 'opacity 1s';
            message.style.backgroundColor = '#e57373'; 
            message.style.color = '#fff';
            message.style.padding = '5px 10px';
            message.style.borderRadius = '5px';
            message.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
            document.body.appendChild(message);

            setTimeout(() => {
                message.style.opacity = '0';
            }, 1000);

            setTimeout(() => {
                document.body.removeChild(message);
            }, 2000);
        });

        heading.addEventListener('mouseup', function() {
            setTimeout(() => {
                heading.style.transition = 'transform 0.5s';
                heading.style.transform = `translate(${originalPositions[heading.innerText].x - heading.getBoundingClientRect().left}px, ${originalPositions[heading.innerText].y - heading.getBoundingClientRect().top}px)`;
            }, 15000);
        });
    });
});