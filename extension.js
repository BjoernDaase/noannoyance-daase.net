const Main = imports.ui.main;
const WindowAttentionHandler = imports.ui.windowAttentionHandler;
const Shell = imports.gi.Shell;
const Lang = imports.lang;

class StealMyFocus {
  constructor() {
    this._tracker = Shell.WindowTracker.get_default();
    log('Disabling Window Is Ready Notification');
    global.display.disconnect(Main.windowAttentionHandler._windowDemandsAttentionId);
    this._handlerid = global.display.connect('window-demands-attention', this._onWindowDemandsAttention(this));
  }

  _onWindowDemandsAttention(display, window) {
    Main.activateWindow(window);
  }

  destroy() {
    global.display.disconnect(this._handlerid);
    global.display.connect('window-demands-attention', Main.windowAttentionHandler._onWindowDemandsAttention(Main.windowAttentionHandler));
  }
}

let stealmyfocus;

function init() {
}

function enable() {
  stealmyfocus = new StealMyFocus();
}

function disable() {
  stealmyfocus.destroy();
}
