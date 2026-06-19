$raw = [Console]::In.ReadToEnd()
$json = $raw | ConvertFrom-Json
$f = $json.tool_input.file_path
$ext = [System.IO.Path]::GetExtension($f)
if (@('.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs') -contains $ext) {
    npx eslint --fix "$f" 2>$null
}
