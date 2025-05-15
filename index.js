const { app, Tray, Menu } = require('electron');
const { execFile } = require('child_process');
const path = require('path');

let tray = null;

function setWindowsTheme(theme) {
  // Build the absolute path to the script
  const scriptPath = path.join(__dirname, 'set-theme.ps1');
  // Call PowerShell to run the script
  execFile(
    'powershell.exe',
    [
      '-NoProfile',
      '-ExecutionPolicy', 'Bypass',
      '-File', scriptPath,
      '-Theme', theme
    ],
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error setting theme: ${error}`);
        return;
      }
      console.log(stdout);
    }
  );
}

app.whenReady().then(() => {
  tray = new Tray('icon.png');
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Light Theme',
      click: () => setWindowsTheme('light')
    },
    {
      label: 'Dark Theme',
      click: () => setWindowsTheme('dark')
    },
    { type: 'separator' },
    { label: 'Quit', click: () => app.quit() }
  ]);
  tray.setToolTip('My Node Tray App');
  tray.setContextMenu(contextMenu);
});
