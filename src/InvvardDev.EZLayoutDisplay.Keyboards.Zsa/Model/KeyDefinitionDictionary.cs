﻿using System;
using System.Text;
using Newtonsoft.Json;

namespace InvvardDev.EZLayoutDisplay.Keyboards.Zsa.Model
{
    public class KeyDefinitionDictionary
    {
        private static readonly Logger Logger = LogManager.GetCurrentClassLogger();

        public List<KeyDefinition> KeyDefinitions { get; private set; }

        public KeyDefinitionDictionary()
        {
            Logger.TraceConstructor();
            InitializeKeyDefinitions();
        }

        private void InitializeKeyDefinitions()
        {
            Logger.TraceMethod();
            KeyDefinitions = new List<KeyDefinition>();

            if (Resources.keyDefinitions.Length <= 0)
            {
                Logger.Warn("KeyDefinitioins are missing from Resources");
                return;
            }

            try
            {
                var json = Encoding.Default.GetString(Resources.keyDefinitions);
                Logger.Debug($"Resource content = {json}");

                var keyDefinitions = JsonConvert.DeserializeObject<List<KeyDefinition>>(json);
                Logger.Debug("Key definitions {@value1}", keyDefinitions);

                KeyDefinitions.AddRange(keyDefinitions);
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
            }
        }
    }
}