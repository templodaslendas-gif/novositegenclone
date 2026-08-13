const CHECKOUT_URL = "#checkout"; // Troque pelo checkout final quando estiver pronto.

document.querySelectorAll('.checkout-link').forEach(link => {
  link.setAttribute('href', CHECKOUT_URL);
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const sticky = document.getElementById('stickyBuy');
window.addEventListener('scroll', () => {
  sticky.classList.toggle('visible', window.scrollY > 650);
}, { passive: true });
