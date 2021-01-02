﻿using System.Collections.Generic;
using System.Linq;
using InvvardDev.EZLayoutDisplay.Core.Models;
using InvvardDev.EZLayoutDisplay.Core.Models.Dictionary;
using InvvardDev.EZLayoutDisplay.Core.Models.Enum;
using NLog;

namespace InvvardDev.EZLayoutDisplay.Core.Helper
{
    public class EZLayoutMaker
    {
        private static readonly Logger Logger = LogManager.GetCurrentClassLogger();

        private const string NoCommand = "KC_NO";
        private const string TransparentKey = "KC_TRANSPARENT";
        private const string KeyCodeOsm = "OSM";
        private readonly KeyDefinitionDictionary _keyDefinitionDictionary;

        public EZLayoutMaker()
        {
            Logger.TraceConstructor();
            _keyDefinitionDictionary = new KeyDefinitionDictionary();
        }

        public EZLayout PrepareEZLayout(ZsaLayout ZsaLayout)
        {
            Logger.TraceMethod();
            Logger.DebugInputParam(nameof(ZsaLayout), ZsaLayout);

            var ezLayout = new EZLayout { HashId = ZsaLayout.HashId, Name = ZsaLayout.Title };

            var ZsaLayers = ZsaLayout.Revision.Layers ?? ZsaLayout.Revision.Layers;

            if (ZsaLayers?.Any() != null)
            {
                foreach (var ZsaLayer in ZsaLayers)
                {
                    var ezLayer = PrepareEZLayer(ZsaLayer);
                    ezLayout.EZLayers.Add(ezLayer);
                }
            }

            Logger.DebugOutputParam(nameof(ezLayout), ezLayout);

            return ezLayout;
        }

        private EZLayer PrepareEZLayer(ZsaLayer zsaLayer)
        {
            Logger.TraceMethod();
            Logger.DebugInputParam(nameof(zsaLayer), zsaLayer);

            var layer = new EZLayer { Index = zsaLayer.Position, Name = zsaLayer.Title, Color = GetColor(zsaLayer.Color) };

            foreach (var zsaKey in zsaLayer.Keys)
            {
                var key = PrepareKeyLabels(zsaKey, layer.Color);

                layer.EZKeys.Add(key);
            }

            Logger.DebugOutputParam(nameof(layer), layer);

            return layer;
        }

        private EZKey PrepareKeyLabels(ZsaKey zsaKey, string layerColor)
        {
            Logger.TraceMethod();
            Logger.DebugInputParam(nameof(zsaKey), zsaKey);

            var keyDefinition = GetKeyDefinition(zsaKey.Code);

            /** Every category has a label, so no need to make a special case :
             *
             * KeyCategory.Autoshift
             * KeyCategory.Digit
             * KeyCategory.Letters
             * KeyCategory.Fn
             * KeyCategory.Fw
             * KeyCategory.Lang
             * KeyCategory.Numpad
             * KeyCategory.Other
             * KeyCategory.Punct
             * KeyCategory.ShiftedPunct
             * KeyCategory.System
             *
             **/
            var key = new EZKey
                      {
                          KeyCategory = keyDefinition.KeyCategory,
                          Label = new KeyLabel(keyDefinition.Label, keyDefinition.IsGlyph),
                          Color = GetColor(zsaKey.GlowColor, layerColor),
                          DisplayType = KeyDisplayType.SimpleLabel
                      };

            switch (keyDefinition.KeyCategory)
            {
                case KeyCategory.DualFunction:

                    if (AddCommandLabel(zsaKey, key))
                        key.DisplayType = KeyDisplayType.ModifierUnder;
                    else
                        key.KeyCategory = KeyCategory.Modifier;

                    break;
                case KeyCategory.Layer:
                case KeyCategory.LayerShortcuts:
                    key.Label.Content = string.Format(key.Label.Content, zsaKey.Layer.ToString());

                    if (AddCommandLabel(zsaKey, key)) key.DisplayType = KeyDisplayType.ModifierUnder;

                    break;

                case KeyCategory.Modifier:

                    if (zsaKey.Code == KeyCodeOsm && !IsCommandEmpty(zsaKey.Command))
                    {
                        var commandDefinition = GetKeyDefinition(zsaKey.Command);
                        key.Modifier = new KeyLabel(commandDefinition.Label);
                        key.DisplayType = KeyDisplayType.ModifierOnTop;
                    }

                    break;
                case KeyCategory.Media:
                case KeyCategory.Mouse:
                case KeyCategory.Nav:
                case KeyCategory.Spacing:
                case KeyCategory.Shine:
                    key.DisplayType = KeyDisplayType.SimpleLabel;

                    break;

                case KeyCategory.Shortcuts:

                    if (!IsCommandEmpty(zsaKey.Command))
                    {
                        var commandDefinition = GetKeyDefinition(zsaKey.Command);
                        key.Label.Content = $"{key.Label.Content} + {commandDefinition.Label}";
                    }

                    break;
                case KeyCategory.French:
                    key.InternationalHint = "fr";

                    break;
                case KeyCategory.German:
                    key.InternationalHint = "de";

                    break;
                case KeyCategory.Hungarian:
                    key.InternationalHint = "hu";

                    break;
                case KeyCategory.Spanish:
                    key.InternationalHint = "es";

                    break;
                case KeyCategory.Nordic:
                    key.InternationalHint = "no";

                    break;
            }

            ProcessModifiers(zsaKey, key);

            Logger.DebugOutputParam(nameof(key), key);

            return key;
        }

