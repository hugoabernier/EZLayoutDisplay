﻿using InvvardDev.EZLayoutDisplay.Desktop.Model.Service.Interface;
using InvvardDev.EZLayoutDisplay.Desktop.View;
using InvvardDev.EZLayoutDisplay.Desktop.ViewModel;
using Moq;
using Xunit;

namespace InvvardDev.EZLayoutDisplay.Tests.ViewModel
{
    public class SettingsViewModelTest
    {
        [ Fact ]
        public void SettingsViewModelConstructor()
        {
            //Arrange
            var tbContentInitial = "This is a test";
            var settingsService = new Mock<ISettingsService>();
            settingsService.Setup(s => s.ErgodoxLayoutUrl).Returns(tbContentInitial);
            var windowService = new Mock<IWindowService>();

            //Act
            var settingsViewModel = new SettingsViewModel(settingsService.Object, windowService.Object);

            //Assert
            Assert.Equal("Settings", settingsViewModel.WindowTitle);
            Assert.Equal("Configurator URL to your layout :", settingsViewModel.LayoutUrlLabel);
            Assert.Equal("Apply", settingsViewModel.ApplyCommandLabel);
            Assert.Equal("Close", settingsViewModel.CloseCommandLabel);
            Assert.Equal("Cancel", settingsViewModel.CancelCommandLabel);
            Assert.Equal(tbContentInitial, settingsViewModel.LayoutUrlContent);
            Assert.Equal("Hotkey to display layout", settingsViewModel.HotkeyTitleLabel);
            Assert.Equal("ALT", settingsViewModel.AltModifierLabel);
            Assert.Equal("CTRL", settingsViewModel.CtrlModifierLabel);
            Assert.Equal("SHIFT", settingsViewModel.ShiftModifierLabel);
            Assert.Equal("Windows", settingsViewModel.WindowsModifierLabel);
        }

        [ Theory ]
        [ InlineData("initial value", "initial value", false) ]
        [ InlineData("initial value", "new value", true) ]
        public void RelayCommand_CanExecute(string initialValue, string newValue, bool canExecute)
        {
            //Arrange
            var settingsService = new Mock<ISettingsService>();
            settingsService.Setup(s => s.ErgodoxLayoutUrl).Returns(initialValue);
            var windowService = new Mock<IWindowService>();

            //Act
            var settingsViewModel = new SettingsViewModel(settingsService.Object, windowService.Object) {
                                                                                                            LayoutUrlContent = newValue
                                                                                                        };

            //Assert
            if (canExecute)
            {
                Assert.True(settingsViewModel.ApplySettingsCommand.CanExecute(null));
                Assert.True(settingsViewModel.CancelSettingsCommand.CanExecute(null));
            }
            else
            {
                Assert.False(settingsViewModel.ApplySettingsCommand.CanExecute(null));
                Assert.False(settingsViewModel.CancelSettingsCommand.CanExecute(null));
            }

            Assert.True(settingsViewModel.CloseSettingsCommand.CanExecute(null));
        }

        [ Fact ]
        public void ApplyCommand_Execute()
        {
            //Arrange
            var tbContentInitial = "This is a test";
            var tbContentNewValue = "new value";
            var settingsService = new Mock<ISettingsService>();
            settingsService.Setup(s => s.Save()).Verifiable();
            settingsService.SetupProperty(s => s.ErgodoxLayoutUrl, tbContentInitial);
            var windowService = new Mock<IWindowService>();

            //Act
            var settingsViewModel = new SettingsViewModel(settingsService.Object, windowService.Object) {
                                                                                                            LayoutUrlContent = tbContentNewValue
                                                                                                        };
            settingsViewModel.ApplySettingsCommand.Execute(null);

            //Assert
            Assert.Equal(tbContentNewValue, settingsService.Object.ErgodoxLayoutUrl);
            settingsService.Verify(s => s.Save());
            Assert.False(settingsViewModel.ApplySettingsCommand.CanExecute(null));
            Assert.False(settingsViewModel.CancelSettingsCommand.CanExecute(null));
        }

        [ Fact ]
        public void CancelCommand_Execute()
        {
            //Arrange
            var tbContentInitial = "This is a test";
            var tbContentNewValue = "new value";
            var settingsService = new Mock<ISettingsService>();
            settingsService.Setup(s => s.Cancel()).Verifiable();
            settingsService.SetupProperty(s => s.ErgodoxLayoutUrl, tbContentInitial);
            var windowService = new Mock<IWindowService>();

            //Act
            var settingsViewModel = new SettingsViewModel(settingsService.Object, windowService.Object) {
                                                                                                            LayoutUrlContent = tbContentNewValue
                                                                                                        };
            settingsViewModel.CancelSettingsCommand.Execute(null);

            //Assert
            Assert.Equal(tbContentInitial, settingsService.Object.ErgodoxLayoutUrl);
            settingsService.Verify(s => s.Cancel());
            Assert.False(settingsViewModel.ApplySettingsCommand.CanExecute(null));
            Assert.False(settingsViewModel.CancelSettingsCommand.CanExecute(null));
        }

        [ Theory ]
        [InlineData(false)]
        [InlineData(true)]
        public void CloseCommand_Execute(bool mustSave)
        {
            //Arrange
            var tbContentInitial = "This is a test";
            var tbContentNewValue = "new value";
            var settingsService = new Mock<ISettingsService>();
            settingsService.Setup(s => s.Save()).Verifiable();
            settingsService.SetupProperty(s => s.ErgodoxLayoutUrl, tbContentInitial);
            var windowService = new Mock<IWindowService>();
            windowService.Setup(w => w.CloseWindow<SettingsWindow>()).Verifiable();

            //Act
            var settingsViewModel = new SettingsViewModel(settingsService.Object, windowService.Object);

            if (mustSave) { settingsViewModel.LayoutUrlContent = tbContentNewValue; }
            settingsViewModel.CloseSettingsCommand.Execute(null);

            //Assert
            if (mustSave)
            {
                Assert.Equal(tbContentNewValue, settingsService.Object.ErgodoxLayoutUrl);
                settingsService.Verify(s => s.Save(), Times.Once);
                Assert.False(settingsViewModel.ApplySettingsCommand.CanExecute(null));
                Assert.False(settingsViewModel.CancelSettingsCommand.CanExecute(null));
                windowService.Verify(w => w.CloseWindow<SettingsWindow>(), Times.Once);
            }
            else
            {
                Assert.Equal(tbContentInitial, settingsService.Object.ErgodoxLayoutUrl);
                Assert.False(settingsViewModel.ApplySettingsCommand.CanExecute(null));
                Assert.False(settingsViewModel.CancelSettingsCommand.CanExecute(null));
                settingsService.Verify(s => s.Save(), Times.Never);
                windowService.Verify(w => w.CloseWindow<SettingsWindow>(), Times.Once);
            }
        }
    }
}