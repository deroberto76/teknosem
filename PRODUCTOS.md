# Gestión de productos

Todos los productos se gestionan en **`js/productos-data.js`**. Cada producto tiene las secciones que aparecen en la ficha de detalle.

## Secciones de un producto

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| `id` | Identificador único (para la URL) | `'medidor-pinza-203'` |
| `modelo` | Modelo o serie | `'203 SERIES X03'` |
| `titulo` | Nombre del producto | `'Medidor de Pinza Modelo 203'` |
| `sku` | Código SKU | `'1489'` |
| `imagen` | Ruta a la imagen | `'images/productos/medidor-pinza-203.jpg'` |
| `pdfUrl` | Ruta al PDF (opcional) | `'docs/medidor-pinza-203.pdf'` |
| `descripcion` | Array de párrafos | `['Párrafo 1...', 'Párrafo 2...']` |
| `fabricante` | Nombre del fabricante | `'AEMC'` |

## Crear un producto nuevo

1. Abre `js/productos-data.js`.
2. Copia un objeto existente dentro del array `PRODUCTOS_DATA`.
3. Modifica todos los campos con los datos del nuevo producto.
4. Asegúrate de que el `id` sea único (usa guiones, sin espacios).
5. Coloca la imagen en `images/productos/` y actualiza la ruta en `imagen`.

Ejemplo:

```javascript
{
  id: 'nuevo-producto',
  modelo: 'XYZ-100',
  titulo: 'Nombre del Producto',
  sku: '1234',
  imagen: 'images/productos/nuevo-producto.jpg',
  pdfUrl: 'docs/nuevo-producto.pdf',
  descripcion: [
    'Primer párrafo de la descripción.',
    'Segundo párrafo con especificaciones técnicas.'
  ],
  fabricante: 'Nombre del Fabricante'
}
```

## Editar un producto

1. Abre `js/productos-data.js`.
2. Localiza el objeto del producto por su `id` o `titulo`.
3. Modifica los campos que necesites.
4. Guarda el archivo.

## Imágenes de productos

- Coloca las imágenes en `images/productos/`.
- Formatos recomendados: JPG, PNG.
- Tamaño sugerido: mínimo 400x400 px

## URLs

- **Detalle de producto:** `producto.html?id=medidor-pinza-203`
- Los primeros 4 productos del array se muestran en la portada como "Productos Destacados".
