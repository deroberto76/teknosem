# Configura Cloudflare Pages para el repo GitHub deroberto76/teknosem
# Usa el token en .env (no subas .env al repo)

$ErrorActionPreference = "Stop"
$envPath = Join-Path $PSScriptRoot ".env"
if (-not (Test-Path $envPath)) {
    Write-Error "No existe .env con el token de Cloudflare. Crea .env con una sola linea: tu token."
    exit 1
}
$token = (Get-Content $envPath -First 1).Trim()
if ([string]::IsNullOrWhiteSpace($token)) {
    Write-Error "El archivo .env está vacío."
    exit 1
}

$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type"  = "application/json"
}

# 1. Obtener account ID (o usar ACCOUNT_ID en .env: segunda línea = account id)
$accountId = $null
if (Test-Path $envPath) {
    $lines = Get-Content $envPath | Where-Object { $_.Trim() -ne "" }
    if ($lines.Count -ge 2) { $accountId = $lines[1].Trim() }
}
if (-not $accountId) {
    Write-Host "Obteniendo cuenta de Cloudflare..."
    try {
        $accounts = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/accounts" -Headers $headers -Method Get
        if ($accounts.success -and $accounts.result.Count -gt 0) {
            $accountId = $accounts.result[0].id
        }
    }
    catch {
        $_.Exception.Response | Out-Null
    }
}
if (-not $accountId) {
    Write-Host ""
    Write-Host "No se pudo obtener el Account ID. Opciones:"
    Write-Host "1) Crea un token en Cloudflare con permisos: Account Settings (Read) + Pages (Edit)."
    Write-Host "2) O añade tu Account ID en la segunda línea de .env (Dashboard > derecho en la URL de tu cuenta)."
    Write-Host "   Ejemplo .env:"
    Write-Host "   <tu_token>"
    Write-Host "   <tu_account_id>"
    exit 1
}
Write-Host "Account ID: $accountId"

# 2. Crear proyecto Pages vinculado a GitHub
$body = @{
    name                = "teknosem"
    production_branch   = "main"
    source              = @{
        type   = "github"
        config = @{
            owner     = "deroberto76"
            repo_name = "teknosem"
        }
    }
    build_config        = @{
        build_command    = ""
        destination_dir  = ""
        root_dir         = ""
      }
} | ConvertTo-Json -Depth 5

Write-Host "Creando proyecto Pages (teknosem) conectado a GitHub..."
try {
    $create = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/accounts/$accountId/pages/projects" `
        -Headers $headers -Method Post -Body $body
    if ($create.success) {
        $proj = $create.result
        Write-Host "Proyecto creado: $($proj.name)"
        Write-Host "Subdominio: $($proj.subdomain)"
        Write-Host "URL esperada: https://teknosem.pages.dev (tras el primer deploy)"
    }
    else {
        Write-Host "Respuesta: $($create | ConvertTo-Json -Depth 3)"
        if ($create.errors) { Write-Error ($create.errors | ConvertTo-Json) }
    }
}
catch {
    $status = $_.Exception.Response.StatusCode.value__
    $reader = [System.IO.StreamReader]::new($_.Exception.Response.GetResponseStream())
    $errBody = $reader.ReadToEnd()
    Write-Host "HTTP $status - $errBody"
    Write-Error "Si el proyecto ya existe, conéctalo desde el dashboard: Workers & Pages > Create > Connect to Git > deroberto76/teknosem"
}
