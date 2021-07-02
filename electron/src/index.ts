import { app, BrowserWindow, Menu, MenuItem, nativeImage, Tray } from "electron";
import { join } from "path";
import electronIsDev from 'electron-is-dev';
import electronServe from 'electron-serve';
import { CapElectronEventEmitter, getCapacitorConfig, setupCapacitorElectronPlugins, setupElectronDeepLinking } from "@capacitor-community/electron";

/////////////////////// Menus and Configs - Modify Freely //////////////////////////////////////////////
const TrayMenuTemplate = [
  new MenuItem({ label: "Quit App", role: "quit" })
];
const AppMenuBarMenuTemplate = [];
const DeepLinkingConfig = {customProtocol: 'mycapacitorapp'};
////////////////////////////////////////////////////////////////////////////////////////////////////////

// -------------------------------------------------------------------------------------------------- //

/////////////////////// Capacitor Electron Internals Modify At Own risk ////////////////////////////////
const CapacitorFileConfig = getCapacitorConfig()
class ElectronCapacitorApp {
  private MainWindow: BrowserWindow | null = null;
  private TrayIcon: Tray | null = null;
  private loadWebApp;
  
  constructor() {
    this.loadWebApp = electronServe({
      directory: join(app.getAppPath(), "app"),
      // The scheme can be changed to whatever you'd like (ex: someapp)
      scheme: CapacitorFileConfig.customUrlScheme ?? 'capacitor-electron',
    });
  }

  private async loadMainWindow(thisRef: any) {
    await thisRef.loadWebApp(thisRef.MainWindow);
  }

  getMainWindow() {
    return this.MainWindow;
  }

  async init() {
    this.MainWindow = new BrowserWindow({
      show: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        // Use preload to inject the electron varriant overrides for capacitor plugins.
        // Note: any windows you spawn that you want to include capacitor plugins must have this preload.
        preload: join(app.getAppPath(), "node_modules", "@capacitor-community", "electron", "dist", "runtime", "electron-rt.js"),
      },
    });

    this.MainWindow.on("closed", () => {});

    if (CapacitorFileConfig.trayIconAndMenuEnabled) {
      this.TrayIcon = new Tray(nativeImage.createFromPath(join(app.getAppPath(), 'assets', process.platform === "win32" ? "appIcon.ico" : "appIcon.png")));
      this.TrayIcon.on("double-click", () => {
        if (this.MainWindow) {
          if (this.MainWindow.isVisible()) {
            this.MainWindow.hide();
          } else {
            this.MainWindow.show();
            this.MainWindow.focus();
          }
        }
      });
      this.TrayIcon.on("click", () => {
        if (this.MainWindow) {
          if (this.MainWindow.isVisible()) {
            this.MainWindow.hide();
          } else {
            this.MainWindow.show();
            this.MainWindow.focus();
          }
        }
      });
      this.TrayIcon.setToolTip(app.getName());
      this.TrayIcon.setContextMenu(
        Menu.buildFromTemplate(TrayMenuTemplate)
      );
    }

    // Setup app windows menu bar
    Menu.setApplicationMenu(
      // @ts-ignore
      Menu.buildFromTemplate(AppMenuBarMenuTemplate)
    );

    this.loadMainWindow(this);

    // Link electron plugins in
    setupCapacitorElectronPlugins()

    this.MainWindow.webContents.on("dom-ready", () => {
      if (!CapacitorFileConfig.hideMainWindowOnLaunch) {
        this.MainWindow.show();
      }
      setTimeout(() => {
        CapElectronEventEmitter.emit("CAPELECTRON_DeeplinkListenerInitialized", "");
      }, 400);
    });
  }

}
const myCapacitorApp = new ElectronCapacitorApp();
if (CapacitorFileConfig.deepLinkingEnabled) {
  setupElectronDeepLinking(myCapacitorApp, DeepLinkingConfig);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////

// Run Application
(async () => {
  await app.whenReady();
  await myCapacitorApp.init()
})();

app.on("window-all-closed", function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", async function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (myCapacitorApp.getMainWindow().isDestroyed()) { 
    await myCapacitorApp.init();
  }
});

// Place all ipc or other electron api calls and custom functionality under this line
