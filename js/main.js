(function () {
  'use strict';

  // Suavizado ya está en CSS (scroll-behavior: smooth)
  // Enlaces internos funcionan con #id

  // Formulario: abrir cliente de correo con mailto
  var form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nombre = (form.querySelector('[name="nombre"]') || {}).value || '';
      var email = (form.querySelector('[name="email"]') || {}).value || '';
      var asunto = (form.querySelector('[name="asunto"]') || {}).value || '';
      var mensaje = (form.querySelector('[name="mensaje"]') || {}).value || '';
      var body = 'Nombre: ' + nombre + '\nCorreo: ' + email + '\nAsunto: ' + asunto + '\n\n' + mensaje;
      window.location.href = 'mailto:ventas@instrumentos.com?subject=' + encodeURIComponent(asunto) + '&body=' + encodeURIComponent(body);
    });
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
