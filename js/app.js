const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav-menu');
const navLink = document.querySelectorAll('.nav__link');
const intro = document.getElementById('intro');
const header = document.getElementById('header');
const btn = document.querySelectorAll('.btn-modal');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal__content');
const modalClose = document.getElementById('#modal-close');

const introH = intro.offsetHeight;
const headerH = header.offsetHeight;

// EventListeners
navToggle.addEventListener('click', navMenu);

window.addEventListener('scroll', () => {
    headerScroll();
    scrollSpy();
});

btn.forEach(item => {
    item.addEventListener('click', modalPopup);
});

modalClose.addEventListener('click', closeModal);

modal.addEventListener('click', closeOnWindow);

modalContent.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Nav toggle on mobile click
function navMenu(e) {
    e.preventDefault();

    // Change burger menu to close button on click
    document.body.classList.toggle('show-nav');
    this.classList.toggle('active');
    nav.classList.toggle('show');

    // Remove mobile nav on link click
    navLink.forEach(link =>
        link.addEventListener('click', () => {
            if (nav.classList.contains('show')) {
                document.body.classList.remove('show-nav');
                nav.classList.remove('show');
                this.classList.remove('active');
            }
        }));
}

// Change header background on scroll
function headerScroll() {
    const scrollTop = parseInt(window.scrollY);

    if (scrollTop >= (introH - headerH)) {
        header.classList.add('header--dark');
    } else {
        header.classList.remove('header--dark');
    }
}

// Add and remove active link on scroll
function scrollSpy() {
    const navLink = document.querySelectorAll('.nav__link');
    const scrollPos = (window.pageXOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop) + headerH;

    for (let i = 0; i < navLink.length - 1; i++) {
        const currentLink = navLink[i];
        const val = currentLink.getAttribute('href');
        const refElement = document.querySelector(val);

        if (refElement.offsetTop <= scrollPos &&
            (refElement.offsetTop + refElement.offsetHeight > scrollPos)) {
            // Adding active link
            currentLink.classList.add('active');
        } else {
            // Removing active link
            currentLink.classList.remove('active');
        }
    }
}

// Get modal popup on btn click
function modalPopup(e) {
    e.preventDefault();

    // Adding show and no scroll classes
    modal.classList.add('show');
    document.body.classList.add('no-scroll');
    // Adding animation on popup
    setTimeout(() => {
        modalContent.style.transform = 'scale(1)';
        modalContent.style.opacity = '1';
    }, 200);
}

// Close modal popup
function closeModal(e) {
    e.preventDefault();

    // Animation on popup close
    modalContent.style.transform = 'scale(0.5)';
    modalContent.style.opacity = '0';
    // Removing show and no scroll classes
    setTimeout(() => {
        if (e.target.id === 'modalCross') {
            modal.classList.remove('show');
            document.body.classList.remove('no-scroll');
        }
    }, 200);
}

// Close popup on window click
function closeOnWindow() {
    modal.classList.remove('show');
    document.body.classList.remove('no-scroll');
}

// Intro slider
const glider = new Glider(document.getElementById('glider'), {
    slidesToShow: 1,
    slidesToScroll: 1,
    scrollLock: true,
    arrows: {
        prev: '.glider-prev',
        next: '.glider-next'
    }
});

function sliderAuto(slider, miliseconds) {
    let slidesCount = slider.track.childElementCount;
    let slideTimeout = null;
    let nextIndex = 1;

    function slide() {
        slideTimeout = setTimeout(
            function () {
                if (nextIndex >= slidesCount) {
                    nextIndex = 0;
                }
                slider.scrollItem(nextIndex++);
            },
            miliseconds
        );
    }

    slider.ele.addEventListener('glider-animated', function () {
        window.clearInterval(slideTimeout);
        slide();
    });

    slide();
}

sliderAuto(glider, 2500)

// Reviews slider
const gliderReview = new Glider(document.getElementById('glider-review'), {
    slidesToShow: 1,
    slidesToScroll: 3,
    draggable: true,
    dots: '#dots'
});

function reviewsAuto(slider, miliseconds) {
    let slidesCount = slider.track.childElementCount;
    let slideTimeout = null;
    let nextIndex = 1;

    function slideReview() {
        slideTimeout = setTimeout(
            function () {
                if (nextIndex >= slidesCount) {
                    nextIndex = 0;
                }
                slider.scrollItem(nextIndex++);
            },
            miliseconds
        );
    }

    slider.ele.addEventListener('glider-animated', function () {
        window.clearInterval(slideTimeout);
        slideReview();
    });

    slideReview();
}

reviewsAuto(gliderReview, 8000)

// AOS js
AOS.init({
    // Global settings:
    disable: 'mobile', // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 80, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 400, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});



