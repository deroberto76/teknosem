(function () {
  'use strict';

  function getProductId() {
    var params = new URLSearchParams(window.location.search);
    return params.get('id') || '';
  }

  function findProduct(id) {
    var data = window.PRODUCTOS_DATA;
    if (!data) return null;
    for (var i = 0; i < data.length; i++) {
      if (data[i].id === id) return data[i];
    }
    return null;
  }

  function renderProduct(p) {
    var html = '';

    // Header: Modelo, Título, SKU
    html += '<div class="product-header">';
    html += '<div class="product-header-left">';
    html += '<p class="product-modelo">MODELO : ' + escapeHtml(p.modelo) + '</p>';
    html += '<h1 class="product-titulo">' + escapeHtml(p.titulo) + '</h1>';
    html += '</div>';
    html += '<p class="product-sku">( SKU : ' + escapeHtml(p.sku) + ' )</p>';
    html += '</div>';

    // Contenedor principal: imagen + contenido
    html += '<div class="product-body">';
    html += '<div class="product-imagen-wrap">';
    html += '<img src="' + escapeHtml(p.imagen) + '" alt="' + escapeHtml(p.titulo) + '" class="product-imagen" onerror="this.style.display=\'none\';this.nextElementSibling&&(this.nextElementSibling.style.display=\'flex\')">';
    html += '<div class="product-imagen-placeholder" style="display:none">IMG PRODUCTO</div>';
    html += '</div>';
    html += '<div class="product-contenido">';

    // Botones de acción
    html += '<div class="product-actions">';
    html += '<a href="index.html#cotizacion" class="btn btn-primary">Agregar a Cotización</a>';
    if (p.pdfUrl) {
      html += '<a href="' + escapeHtml(p.pdfUrl) + '" class="btn btn-outline-sm" target="_blank" rel="noopener">Ver PDF</a>';
    }
    html += '</div>';

    // Descripción
    html += '<div class="product-descripcion">';
    if (Array.isArray(p.descripcion)) {
      p.descripcion.forEach(function (parrafo) {
        html += '<p>' + escapeHtml(parrafo) + '</p>';
      });
    } else if (p.descripcion) {
      html += '<p>' + escapeHtml(p.descripcion) + '</p>';
    }
    html += '</div>';

    // Fabricante
    html += '<p class="product-fabricante">FABRICANTE : ' + escapeHtml(p.fabricante) + '</p>';
    html += '</div>';
    html += '</div>';

    return html;
  }

  function escapeHtml(text) {
    if (!text) return '';
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function renderNotFound() {
    return '<div class="product-not-found">' +
      '<h2>Producto no encontrado</h2>' +
      '<p><a href="index.html">Volver al inicio</a></p>' +
      '</div>';
  }

  var container = document.getElementById('productoContenido');
  if (!container) return;

  var id = getProductId();
  var product = findProduct(id);

  if (product) {
    document.title = product.titulo + ' – TEKNOSEM';
    container.innerHTML = renderProduct(product);
    container.classList.remove('product-loading');
  } else {
    container.innerHTML = renderNotFound();
    container.classList.remove('product-loading');
  }
})();