        private static string GetColor(string keyColor, string defaultColor = "#777")
        {
            var fontColor = string.IsNullOrWhiteSpace(keyColor) ? defaultColor : keyColor;

            return fontColor;
        }

        private KeyDefinition GetKeyDefinition(string zsaKeyCode)
        {
            var keyDefinition = _keyDefinitionDictionary.KeyDefinitions.FirstOrDefault(k => k.KeyCode == zsaKeyCode);

            if (keyDefinition == null)
            {
                Logger.Warn("Key code '{0}' unknown", zsaKeyCode);
                keyDefinition = GetKeyDefinition(TransparentKey);
            }

            return keyDefinition;
        }

        /// <summary>
        ///     Apply the command label.
        /// </summary>
        /// <param name="zsaKey">The <see cref="InvvardDev.EZLayoutDisplay.Core.Model.ZsaKey" /> containing the command to be applied.</param>
        /// <param name="key">The <see cref="EZKey" /> to apply the command to.</param>
        /// <returns><c>True</c> if command has been applied.</returns>
        private bool AddCommandLabel(ZsaKey zsaKey, EZKey key)
        {
            if (IsCommandEmpty(zsaKey.Command)) return false;

            var commandDefinition = GetKeyDefinition(zsaKey.Command);
            key.Modifier = key.Label;
            key.Label = new KeyLabel(commandDefinition.Label, commandDefinition.IsGlyph);

            return true;
        }

        private void ProcessModifiers(ZsaKey zsaKey, EZKey key)
        {
            if (zsaKey.Modifiers == null) return;

            var mods = GetModifiersApplied(zsaKey.Modifiers);

            if (!mods.Any()) return;

            key.Modifier = new KeyLabel(AggregateModifierLabels(mods));
            key.DisplayType = KeyDisplayType.ModifierOnTop;
        }

        private List<EZModifier> GetModifiersApplied(ZsaModifiers zsaModifiers)
        {
            var keyModifiers = new KeyModifierDictionary();
            var mods = new List<EZModifier>();

            if (zsaModifiers.LeftAlt) mods.Add(keyModifiers.EZModifiers.First(m => m.KeyModifier == KeyModifier.LeftAlt));

            if (zsaModifiers.LeftCtrl) mods.Add(keyModifiers.EZModifiers.First(m => m.KeyModifier == KeyModifier.LeftCtrl));

            if (zsaModifiers.LeftShift) mods.Add(keyModifiers.EZModifiers.First(m => m.KeyModifier == KeyModifier.LeftShift));

            if (zsaModifiers.LeftWin) mods.Add(keyModifiers.EZModifiers.First(m => m.KeyModifier == KeyModifier.LeftWin));

            if (zsaModifiers.RightAlt) mods.Add(keyModifiers.EZModifiers.First(m => m.KeyModifier == KeyModifier.RightAlt));

            if (zsaModifiers.RightCtrl) mods.Add(keyModifiers.EZModifiers.First(m => m.KeyModifier == KeyModifier.RightCtrl));

            if (zsaModifiers.RightShift) mods.Add(keyModifiers.EZModifiers.First(m => m.KeyModifier == KeyModifier.RightShift));

            if (zsaModifiers.RightWin) mods.Add(keyModifiers.EZModifiers.First(m => m.KeyModifier == KeyModifier.RightWin));

            return mods.OrderBy(m => m.Index).ToList();
        }

        private string AggregateModifierLabels(List<EZModifier> mods)
        {
            string subLabel;

            switch (mods.Count)
            {
                case 1:
                    subLabel = mods.First().Labels[EZModifier.LabelSize.Large];

                    break;
                case 2:
                    subLabel = mods.Select(m => m.Labels[EZModifier.LabelSize.Medium]).Aggregate((seed, inc) => $"{seed}+{inc}");

                    break;
                default:
                    subLabel = mods.Select(m => m.Labels[EZModifier.LabelSize.Small]).Aggregate((seed, inc) => $"{seed}+{inc}");

                    break;
            }

            return subLabel;
        }

        private bool IsCommandEmpty(string command)
        {
            var isEmpty = string.IsNullOrWhiteSpace(command) || command == NoCommand || command == KeyCodeOsm;

            return isEmpty;
        }
    }
}