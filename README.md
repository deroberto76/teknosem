# TEKNOSEM

Sitio web de TEKNOSEM: instrumentos de medición, inspección y control de calidad.

- **Repositorio:** [github.com/deroberto76/teknosem](https://github.com/deroberto76/teknosem)
- **Stack:** HTML, CSS y JavaScript (sin framework). Responsive.

## Despliegue en Cloudflare Pages

El código está en la rama `main`. Para publicar en Cloudflare Pages:

### Opción A: Dashboard (recomendado la primera vez)

1. Entra en [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
2. Autoriza GitHub si hace falta y elige el repo **deroberto76/teknosem**.
3. Configuración de build:
   - **Branch:** `main`
   - **Build command:** (dejar vacío)
   - **Build output directory:** `/` o vacío (sitio estático)
4. **Save and Deploy**. La URL quedará tipo `https://teknosem.pages.dev`.

### Opción B: Script con API (token en .env)

1. En [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens) crea un token con:
   - **Account** → Account Settings (Read)
   - **Account** → Cloudflare Pages (Edit)
2. Pega el token en el archivo **.env** (primera línea). Opcional: segunda línea = tu **Account ID** (lo ves en la URL del dashboard de Cloudflare).
3. Ejecuta:
   ```powershell
   .\setup-cloudflare-pages.ps1
   ```
4. La primera vez que conectes el repo por API, puede que tengas que autorizar **Cloudflare Pages** en GitHub (GitHub → Settings → Applications).

## Desarrollo local

Abre `index.html` en el navegador o usa un servidor local (por ejemplo Live Server en VS Code).

## Estructura

- `index.html` – Portada (hero, categorías, productos, contacto, footer)
- `css/style.css` – Estilos y responsive
- `js/main.js` – Formulario mailto y búsqueda
- `.env` – Token de Cloudflare (no se sube al repo)
