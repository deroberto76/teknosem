# Cómo crear el token de Cloudflare para Pages

El token actual no puede listar la cuenta (necesario para el script). Crea uno nuevo con estos pasos.

## Dónde crearlo

1. Entra en **Cloudflare Dashboard**: https://dash.cloudflare.com/
2. Ve a **My Profile** (icono de persona arriba a la derecha) → **API Tokens**.
   - O abre directo: https://dash.cloudflare.com/profile/api-tokens
3. Pulsa **Create Token**.

## Qué template usar

- **No uses** un template predefinido (Edit Cloudflare Workers, etc.).
- Usa **“Create Custom Token”** (enlace al final de la lista de templates).

## Permisos a añadir

En la sección **Permissions**:

| Resource   | Permission        | Nivel |
|-----------|-------------------|--------|
| Account   | Account Settings  | **Read**  |
| Account   | Cloudflare Pages  | **Edit**  |

- **Account Settings (Read):** para que el script pueda obtener tu Account ID y no tengas que ponerlo a mano en `.env`.
- **Cloudflare Pages (Edit):** para crear el proyecto Pages y vincularlo al repo de GitHub.

## Scope (alcance)

- **Account resources** → incluye **tu cuenta** (selecciona la cuenta donde quieres el proyecto Pages).

## Resumen en la UI

1. **Create Custom Token**
2. **Token name:** por ejemplo `Pages Teknosem`
3. **Permissions:**
   - Account → Account Settings → Read
   - Account → Cloudflare Pages → Edit
4. **Account resources** → Include → tu cuenta
5. **Continue to summary** → **Create Token**
6. **Copia el token** (solo se muestra una vez) y pégalo en `.env` (primera línea), sustituyendo el token anterior.

## Después de crear el token

1. Pega el nuevo token en `.env` (solo la primera línea).
2. Ejecuta de nuevo: `.\setup-cloudflare-pages.ps1`

### Importante: segunda línea de .env = Account ID, no API Key

- **Línea 1:** API Token (el que creaste con Create Custom Token). Es el que se usa para autenticarse.
- **Línea 2 (opcional):** Solo el **Account ID** — un código corto (~32 caracteres) que ves en la URL del dashboard:
  - Ejemplo de URL: `https://dash.cloudflare.com/a1b2c3d4e5f6789012345678abcdef12/pages`
  - El Account ID es: `a1b2c3d4e5f6789012345678abcdef12`

**No pongas** en la línea 2 la API Key completa ni otro token. Si pones un token largo ahí, el script lo ignorará y intentará obtener el Account ID por API (con el token de la línea 1).
