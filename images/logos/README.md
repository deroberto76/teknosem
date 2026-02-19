# Logos de Marcas

Coloca aquí los archivos de imagen de los logos de las marcas que quieres mostrar en la sección "Nuestras Marcas".

## Formato recomendado

- **Formato:** PNG con fondo transparente o JPG
- **Tamaño:** Ancho máximo ~200px, altura ~80px (se ajustará automáticamente)
- **Fondo:** Transparente o blanco
- **Calidad:** Alta resolución para pantallas Retina

## Cómo agregar un logo

1. Coloca el archivo de imagen en esta carpeta (`images/logos/`).
2. Abre `js/main.js` y busca el array `brands` (al inicio del archivo).
3. Añade un nuevo objeto al array:
   ```javascript
   { src: 'images/logos/tu-logo.png', alt: 'Nombre de la Marca' }
   ```

Ejemplo:
```javascript
var brands = [
  { src: 'images/logos/mitsubishi.png', alt: 'Mitsubishi Electric' },
  { src: 'images/logos/geolux.png', alt: 'GEOLUX' },
  { src: 'images/logos/tu-nueva-marca.png', alt: 'Tu Nueva Marca' }, // ← Añade aquí
];
```

Los logos se mostrarán automáticamente en el carrusel de la sección "Nuestras Marcas".
