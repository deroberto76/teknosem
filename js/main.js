(function () {
  'use strict';

  // Suavizado ya está en CSS (scroll-behavior: smooth)
  // Enlaces internos funcionan con #id

  // Carrusel de marcas
  // ===== ARRAY DE LOGOS - AÑADE TUS LOGOS AQUÍ =====
  // Para agregar un logo, añade un objeto con:
  //   src: ruta a la imagen (ej: 'images/logos/mitsubishi.png')
  //   alt: texto alternativo (ej: 'Mitsubishi Electric')
  var brands = [
    { src: 'images/logos/mitsubishi.png', alt: 'Mitsubishi Electric' },
    { src: 'images/logos/geolux.png', alt: 'GEOLUX' },
    { src: 'images/logos/cellpack.png', alt: 'CELLPACK' },
    { src: 'images/logos/cabur.png', alt: 'cabur' },
    { src: 'images/logos/electronicon.png', alt: 'ELECTRONICON' },
    { src: 'images/logos/kps.png', alt: 'KPS' }
    // Añade más logos aquí:
    // { src: 'images/logos/otra-marca.png', alt: 'Otra Marca' },
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
})();
