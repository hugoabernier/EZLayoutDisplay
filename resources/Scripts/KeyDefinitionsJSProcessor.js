// Run on https://playcode.io/
// Public URL : https://259701.playcode.io/

function flatKeys(definitionKeyNames, definitionFlats) {
  // Transforms the keyDefinitions object to a flat object with the keyCode along with label.
  for (var i = 0; i < definitionKeyNames.length; i++) {
    const keyName = definitionKeyNames[i];
    let definitionFlat = {
      KeyCode: keyName
    }
    
    getChildProperties(definitions[keyName], definitionFlat);
    
    definitionFlats.push(definitionFlat);
  }
}

function getChildProperties(currentDefinition, definitionFlat) {
  const keyProperty = Object.keys(currentDefinition);
  for (let j = 0; j < keyProperty.length; j++) {
    const keyPropertyName = keyProperty[j];
    if (keyPropertyName == "os") {
      flatOs(currentDefinition[keyPropertyName], definitionFlat);
    }
    else {
      definitionFlat[keyPropertyName]= currentDefinition[keyPropertyName];
    }
  }
}

function flatOs(osList, definitionFlat) {
  const osKeys = Object.keys(osList);
  for (var i = 0; i < osKeys.length; i++) {
    if (osKeys[i] === 'osx' || osKeys[i] === 'linux') {
      continue;
    }
    
    const osPropertyKeys = Object.keys(osList[osKeys[i]]);
    for (var j = 0; j < osPropertyKeys.length; j++) {
      if (osPropertyKeys[j] === 'menuLabel') {
        continue;
      }
      definitionFlat[osPropertyKeys[j]] = osList[osKeys[i]][osPropertyKeys[j]]
    }
  }
}

const dualFunctionLabel  = "";
const forwardLayers   = "";
const otherLayers   = "";
const shortcutsLabel   = "";
const dualFunctionLabel5  = "";
const dualFunctionLabel6  = "";
const dualFunctionLabel7  = "";

