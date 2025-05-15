param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("light", "dark")]
    [string]$Theme
)

$personalizePath = "HKCU:\Software\Microsoft\Windows\CurrentVersion\Themes\Personalize"
$value = if ($Theme -eq "light") { 1 } else { 0 }

Set-ItemProperty -Path $personalizePath -Name "SystemUsesLightTheme" -Value $value
Set-ItemProperty -Path $personalizePath -Name "AppsUseLightTheme" -Value $value
Write-Host "Windows color theme set to $Theme."
