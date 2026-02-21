(function () {
  'use strict';

  // Suavizado ya está en CSS (scroll-behavior: smooth)
  // Enlaces internos funcionan con #id

  // Grid de productos destacados (desde productos-data.js)
  var productosGrid = document.getElementById('productosGrid');
  var productosData = window.PRODUCTOS_DATA;
  if (productosGrid && productosData && productosData.length > 0) {
    var cartSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>';
    productosData.slice(0, 4).forEach(function (p) {
      var desc = Array.isArray(p.descripcion) ? p.descripcion[0] : (p.descripcion || '');
      var card = document.createElement('article');
      card.className = 'card-product';
      card.innerHTML = '<div class="card-product-img"><img src="' + p.imagen + '" alt="' + (p.titulo || '') + '" loading="lazy" onerror="this.parentElement.textContent=\'IMG PRODUCTO\'"></div>' +
        '<p class="card-product-sku">SKU: ' + (p.sku || '') + '</p>' +
        '<h3 class="card-product-name">' + (p.titulo || '') + '</h3>' +
        '<p class="card-product-desc">' + desc + '</p>' +
        '<a href="producto.html?id=' + encodeURIComponent(p.id) + '" class="btn btn-outline-sm">' + cartSvg + ' Cotizar</a>';
      productosGrid.appendChild(card);
    });
  }

  // Carrusel de marcas
  // ===== ARRAY DE LOGOS - AÑADE TUS LOGOS AQUÍ =====
  // Para agregar un logo, añade un objeto con:
  //   src: ruta a la imagen (ej: 'images/logos/mitsubishi.png')
  //   alt: texto alternativo (ej: 'Mitsubishi Electric')
  var brands = [
    { src: 'images/logos/ersa.jpg', alt: 'Ersa' },
    { src: 'images/logos/Fluke.png', alt: 'Fluke' },
    { src: 'images/logos/hioki.jpeg', alt: 'Hioki' },
    { src: 'images/logos/bernstein.jpg', alt: 'Bernstein' },
    { src: 'images/logos/mastech.jpg', alt: 'Mastech' },
    { src: 'images/logos/pelican.png', alt: 'Pelican' },
    { src: 'images/logos/pokai.png', alt: 'Pokai' },
    { src: 'images/logos/wiha.png', alt: 'Wiha' },
    { src: 'images/logos/monarch.jpg', alt: 'Monarch' }
  ];
  // ================================================

  var carousel = document.getElementById('brandsCarousel');
  var prevBtn = document.querySelector('.brands-arrow-prev');
  var nextBtn = document.querySelector('.brands-arrow-next');

  if (carousel && brands.length > 0) {
    // Insertar logos en el carrusel
    brands.forEach(function (brand) {
      var logoDiv = document.createElement('div');
      logoDiv.className = 'brand-logo';
      var img = document.createElement('img');
      img.src = brand.src;
      img.alt = brand.alt || '';
      img.loading = 'lazy';
      logoDiv.appendChild(img);
      carousel.appendChild(logoDiv);
    });

    // Funcionalidad de navegación
    var scrollAmount = 300;
    var updateArrows = function () {
      var canScrollLeft = carousel.scrollLeft > 0;
      var canScrollRight = carousel.scrollLeft < (carousel.scrollWidth - carousel.clientWidth - 10);
      if (prevBtn) prevBtn.disabled = !canScrollLeft;
      if (nextBtn) nextBtn.disabled = !canScrollRight;
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });
    }

    carousel.addEventListener('scroll', updateArrows);
    updateArrows(); // Estado inicial
  }

  // Búsqueda: solo diseño; se puede añadir filtrado después
  var searchBtn = document.querySelector('.search-btn');
  var searchInput = document.querySelector('.search-input');
  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', function () {
      var q = searchInput.value.trim();
      if (q) {
        // En el futuro: window.location.href = '/busqueda?q=' + encodeURIComponent(q);
        searchInput.focus();
      } else {
        searchInput.focus();
      }
    });
  }
  // Hero Slider
  var slider = document.getElementById('heroSlider');
  var slides = document.querySelectorAll('.hero-slide');
  var dots = document.querySelectorAll('.dot');
  var prevSlide = document.getElementById('prevSlide');
  var nextSlide = document.getElementById('nextSlide');

  if (slider && slides.length > 0) {
    var currentSlide = 0;
    var slideInterval;

    var showSlide = function (n) {
      slides[currentSlide].classList.remove('active');
      dots[currentSlide].classList.remove('active');
      currentSlide = (n + slides.length) % slides.length;
      slides[currentSlide].classList.add('active');
      dots[currentSlide].classList.add('active');
    };

    var nextSlideFn = function () {
      showSlide(currentSlide + 1);
    };

    var prevSlideFn = function () {
      showSlide(currentSlide - 1);
    };

    if (nextSlide) nextSlide.addEventListener('click', function () {
      nextSlideFn();
      resetInterval();
    });

    if (prevSlide) prevSlide.addEventListener('click', function () {
      prevSlideFn();
      resetInterval();
    });

    dots.forEach(function (dot, index) {
      dot.addEventListener('click', function () {
        showSlide(index);
        resetInterval();
      });
    });

    var resetInterval = function () {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlideFn, 5000);
    };

    resetInterval();
  }
})();