const definitions = {
  KC_0: { label: "0", jsCode: "Digit0", category: "digit" },
  KC_1: { label: "1", jsCode: "Digit1", category: "digit" },
  KC_2: { label: "2", jsCode: "Digit2", category: "digit" },
  KC_3: { label: "3", jsCode: "Digit3", category: "digit" },
  KC_4: { label: "4", jsCode: "Digit4", category: "digit" },
  KC_5: { label: "5", jsCode: "Digit5", category: "digit" },
  KC_6: { label: "6", jsCode: "Digit6", category: "digit" },
  KC_7: { label: "7", jsCode: "Digit7", category: "digit" },
  KC_8: { label: "8", jsCode: "Digit8", category: "digit" },
  KC_9: { label: "9", jsCode: "Digit9", category: "digit" },
  KC_A: { label: "A", jsCode: "KeyA", category: "letters" },
  KC_B: { label: "B", jsCode: "KeyB", category: "letters" },
  KC_C: { label: "C", jsCode: "KeyC", category: "letters" },
  KC_D: { label: "D", jsCode: "KeyD", category: "letters" },
  KC_E: { label: "E", jsCode: "KeyE", category: "letters" },
  KC_F: { label: "F", jsCode: "KeyF", category: "letters" },
  KC_G: { label: "G", jsCode: "KeyG", category: "letters" },
  KC_H: { label: "H", jsCode: "KeyH", category: "letters" },
  KC_I: { label: "I", jsCode: "KeyI", category: "letters" },
  KC_J: { label: "J", jsCode: "KeyJ", category: "letters" },
  KC_K: { label: "K", jsCode: "KeyK", category: "letters" },
  KC_L: { label: "L", jsCode: "KeyL", category: "letters" },
  KC_M: { label: "M", jsCode: "KeyM", category: "letters" },
  KC_N: { label: "N", jsCode: "KeyN", category: "letters" },
  KC_O: { label: "O", jsCode: "KeyO", category: "letters" },
  KC_P: { label: "P", jsCode: "KeyP", category: "letters" },
  KC_Q: { label: "Q", jsCode: "KeyQ", category: "letters" },
  KC_R: { label: "R", jsCode: "KeyR", category: "letters" },
  KC_S: { label: "S", jsCode: "KeyS", category: "letters" },
  KC_T: { label: "T", jsCode: "KeyT", category: "letters" },
  KC_U: { label: "U", jsCode: "KeyU", category: "letters" },
  KC_V: { label: "V", jsCode: "KeyV", category: "letters" },
  KC_W: { label: "W", jsCode: "KeyW", category: "letters" },
  KC_X: { label: "X", jsCode: "KeyX", category: "letters" },
  KC_Y: { label: "Y", jsCode: "KeyY", category: "letters" },
  KC_Z: { label: "Z", jsCode: "KeyZ", category: "letters" },
  KC_ASDN: {
    label: "Autoshift timeout down",
    description: "Lower the Auto Shift timeout variable (down)",
    category: "autoshift"
  },
  KC_ASUP: {
    label: "Autoshift timeout up",
    description: "Raise the Auto Shift timeout variable (up)",
    category: "autoshift"
  },
  KC_ASRP: {
    label: "Autoshift report",
    description: "Report your current Auto Shift timeout value",
    category: "autoshift"
  },
  KC_ASON: {
    label: "Autoshift on",
    description: "Turns on the Auto Shift Function",
    category: "autoshift"
  },
  KC_ASOFF: {
    label: "Autoshift off",
    description: "Turns off the Auto Shift Function",
    category: "autoshift"
  },
  KC_ASTG: {
    label: "Autoshift toggle",
    description: "Toggles the state of the Auto Shift feature",
    category: "autoshift"
  },
  ALL_T: {
    command: "KC_NO",
    label: dualFunctionLabel,
    menuLabel: "Hyper",
    params: { command: true },
    category: "dualFunction",
    description: "Holding acts as Hyper (Alt+Shift+Ctrl+Cmd)"
  },
  MEH_T: {
    command: "KC_NO",
    label: dualFunctionLabel,
    params: { command: true },
    menuLabel: "Meh",
    category: "dualFunction",
    description: "Holding acts as Meh (Alt+Shift+Ctrl)"
  },
  SCMD_T: {
    command: "KC_NO",
    menuLabel: "SCMD",
    label: dualFunctionLabel,
    params: { command: true },
    category: "dualFunction",
    description:
      "Tapping results in the keystroke specified in <command> - holding acts as Shift + Win/Cmd"
  },
  LSFT_T: {
    command: "KC_NO",
    altLabel: "⇧",
    menuLabel: "Left Shift",
    category: "dualFunction",
    label: dualFunctionLabel,
    params: { command: true },
    description:
      "Tapping results in the keystroke specified in <command> - holding acts as Left Shift"
  },
  LALT_T: {
    command: "KC_NO",
    menuLabel: "Left Alt",
    label: dualFunctionLabel,
    params: { command: true },
    category: "dualFunction",
    description:
      "Tapping results in the keystroke specified in <command> - holding acts as Left Alt"
  },
  LCTL_T: {
    command: "KC_NO",
    menuLabel: "Left Ctrl",
    label: dualFunctionLabel,
    params: { command: true },
    category: "dualFunction",
    description:
      "Tapping results in the keystroke specified in <command> - holding acts as Left Control"
  },
  LGUI_T: {
    command: "KC_NO",
    menuLabel: "Left Cmd/Win",
    label: dualFunctionLabel,
    params: { command: true },
    category: "dualFunction",
    description:
      "Tapping results in the keystroke specified in <command> - holding acts as Left Win/Cmd"
  },
  RSFT_T: {
    command: "KC_NO",
    altLabel: "⇧",
    menuLabel: "Right Shift",
    label: dualFunctionLabel,
    params: { command: true },
    category: "dualFunction",
    description:
      "Tapping results in the keystroke specified in <command> - holding acts as Right Shift"
  },
  RALT_T: {
    command: "KC_NO",
    menuLabel: "Right Alt",
    label: dualFunctionLabel,
    params: { command: true },
    category: "dualFunction",
    description:
      "Tapping results in the keystroke specified in <command> - holding acts as Right Alt (AltGr)"
  },
  RCTL_T: {
    command: "KC_NO",
    menuLabel: "Right Ctrl",
    label: dualFunctionLabel,
    params: { command: true },
    category: "dualFunction",
    description:
      "Tapping results in the keystroke specified in <command> - holding acts as Right Control"
  },
  RGUI_T: {
    command: "KC_NO",
    menuLabel: "Right Cmd/Win",
    label: dualFunctionLabel,
    params: { command: true },
    category: "dualFunction",
    description:
      "Tapping results in the keystroke specified in <command> - holding acts as Right Win/Cmd"
  },
  C_S_T: {
    command: "KC_NO",
    menuLabel: "Ctrl+Shift",
    label: dualFunctionLabel,
    params: { command: true },
    category: "dualFunction",
    description:
      "Tapping results in the keystroke specified in <command> - holding acts as Left Ctrl + Shift"
  },
  LCA_T: {
    command: "KC_NO",
    menuLabel: "Ctrl+Alt",
    label: dualFunctionLabel,
    params: { command: true },
    category: "dualFunction",
    description:
      "Tapping results in the keystroke specified in <command> - holding acts as Left Ctrl + Alt"
  },
  KC_F1: { label: "F1", jsCode: "F1", category: "fn" },
  KC_F2: { label: "F2", jsCode: "F2", category: "fn" },
  KC_F3: { label: "F3", jsCode: "F3", category: "fn" },
  KC_F4: { label: "F4", jsCode: "F4", category: "fn" },
  KC_F5: { label: "F5", jsCode: "F5", category: "fn" },
  KC_F6: { label: "F6", jsCode: "F6", category: "fn" },
  KC_F7: { label: "F7", jsCode: "F7", category: "fn" },
  KC_F8: { label: "F8", jsCode: "F8", category: "fn" },
  KC_F9: { label: "F9", jsCode: "F9", category: "fn" },
  KC_F10: { label: "F10", jsCode: "F10", category: "fn" },
  KC_F11: { label: "F11", jsCode: "F11", category: "fn" },
  KC_F12: { label: "F12", jsCode: "F12", category: "fn" },
  KC_F13: { label: "F13", jsCode: "F13", category: "fn" },
  KC_F14: {
    jsCode: "F14",
    category: "fn",
    os: {
      others: {
        label: "F14",
        menuLabel: "F14"
      },
      osx: {
        glyph: "brightness-down icon-big",
        menuLabel: "F14 (Mac)",
        description:
          "Decrease Mac screen brightness. Only works when you disconnect other keyboards."
      }
    }
  },
  KC_F15: {
    jsCode: "F15",
    category: "fn",
    os: {
      others: {
        label: "F15",
        menuLabel: "F15"
      },
      osx: {
        glyph: "brightness-up icon-big",
        menuLabel: "F15 (Mac)",
        description:
          "Increase Mac screen brightness. Only works when you disconnect other keyboards."
      }
    }
  },
  KC_F16: { label: "F16", jsCode: "F16", category: "fn" },
  KC_F17: { label: "F17", jsCode: "F17", category: "fn" },
  KC_F18: { label: "F18", jsCode: "F18", category: "fn" },
  KC_F19: { label: "F19", jsCode: "F19", category: "fn" },
  KC_F20: { label: "F20", jsCode: "F20", category: "fn" },
  KC_F21: { label: "F21", jsCode: "F21", category: "fn" },
  KC_F22: { label: "F22", jsCode: "F22", category: "fn" },
  KC_F23: { label: "F23", jsCode: "F23", category: "fn" },
  KC_F24: { label: "F24", jsCode: "F24", category: "fn" },
  TG: {
    label: ({ layer }) => `❐ ${layer}`,
    menuLabel: "TG",
    params: { layer: forwardLayers },
    precedingKey: true,
    category: "layer",
    description:
      "Toggle layer: Switch to a given layer. Tap this key again to return to the current layer."
  },
  MO: {
    label: ({ layer }) => `⟲ ${layer}`,
    menuLabel: "MO",
    params: { layer: forwardLayers },
    precedingKey: true,
    category: "layer",
    description:
      "Momentary layer toggle: Activates the selected layer, but only as long as you keep this key pressed."
  },
  OSL: {
    label: ({ layer }) => `OSL ${layer}`,
    menuLabel: "OSL",
    params: { layer: forwardLayers },
    maxLayers: 16,
    precedingKey: true,
    category: "layer",
    description:
      "One-shot layer: Flips a layer on, but only for one keypress. Once you press a key in the new layer, the layer is then deactivated. You can keep the layer active by holding the key down."
  },
  TO: {
    label: ({ layer }) => `TO ${layer}`,
    menuLabel: "TO",
    params: { layer: otherLayers },
    maxLayers: 16,
    category: "layer",
    description:
      "Direct switch to a layer. Works for switching to lower layers as well."
  },
  TT: {
    label: ({ layer }) => `TT ${layer}`,
    menuLabel: "TT",
    params: { layer: forwardLayers },
    category: "layer",
    description:
      "Layer Tap-Toggle. If you hold the key down, the layer becomes active, and then deactivates when you let go. And if you tap it, the layer simply becomes active (toggles on)."
  },
  LT: {
    command: "KC_NO",
    label: ({ code, layer, command, os }) => {
      const firstLabel = dualFunctionLabel({ code, command, os })[0];
      return [firstLabel, `LT → ${layer}`];
    },
    params: { layer: forwardLayers, command: true },
    maxLayers: 16,
    menuLabel: "LT",
    precedingKey: true,
    category: "layerShortcuts",
    description:
      "Momentary Layer Toggle: Switch to the selected layer when held, send the selected key when tapped"
  },
  KC_AUDIO_MUTE: {
    label: "Mute",
    glyph: "volume-off",
    jsCode: "AudioVolumeMute",
    category: "media"
  },
  KC_AUDIO_VOL_UP: {
    label: "Volume up",
    glyph: "volume-up",
    jsCode: "AudioVolumeUp",
    category: "media"
  },
  KC_AUDIO_VOL_DOWN: {
    label: "Volume down",
    glyph: "volume-down",
    jsCode: "AudioVolumeDown",
    category: "media"
  },
  KC_MEDIA_NEXT_TRACK: {
    label: "Next",
    glyph: "step-forward",
    jsCode: "MediaTrackNext",
    category: "media"
  },
  KC_MEDIA_PREV_TRACK: {
    label: "Prev",
    glyph: "step-backward",
    jsCode: "MediaTrackPrevious",
    category: "media"
  },
  KC_MEDIA_STOP: {
    label: "Stop",
    glyph: "stop",
    jsCode: "MediaStop",
    category: "media"
  },
  KC_MEDIA_PLAY_PAUSE: {
    label: "Play",
    glyph: "play",
    jsCode: "MediaPlayPause",
    category: "media"
  },
  KC_MEDIA_EJECT: { label: "Eject", jsCode: "Eject", category: "media" },
  KC_MAIL: { label: "Mail", jsCode: "LaunchMail", category: "media" },
  KC_CALCULATOR: { label: "Calc", jsCode: "LaunchApp2", category: "media" },
  KC_MY_COMPUTER: {
    label: "File manager",
    jsCode: "LaunchApp1",
    category: "media"
  },
  KC_WWW_SEARCH: {
    label: "Search",
    jsCode: "BrowserSearch",
    category: "media"
  },
  KC_WWW_HOME: { label: "WWW Home", jsCode: "BrowserHome", category: "media" },
  KC_WWW_BACK: {
    label: "WWW Back",
    jsCode: "BrowserBack",
    category: "media"
  },
  KC_WWW_FORWARD: {
    label: "WWW Fwd",
    jsCode: "BrowserForward",
    category: "media"
  },
  KC_WWW_REFRESH: {
    label: "Refresh",
    jsCode: "BrowserRefresh",
    category: "media"
  },
  KC_WWW_FAVORITES: {
    label: "Favorites",
    jsCode: "BrowserFavorites",
    category: "media"
  },
  KC_MEDIA_FAST_FORWARD: {
    label: "Fast forward",
    category: "media"
  },
  KC_MEDIA_REWIND: { label: "Rewind", category: "media" },
  KC_LSHIFT: {
    label: "⇧",
    menuLabel: "Left Shift",
    jsCode: "ShiftLeft",
    category: "modifier"
  },
  KC_RSHIFT: {
    label: "⇧",
    menuLabel: "Right Shift",
    jsCode: "ShiftRight",
    category: "modifier"
  },
  KC_LCTRL: { label: "Left Ctrl", jsCode: "ControlLeft", category: "modifier" },
  KC_RCTRL: {
    label: "Right Ctrl",
    jsCode: "ControlRight",
    category: "modifier"
  },
  KC_LALT: {
    jsCode: "AltLeft",
    category: "modifier",
    os: {
      others: {
        label: "Left Alt",
        menuLabel: "Left Alt"
      },
      osx: {
        glyph: "alt icon-small",
        menuLabel: "Left Option (Mac)"
      }
    }
  },
  KC_RALT: {
    jsCode: "AltRight",
    category: "modifier",
    description: "Also known as AltGr.",
    os: {
      others: {
        label: "Right Alt",
        menuLabel: "Right Alt"
      },
      osx: {
        glyph: "alt icon-small",
        menuLabel: "Right Option (Mac)"
      }
    }
  },
  KC_LGUI: {
    category: "modifier",
    jsCode: "MetaLeft",
    os: {
      osx: {
        label: "⌘",
        glyph: "command",
        menuLabel: "Left Command (Mac)"
      },
      win: {
        label: "win",
        glyph: "windows",
        menuLabel: "Left Win"
      },
      linux: {
        label: "tux",
        glyph: "linux zoomed",
        menuLabel: "Left Meta (Linux)"
      }
    }
  },
  KC_RGUI: {
    category: "modifier",
    jsCode: "MetaRight",
    os: {
      osx: {
        label: "⌘",
        glyph: "command",
        menuLabel: "Right Command (Mac)"
      },
      win: {
        label: "win",
        glyph: "windows",
        menuLabel: "Right Win"
      },
      linux: {
        label: "tux",
        glyph: "linux zoomed",
        menuLabel: "Right Meta (Linux)"
      }
    }
  },
  OSM: {
    command: "MOD_LCTL",
    category: "modifier",
    params: { modifier: true },
    label: dualFunctionLabel,
    menuLabel: "OSM",
    modifiable: false,
    description:
      "One-shot modifier: Turns a modifier on, but only for one keypress. Once you press a key in the modifier is then deactivated. You can keep the modifier active by holding the key down."
  },
  MOD_LSFT: {
    label: "⇧",
    menuLabel: "Shift",
    jsCode: "ShiftLeft",
    category: "modifier",
    description: "Shift",
    modifierCommand: true
  },
  MOD_RSFT: {
    label: "⇧",
    jsCode: "ShiftRight",
    modifierCommand: true,
    category: "modifier"
  },
  MOD_LCTL: {
    label: "Left Ctrl",
    jsCode: "ControlLeft",
    modifierCommand: true,
    category: "modifier"
  },
  MOD_RCTL: {
    label: "Right Ctrl",
    jsCode: "ControlRight",
    modifierCommand: true,
    category: "modifier"
  },
  MOD_LALT: {
    jsCode: "AltLeft",
    category: "modifier",
    modifierCommand: true,
    description: "Alt",
    os: {
      others: {
        label: "Alt",
        menuLabel: "Alt"
      },
      osx: {
        glyph: "alt icon-small",
        menuLabel: "Left Option (Mac)"
      }
    }
  },
  MOD_RALT: {
    jsCode: "AltRight",
    category: "modifier",
    modifierCommand: true,
    description: "Right Alt, also known as AltGr.",
    os: {
      others: {
        label: "AltGr",
        menuLabel: "AltGr"
      },
      osx: {
        glyph: "alt icon-small",
        menuLabel: "Right Option (Mac)"
      }
    }
  },
  MOD_LGUI: {
    category: "modifier",
    jsCode: "MetaLeft",
    modifierCommand: true,
    os: {
      osx: {
        label: "⌘",
        glyph: "command",
        menuLabel: "Left Command (Mac)"
      },
      win: {
        label: "win",
        glyph: "windows",
        menuLabel: "Left Win"
      },
      linux: {
        label: "tux",
        glyph: "linux zoomed",
        menuLabel: "Left Meta (Linux)"
      }
    }
  },
  MOD_RGUI: {
    category: "modifier",
    jsCode: "MetaRight",
    modifierCommand: true,
    os: {
      osx: {
        label: "⌘",
        glyph: "command",
        menuLabel: "Right Command (Mac)"
      },
      win: {
        label: "win",
        glyph: "windows",
        menuLabel: "Right Win"
      },
      linux: {
        label: "tux",
        glyph: "linux zoomed",
        menuLabel: "Right Meta (Linux)"
      }
    }
  },
  MOD_HYPR: {
    label: "Hyper",
    menuLabel: "Hyper",
    modifierCommand: true,
    category: "modifier"
  },
  MOD_MEH: {
    label: "Meh",
    menuLabel: "Meh",
    modifierCommand: true,
    category: "modifier"
  },
  KC_MS_UP: {
    label: "Move up",
    glyph: "mouse-up bolded zoomed",
    category: "mouse"
  },
  KC_MS_DOWN: {
    label: "Move down",
    glyph: "mouse-down bolded zoomed",
    category: "mouse"
  },
  KC_MS_LEFT: {
    label: "Move left",
    glyph: "mouse-left bolded zoomed",
    category: "mouse"
  },
  KC_MS_RIGHT: {
    label: "Move right",
    glyph: "mouse-right bolded zoomed",
    category: "mouse"
  },
  KC_MS_BTN1: {
    label: "Left click",
    glyph: "left-click bolded zoomed",
    category: "mouse"
  },
  KC_MS_BTN2: {
    label: "Right click",
    glyph: "right-click bolded zoomed",
    category: "mouse"
  },
  KC_MS_BTN3: {
    label: "Middle click",
    glyph: "middle-click bolded zoomed",
    category: "mouse"
  },
  KC_MS_BTN4: { label: "Button 4", category: "mouse" },
  KC_MS_BTN5: { label: "Button 5", category: "mouse" },
  KC_MS_WH_UP: { label: "Wheel Up", category: "mouse" },
  KC_MS_WH_DOWN: { label: "Wheel Down", category: "mouse" },
  KC_MS_WH_LEFT: { label: "Wheel Left", category: "mouse" },
  KC_MS_WH_RIGHT: { label: "Wheel Right", category: "mouse" },
  KC_MS_ACCEL0: { label: "Acceleration 0", category: "mouse" },
  KC_MS_ACCEL1: { label: "Acceleration 1", category: "mouse" },
  KC_MS_ACCEL2: { label: "Acceleration 2", category: "mouse" },
  KC_TRANSPARENT: {
    label: "",
    menuLabel: false,
    jsCode: -1,
    category: "other"
  },
  KC_BSPACE: {
    label: "⌫",
    menuLabel: "Backspace",
    jsCode: "Backspace",
    category: "spacing"
  },
  KC_TAB: { label: "Tab", jsCode: "Tab", category: "spacing" },
  KC_ENTER: {
    label: "⏎",
    menuLabel: "Enter",
    jsCode: "Enter",
    category: "spacing"
  },
  LALT: {
    label: shortcutsLabel,
    command: "KC_NO",
    menuLabel: "Alt",
    params: { command: true },
    category: "shortcuts",
    description: "Alt"
  },
  KC_PAUSE: { label: "Pause", jsCode: "Pause", category: "other" },
  KC_ESCAPE: { label: "Esc", jsCode: "Escape", category: "spacing" },
  KC_SPACE: {
    label: "⎵",
    menuLabel: "Space",
    jsCode: "Space",
    category: "spacing",
    description: "Spacebar"
  },
  KC_PGUP: {
    label: "PgUp",
    menuLabel: "Page Up",
    jsCode: "PageUp",
    category: "nav"
  },
  KC_APPLICATION: {
    label: "Application",
    glyph: "list-alt zoomed",
    jsCode: "ContextMenu",
    category: "nav"
  },
  KC_PGDOWN: {
    label: "PgDn",
    menuLabel: "Page Down",
    jsCode: "PageDown",
    category: "nav"
  },
  KC_END: { label: "End", jsCode: "End", category: "nav" },
  KC_HOME: { label: "Home", jsCode: "Home", category: "nav" },
  KC_LEFT: {
    label: "◀",
    menuLabel: "Left arrow",
    jsCode: "ArrowLeft",
    category: "nav"
  },
  KC_UP: {
    label: "▲",
    menuLabel: "Up arrow",
    jsCode: "ArrowUp",
    category: "nav"
  },
  KC_RIGHT: {
    label: "▶",
    menuLabel: "Right arrow",
    jsCode: "ArrowRight",
    category: "nav"
  },
  KC_DOWN: {
    label: "▼",
    menuLabel: "Down arrow",
    jsCode: "ArrowDown",
    category: "nav"
  },
  KC_PSCREEN: {
    label: "SysRq",
    jsCode: "PrintScreen",
    category: "nav",
    description:
      "Also known as Print Screen. Alt+SysRq would give you the Linux Magic SysRq combo on one key."
  },
  KC_INSERT: {
    label: "Ins",
    jsCode: "Insert",
    category: "nav",
    menuLabel: "Insert"
  },
  KC_DELETE: {
    label: "Del",
    jsCode: "Delete",
    category: "nav",
    menuLabel: "Delete"
  },
  KC_SCROLLLOCK: { label: "Scroll lock", jsCode: "ScollLock", category: "nav" },
  KC_KP_0: { label: "0", jsCode: "Numpad0", category: "numpad" },
  KC_KP_1: { label: "1", jsCode: "Numpad1", category: "numpad" },
  KC_KP_2: { label: "2", jsCode: "Numpad2", category: "numpad" },
  KC_KP_3: { label: "3", jsCode: "Numpad3", category: "numpad" },
  KC_KP_4: { label: "4", jsCode: "Numpad4", category: "numpad" },
  KC_KP_5: { label: "5", jsCode: "Numpad5", category: "numpad" },
  KC_KP_6: { label: "6", jsCode: "Numpad6", category: "numpad" },
  KC_KP_7: { label: "7", jsCode: "Numpad7", category: "numpad" },
  KC_KP_8: { label: "8", jsCode: "Numpad8", category: "numpad" },
  KC_KP_9: { label: "9", jsCode: "Numpad9", category: "numpad" },
  KC_KP_ENTER: { label: "Enter", jsCode: "NumpadEnter", category: "numpad" },
  KC_KP_ASTERISK: {
    label: "*",
    jsCode: "NumpadMultiply",
    category: "numpad",
    description: "Asterisk/Star"
  },
  KC_KP_PLUS: {
    label: "+",
    jsCode: "NumpadAdd",
    category: "numpad",
    description: "Plus"
  },
  KC_KP_MINUS: {
    label: "-",
    jsCode: "NumpadSubtract",
    category: "numpad",
    description: "Minus"
  },
  KC_KP_DOT: {
    label: ".",
    jsCode: "NumpadDecimal",
    category: "numpad",
    description: "Numpad dot"
  },
  KC_KP_COMMA: { label: ",", jsCode: "NumpadComma", category: "numpad" },
  KC_KP_SLASH: { label: "/", jsCode: "NumpadDivide", category: "numpad" },
  KC_NUMLOCK: { label: "Numlock", jsCode: "NumLock", category: "numpad" },
  KC_SCOLON: {
    label: ";",
    jsCode: "Semicolon",
    category: "punct",
    description: "Semicolon"
  },
  KC_EQUAL: {
    label: "=",
    jsCode: "Equal",
    category: "punct",
    description: "Equal sign"
  },
  KC_COMMA: {
    label: ",",
    jsCode: "Comma",
    category: "punct",
    description: "Comma"
  },
  KC_MINUS: {
    label: "-",
    jsCode: "Minus",
    category: "punct",
    description: "Minus"
  },
  KC_DOT: {
    label: ".",
    jsCode: "Period",
    category: "punct",
    description: "Dot (also known as a period or a full stop)"
  },
  KC_SLASH: { label: "/", jsCode: "Slash", category: "punct" },
  KC_GRAVE: {
    label: "`",
    jsCode: "Backquote",
    category: "punct",
    description: "Backtick (grave accent)"
  },
  KC_NONUS_HASH: { label: "Non-US # and ~", category: "punct" },
  KC_LBRACKET: {
    label: "[",
    jsCode: "BracketLeft",
    category: "punct",
    description: "Left bracket (hold Shift for curly brace)"
  },
  KC_BSLASH: { label: "\\", jsCode: "Backslash", category: "punct" },
  KC_RBRACKET: {
    label: "]",
    jsCode: "BracketRight",
    category: "punct",
    description: "Right bracket (hold Shift for curly brace)"
  },
  KC_QUOTE: {
    label: "'",
    jsCode: "Quote",
    category: "punct",
    description: "Single quote (hold Shift for double quote)"
  },
  KC_CAPSLOCK: {
    label: "Caps",
    jsCode: "Capslock",
    category: "punct",
    description: "Caps lock"
  },
  KC_NONUS_BSLASH: {
    label: "Non-US \\",
    jsCode: "IntlBackslash",
    category: "punct",
    description: "Non-US backslash and pipe"
  },
  KC_NO: { label: "None", category: "other" },
  RESET: {
    label: "Reset",
    category: "fw",
    description:
      "Resets the keyboard back to the Teensy bootloader, to flash new firmware."
  },
  KC_POWER: { label: "Power", category: "other" },
  KC_UNDO: {
    label: "Undo (Mac)",
    jsCode: "Undo",
    category: "other",
    description: "For one-key Undo on Windows, use Z modified by Ctrl"
  },
  KC_CUT: {
    label: "Cut (Mac)",
    jsCode: "Cut",
    category: "other",
    description: "For one-key Cut on Windows, use X modified by Ctrl"
  },
  KC_COPY: {
    label: "Copy (Mac)",
    jsCode: "Copy",
    category: "other",
    description: "For one-key Copy on Windows, use C modified by Ctrl"
  },
  KC_PASTE: {
    label: "Paste (Mac)",
    jsCode: "Paste",
    category: "other",
    description: "For one-key Paste on Windows, use V modified by Ctrl"
  },
  KC_FIND: { label: "Find", jsCode: "Find", category: "other" },
  KC_LANG1: {
    label: "LANG 1",
    jsCode: "Lang1",
    category: "lang",
    description: "Language 1 key for Asian languages"
  },
  KC_LANG2: {
    label: "LANG 2",
    jsCode: "Lang2",
    category: "lang",
    description: "Language 2 key for Asian languages"
  },
  KC_LANG3: { label: "LANG 3", jsCode: "Lang3", category: "lang" },
  KC_LANG4: { label: "LANG 4", jsCode: "Lang4", category: "lang" },
  KC_LANG5: { label: "LANG 5", jsCode: "Lang5", category: "lang" },
  KC_LANG6: { label: "LANG 6", jsCode: "Lang6", category: "lang" },
  KC_LANG7: { label: "LANG 7", jsCode: "Lang7", category: "lang" },
  KC_LANG8: { label: "LANG 8", jsCode: "Lang8", category: "lang" },
  KC_LANG9: { label: "LANG 9", jsCode: "Lang9", category: "lang" },
  KC_SYSTEM_POWER: { label: "Power", jsCode: "Power", category: "system" },
  KC_SYSTEM_SLEEP: { label: "Sleep", jsCode: "Sleep", category: "system" },
  KC_SYSTEM_WAKE: { label: "Wake", jsCode: "WakeUp", category: "system" },
  KC_LSPO: {
    label: "Shift (",
    category: "other",
    description:
      'Space Cadet Shift: When held, acts as Shift; when tapped, sends "(" (opening parentheses). Great for your left shift key.'
  },
  KC_RSPC: {
    label: "Shift )",
    category: "other",
    description:
      'Space Cadet Shift: When held, acts as Shift; when tapped, sends ")" (closing parentheses). Great for your right shift key.'
  },
  KC_EXLM: { label: "!", category: "shiftedPunct" },
  KC_AT: { label: "@", category: "shiftedPunct" },
  KC_LCBR: { label: "{", category: "shiftedPunct" },
  KC_RCBR: { label: "}", category: "shiftedPunct" },
  KC_PIPE: { label: "|", category: "shiftedPunct" },
  KC_HASH: { label: "#", category: "shiftedPunct" },
  KC_DLR: { label: "$", category: "shiftedPunct" },
  KC_LPRN: { label: "(", category: "shiftedPunct" },
  KC_RPRN: { label: ")", category: "shiftedPunct" },
  KC_PERC: { label: "%", category: "shiftedPunct" },
  KC_CIRC: { label: "^", category: "shiftedPunct" },
  KC_AMPR: { label: "&", category: "shiftedPunct" },
  KC_ASTR: { label: "*", category: "shiftedPunct" },
  KC_PLUS: {
    label: "+",
    category: "shiftedPunct",
    description: "Plus"
  },
  KC_TILD: { label: "~", category: "shiftedPunct" },
  KC_COLN: { label: ":", category: "shiftedPunct" },
  KC_UNDS: { label: "_", category: "shiftedPunct" },
  EPRM: {
    label: "EEPROM",
    category: "fw",
    description:
      "Wipe the EEPROM. Should be used sparingly, for troubleshooting only."
  },
  KC_DQUO: { label: '"', category: "shiftedPunct" },
  KC_LABK: { label: "<", category: "shiftedPunct" },
  KC_RABK: { label: ">", category: "shiftedPunct" },
  KC_QUES: { label: "?", category: "shiftedPunct" },
  ES_OVRR: { label: "º", category: "spanish" },
  ES_APOS: { label: "'", category: "spanish" },
  ES_IEXL: { label: "¡", category: "spanish" },
  ES_GRV: { label: "`", category: "spanish" },
  ES_PLUS: { label: "+", category: "spanish" },
  ES_NTIL: { label: "ñ", category: "spanish" },
  ES_ACUT: { label: "´", category: "spanish" },
  ES_LESS: { label: "<", category: "spanish" },
  ES_MINS: { label: "-", category: "spanish" },
  ES_ASML: { label: "ª", category: "spanish" },
  ES_QUOT: { label: '"', category: "spanish" },
  ES_OVDT: { label: "·", category: "spanish" },
  ES_AMPR: { label: "&", category: "spanish" },
  ES_SLSH: { label: "/", category: "spanish" },
  ES_LPRN: { label: "(", category: "spanish" },
  ES_RPRN: { label: ")", category: "spanish" },
  ES_EQL: { label: "=", category: "spanish" },
  ES_QUES: { label: "?", category: "spanish" },
  ES_IQUE: { label: "¿", category: "spanish" },
  ES_CIRC: { label: "^", category: "spanish" },
  ES_ASTR: { label: "*", category: "spanish" },
  ES_GRTR: { label: ">", category: "spanish" },
  ES_SCLN: { label: ";", category: "spanish" },
  ES_COLN: { label: ":", category: "spanish" },
  ES_UNDS: { label: "_", category: "spanish" },
  ES_BSLS: { label: "\\", category: "spanish" },
  ES_PIPE: { label: "|", category: "spanish" },
  ES_AT: { label: "@", category: "spanish" },
  ES_HASH: { label: "#", category: "spanish" },
  ES_TILD: { label: "~", category: "spanish" },
  ES_EURO: { label: "½", category: "spanish" },
  ES_NOT: { label: "¬", category: "spanish" },
  ES_LBRC: { label: "[", category: "spanish" },
  ES_RBRC: { label: "]", category: "spanish" },
  ES_LCBR: { label: "{", category: "spanish" },
  ES_RCBR: { label: "}", category: "spanish" },
  FR_SUP2: { category: "french", label: "²", description: "Exposant 2" },
  FR_AMP: { category: "french", label: "&" },
  FR_EACU: { category: "french", label: "é" },
  FR_QUOT: { category: "french", label: '"' },
  FR_APOS: { category: "french", label: "'", description: "Apostrophe" },
  FR_LPRN: { category: "french", label: "(" },
  FR_MINS: { category: "french", label: "-" },
  FR_EGRV: { category: "french", label: "è" },
  FR_UNDS: { category: "french", label: "_" },
  FR_CCED: { category: "french", label: "ç" },
  FR_AGRV: { category: "french", label: "à" },
  FR_RPRN: { category: "french", label: ")" },
  FR_EQL: { category: "french", label: "=" },
  FR_A: { category: "french", label: "A" },
  FR_Z: { category: "french", label: "Z" },
  FR_CIRC: { category: "french", label: "^" },
  FR_DLR: { category: "french", label: "$" },
  FR_Q: { category: "french", label: "Q" },
  FR_M: { category: "french", label: "M" },
  FR_UGRV: { category: "french", label: "ù" },
  FR_ASTR: { category: "french", label: "*" },
  FR_LESS: { category: "french", label: "<" },
  FR_W: { category: "french", label: "W" },
  FR_COMM: { category: "french", label: "," },
  FR_SCLN: { category: "french", label: ";" },
  FR_COLN: { category: "french", label: ":" },
  FR_EXLM: { category: "french", label: "!" },
  FR_1: { category: "french", label: "1" },
  FR_2: { category: "french", label: "2" },
  FR_3: { category: "french", label: "3" },
  FR_4: { category: "french", label: "4" },
  FR_5: { category: "french", label: "5" },
  FR_6: { category: "french", label: "6" },
  FR_7: { category: "french", label: "7" },
  FR_8: { category: "french", label: "8" },
  FR_9: { category: "french", label: "9" },
  FR_0: { category: "french", label: "0" },
  FR_OVRR: { category: "french", label: "°" },
  FR_PLUS: { category: "french", label: "+" },
  FR_UMLT: { category: "french", label: "¨", description: "Tréma" },
  FR_PND: { category: "french", label: "£" },
  FR_PERC: { category: "french", label: "%" },
  FR_MU: { category: "french", label: "μ" },
  FR_GRTR: { category: "french", label: ">" },
  FR_QUES: { category: "french", label: "?" },
  FR_DOT: { category: "french", label: "." },
  FR_SLSH: { category: "french", label: "/" },
  FR_SECT: { category: "french", label: "§" },
  FR_TILD: { category: "french", label: "~" },
  FR_HASH: { category: "french", label: "#" },
  FR_LCBR: { category: "french", label: "{" },
  FR_LBRC: { category: "french", label: "[" },
  FR_PIPE: { category: "french", label: "|" },
  FR_GRV: { category: "french", label: "`", description: "Accent grave" },
  FR_BSLS: { category: "french", label: "\\" },
  FR_CCIRC: {
    category: "french",
    label: "^",
    description: "Accent circonflexe"
  },
  FR_AT: { category: "french", label: "@" },
  FR_RBRC: { category: "french", label: "]" },
  FR_RCBR: { category: "french", label: "}" },
  FR_EURO: { category: "french", label: "€" },
  FR_BULT: { category: "french", label: "¤", description: "Signe monétaire" },
  NO_HALF: { label: "½", category: "german" },
  NO_PLUS: { label: "+", category: "german" },
  NO_ACUT: { label: "'", category: "german" },
  NO_AM: { label: "å", category: "german" },
  NO_QUOT: { label: '"', category: "german" },
  NO_AE: { label: "ø", category: "german" },
  NO_OSLH: { label: "æ", category: "german" },
  NO_APOS: { label: "'", category: "german" },
  NO_LESS: { label: "<", category: "german" },
  NO_MINS: { label: "-", category: "german" },
  NO_QUO2: { label: "NO_QUO2", category: "german" },
  NO_BULT: { label: "NO_BULT", category: "german" },
  NO_AMPR: { label: "&", category: "german" },
  NO_SLSH: { label: "/", category: "german" },
  NO_LPRN: { label: "(", category: "german" },
  NO_RPRN: { label: ")", category: "german" },
  NO_EQL: { label: "=", category: "german" },
  NO_QUES: { label: "?", category: "german" },
  NO_GRV: { label: "`", category: "german" },
  NO_CIRC: { label: "^", category: "german" },
  NO_GRTR: { label: ">", category: "german" },
  NO_SCLN: { label: ";", category: "german" },
  NO_COLN: { label: ":", category: "german" },
  NO_UNDS: { label: "_", category: "german" },
  NO_AT: { label: "@", category: "german" },
  NO_PND: { label: "#", category: "german" },
  NO_LCBR: { label: "¶", category: "german" },
  NO_LBRC: { label: "[", category: "german" },
  NO_RBRC: { label: "]", category: "german" },
  NO_RCBR: { label: "≠", category: "german" },
  NO_PIPE: { label: "<", category: "german" },
  NO_EURO: { label: "€", category: "german" },
  NO_TILD: { label: "~", category: "german" },
  NO_MU: { label: "NO_MU", category: "german" },
  DE_Z: { label: "German Z", category: "german" },
  DE_Y: { label: "German Y", category: "german" },
  DE_SS: { label: "German ß", category: "german" },
  DE_AE: { label: "German Æ", category: "german" },
  DE_UE: { label: "German Ü", category: "german" },
  DE_OE: { label: "German Ö", category: "german" },
  DE_CIRC: {
    label: "German ^°",
    category: "german"
  },
  DE_ACUT: {
    label: "German ´`",
    category: "german"
  },
  DE_PLUS: {
    label: "German +*~",
    category: "german"
  },
  DE_HASH: { label: "German #'", category: "german" },
  DE_LESS: {
    label: "German <>|",
    category: "german"
  },
  DE_MINS: { label: "German -_", category: "german" },
  DE_RING: { label: "German °", category: "german" },
  DE_EXLM: { label: "German !", category: "german" },
  DE_DQOT: { label: 'German "', category: "german" },
  DE_PARA: { label: "German §", category: "german" },
  DE_DLR: { label: "German $", category: "german" },
  DE_PERC: { label: "German %", category: "german" },
  DE_AMPR: { label: "German &", category: "german" },
  DE_SLSH: { label: "German /", category: "german" },
  DE_LPRN: { label: "German (", category: "german" },
  DE_RPRN: { label: "German )", category: "german" },
  DE_EQL: { label: "German =", category: "german" },
  DE_QST: { label: "German ?", category: "german" },
  DE_GRV: { label: "German `", category: "german" },
  DE_ASTR: { label: "German *", category: "german" },
  DE_QUOT: { label: "German '", category: "german" },
  DE_MORE: { label: "German >", category: "german" },
  DE_COLN: { label: "German :", category: "german" },
  DE_SCLN: { label: "German ;", category: "german" },
  DE_UNDS: { label: "German _", category: "german" },
  DE_SQ2: { label: "German ²", category: "german" },
  DE_SQ3: { label: "German ³", category: "german" },
  DE_LCBR: { label: "German {", category: "german" },
  DE_LBRC: { label: "German [", category: "german" },
  DE_RBRC: { label: "German ]", category: "german" },
  DE_RCBR: { label: "German }", category: "german" },
  DE_BSLS: { label: "German \\", category: "german" },
  DE_AT: { label: "German @", category: "german" },
  DE_EURO: { label: "German €", category: "german" },
  DE_TILD: { label: "German ~", category: "german" },
  DE_PIPE: { label: "German |", category: "german" },
  KC_INT1: { label: "Int 1", category: "other" },
  KC_INT2: { label: "Int 2", category: "other" },
  KC_INT3: { label: "Int 3 (yen)", category: "other" },
  KC_INT4: { label: "Int 4", category: "other" },
  KC_INT5: { label: "Int 5", category: "other" },
  KC_INT6: { label: "Int 6", category: "other" },
  KC_INT7: { label: "Int 7", category: "other" },
  KC_INT8: { label: "Int 8", category: "other" },
  KC_INT9: { label: "Int 9", category: "other" },
  MAGIC_TOGGLE_NKRO: {
    label: "NKRO",
    category: "fw",
    description: "Toggle N-Key Rollover mode"
  },
  RGB_MOD: {
    label: "Animate",
    glyph: "air zoomed",
    menuLabel: false,
    category: "shine"
  },
  RGB_SLD: {
    label: "Stop animation",
    glyph: "pause-circle-o zoomed",
    menuLabel: false,
    category: "shine"
  },
  RGB_VAI: {
    label: "Brightness +",
    glyph: "brightness-up zoomed",
    menuLabel: false,
    category: "shine"
  },
  RGB_VAD: {
    label: "Brightness -",
    glyph: "brightness-down zoomed",
    menuLabel: false,
    category: "shine"
  },
  RGB_HUI: {
    label: "Hue +",
    glyph: "hui",
    menuLabel: false,
    category: "shine"
  },
  RGB_HUD: {
    label: "Hue -",
    glyph: "hud",
    menuLabel: false,
    category: "shine"
  },
  RGB_TOG: {
    label: "Toggle lighting",
    glyph: "toggle-on zoomed",
    menuLabel: false,
    category: "shine"
  },
  RGB: {
    label: "",
    glyph: "color-palette zoomed",
    menuLabel: false,
    jsCode: -1,
    category: "shine"
  }
};

const definitionKeyNames = Object.keys(definitions);
let definitionFlats = [];

flatKeys(definitionKeyNames, definitionFlats);

console.log(definitionFlats);