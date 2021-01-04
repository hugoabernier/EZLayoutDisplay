﻿using System;
using System.Linq;
using InvvardDev.EZLayoutDisplay.Core.Helper;
using InvvardDev.EZLayoutDisplay.Core.Models;
using InvvardDev.EZLayoutDisplay.Core.Services.Interface;
using InvvardDev.EZLayoutDisplay.Core.ViewModels;
using MvvmCross.Navigation;
using NLog;
using NonInvasiveKeyboardHookLibrary;

namespace InvvardDev.EZLayoutDisplay.Core.Services.Implementation
{
    // ReSharper disable once ClassNeverInstantiated.Global
    public class KeyboardHookService : IKeyboardHookService
    {
#region Fields

        private                 bool                _disposed;
        private static          KeyboardHookManager _hook;
        private static readonly Logger              Logger = LogManager.GetCurrentClassLogger();

        private readonly IMvxNavigationService _navigationService;
        private readonly ISettingsService      _settingsService;

#endregion

#region Properties

        private static KeyboardHookManager Hook => _hook ?? (_hook = new KeyboardHookManager());

#endregion

#region Constructor

        public KeyboardHookService(IMvxNavigationService navigationService, ISettingsService settingsService)
        {
            Logger.TraceConstructor();

            _navigationService = navigationService;
            _settingsService = settingsService;

            InitKeyboardHook();
        }

        private void InitKeyboardHook()
        {
            Logger.TraceMethod();

            Hook.Start();

            Logger.Debug("Registered hotkey {@value0}", _settingsService.HotkeyShowLayout);

            var hotkeyShowLayout = _settingsService.HotkeyShowLayout;

            switch (hotkeyShowLayout.ModifierKeys.Count)
            {
                case 0:
                    Hook.RegisterHotkey(hotkeyShowLayout.KeyCode, DisplayLayout);

                    break;
                case 1:
                    Hook.RegisterHotkey(hotkeyShowLayout.ModifierKeys.First(), hotkeyShowLayout.KeyCode, DisplayLayout);

                    break;
                default:
                    var sumModifierKeys = SumModifiers(hotkeyShowLayout);
                    Hook.RegisterHotkey(sumModifierKeys, hotkeyShowLayout.KeyCode, DisplayLayout);

                    break;
            }
        }

#endregion

#region IKeyboardHookService implementation

        public void RegisterHotkey(ModifierKeys modifiers, int keyCode)
        {
            Logger.TraceMethod();
            Logger.DebugInputParam(nameof(modifiers), modifiers);
            Logger.DebugInputParam(nameof(keyCode), keyCode);

            Hook.RegisterHotkey(modifiers, keyCode, DisplayLayout);
        }

        public void RegisterHotkey(int keyCode)
        {
            Logger.TraceMethod();
            Logger.DebugInputParam(nameof(keyCode), keyCode);

            Hook.RegisterHotkey(keyCode, DisplayLayout);
        }

#endregion

#region Private methods

        private static ModifierKeys SumModifiers(Hotkey hotkeyShowLayout)
        {
            Logger.TraceMethod();
            Logger.DebugInputParam(nameof(hotkeyShowLayout), hotkeyShowLayout);

            var sumModifierKeys = hotkeyShowLayout.ModifierKeys[0];

            for (int i = 1 ; i < hotkeyShowLayout.ModifierKeys.Count ; i++) { sumModifierKeys = sumModifierKeys | hotkeyShowLayout.ModifierKeys[i]; }

            Logger.DebugOutputParam(nameof(sumModifierKeys), sumModifierKeys);

            return sumModifierKeys;
        }

        private void DisplayLayout()
        {
            Logger.TraceMethod();

            Application.Current.Dispatcher.Invoke(delegate { _navigationService.Navigate<DisplayLayoutViewModel>(); });
        }

#endregion

#region IDispose implementation

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (_disposed) return;

            if (disposing)
            {
                Hook.UnregisterAll();
                Hook.Stop();
            }

            _disposed = true;
        }

#endregion
    }
}