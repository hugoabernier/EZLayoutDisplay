﻿using InvvardDev.EZLayoutDisplay.Core.Models;

namespace InvvardDev.EZLayoutDisplay.Core.Services.Interface
{
    public interface ISettingsService
    {
        /// <summary>
        /// Gets or sets the HotkeyShowLayout setting.
        /// </summary>
        Hotkey HotkeyShowLayout { get; set; }

        /// <summary>
        /// Gets or sets the ErgodoxLayoutUrl setting.
        /// </summary>
        string ErgodoxLayoutUrl { get; set; }

        /// <summary>
        /// Gets or sets the EZLayout setting.
        /// </summary>
        EZLayout EZLayout { get; set; }
        
        /// <summary>
        /// Saves all settings to file.
        /// </summary>
        void Save();

        /// <summary>
        /// Cancel settings edition.
        /// </summary>
        void Cancel();
    }
}