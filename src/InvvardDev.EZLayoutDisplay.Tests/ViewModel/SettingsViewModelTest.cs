﻿using System;
using System.Threading.Tasks;
using InvvardDev.EZLayoutDisplay.Desktop.Model;
using InvvardDev.EZLayoutDisplay.Desktop.Service.Interface;
using InvvardDev.EZLayoutDisplay.Desktop.View;
using InvvardDev.EZLayoutDisplay.Desktop.ViewModel;
using Moq;
using Xunit;

namespace InvvardDev.EZLayoutDisplay.Tests.ViewModel
{
    public class SettingsViewModelTest
    {
        [ Fact ]
        public void SettingsViewModel_Constructor()
        {
            //Arrange
            var tbContentInitial = "This is a test";
            var mockSettingsService = new Mock<ISettingsService>();
            mockSettingsService.Setup(s => s.ErgodoxLayoutUrl).Returns(tbContentInitial);
            var mockWindowService = new Mock<IWindowService>();
            var mockLayoutService = new Mock<ILayoutService>();
            mockLayoutService.Setup(s => s.GetLayoutInfo(It.IsAny<string>())).Returns(Task.FromResult(It.IsAny<ErgodoxLayout>()));
            var mockProcessService = new Mock<IProcessService>();

            //Act
            var settingsViewModel = new SettingsViewModel(mockSettingsService.Object, mockWindowService.Object, mockLayoutService.Object, mockProcessService.Object);

            //Assert
            Assert.Equal("Settings", settingsViewModel.WindowTitle);
            Assert.Equal("Configurator URL to your layout :", settingsViewModel.LayoutUrlLabel);
            Assert.Equal(tbContentInitial, settingsViewModel.LayoutUrlContent);
        }

        [ Theory ]
        [ InlineData("initial value", "initial value", false) ]
        [ InlineData("initial value", "new value", true) ]
        public void RelayCommand_CanExecute(string initialValue, string newValue, bool canExecute)
        {
            //Arrange
            var mockSettingsService = new Mock<ISettingsService>();
            mockSettingsService.Setup(s => s.ErgodoxLayoutUrl).Returns(initialValue);
            var mockWindowService = new Mock<IWindowService>();
            var mockLayoutService = new Mock<ILayoutService>();
            var mockProcessService = new Mock<IProcessService>();

            //Act
            var settingsViewModel = new SettingsViewModel(mockSettingsService.Object, mockWindowService.Object, mockLayoutService.Object, mockProcessService.Object) {
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
            var mockSettingsService = new Mock<ISettingsService>();
            mockSettingsService.Setup(s => s.Save()).Verifiable();
            mockSettingsService.SetupProperty(s => s.ErgodoxLayoutUrl, tbContentInitial);
            var mockWindowService = new Mock<IWindowService>();
            var mockLayoutService = new Mock<ILayoutService>();
            var mockProcessService = new Mock<IProcessService>();

            //Act
            var settingsViewModel = new SettingsViewModel(mockSettingsService.Object, mockWindowService.Object, mockLayoutService.Object, mockProcessService.Object) {
                                                                                                                                                                         LayoutUrlContent =
                                                                                                                                                                             tbContentNewValue
                                                                                                                                                                     };
            settingsViewModel.ApplySettingsCommand.Execute(null);

            //Assert
            Assert.Equal(tbContentNewValue, mockSettingsService.Object.ErgodoxLayoutUrl);
            mockSettingsService.Verify(s => s.Save());
            Assert.False(settingsViewModel.ApplySettingsCommand.CanExecute(null));
            Assert.False(settingsViewModel.CancelSettingsCommand.CanExecute(null));
        }

        [ Fact ]
        public void CancelCommand_Execute()
        {
            //Arrange
            var tbContentInitial = "This is a test";
            var tbContentNewValue = "new value";
            var mockSettingsService = new Mock<ISettingsService>();
            mockSettingsService.Setup(s => s.Cancel()).Verifiable();
            mockSettingsService.SetupProperty(s => s.ErgodoxLayoutUrl, tbContentInitial);
            var mockWindowService = new Mock<IWindowService>();
            var mockLayoutService = new Mock<ILayoutService>();
            var mockProcessService = new Mock<IProcessService>();

            //Act
            var settingsViewModel = new SettingsViewModel(mockSettingsService.Object, mockWindowService.Object, mockLayoutService.Object, mockProcessService.Object) {
                                                                                                                                                                         LayoutUrlContent =
                                                                                                                                                                             tbContentNewValue
                                                                                                                                                                     };
            settingsViewModel.CancelSettingsCommand.Execute(null);

            //Assert
            Assert.Equal(tbContentInitial, mockSettingsService.Object.ErgodoxLayoutUrl);
            mockSettingsService.Verify(s => s.Cancel());
            Assert.False(settingsViewModel.ApplySettingsCommand.CanExecute(null));
            Assert.False(settingsViewModel.CancelSettingsCommand.CanExecute(null));
        }

        [ Theory ]
        [ InlineData(false) ]
        [ InlineData(true) ]
        public void CloseCommand_Execute(bool mustSave)
        {
            //Arrange
            var tbContentInitial = "This is a test";
            var tbContentNewValue = "new value";
            var mockSettingsService = new Mock<ISettingsService>();
            mockSettingsService.Setup(s => s.Save()).Verifiable();
            mockSettingsService.SetupProperty(s => s.ErgodoxLayoutUrl, tbContentInitial);
            var mockWindowService = new Mock<IWindowService>();
            mockWindowService.Setup(w => w.CloseWindow<SettingsWindow>()).Verifiable();
            var mockLayoutService = new Mock<ILayoutService>();
            var mockProcessService = new Mock<IProcessService>();

            //Act
            var settingsViewModel = new SettingsViewModel(mockSettingsService.Object, mockWindowService.Object, mockLayoutService.Object, mockProcessService.Object);

            if (mustSave)
            {
                settingsViewModel.LayoutUrlContent = tbContentNewValue;
            }

            settingsViewModel.CloseSettingsCommand.Execute(null);

            //Assert
            if (mustSave)
            {
                Assert.Equal(tbContentNewValue, mockSettingsService.Object.ErgodoxLayoutUrl);
                mockSettingsService.Verify(s => s.Save(), Times.Once);
                Assert.False(settingsViewModel.ApplySettingsCommand.CanExecute(null));
                Assert.False(settingsViewModel.CancelSettingsCommand.CanExecute(null));
                mockWindowService.Verify(w => w.CloseWindow<SettingsWindow>(), Times.Once);
            }
            else
            {
                Assert.Equal(tbContentInitial, mockSettingsService.Object.ErgodoxLayoutUrl);
                Assert.False(settingsViewModel.ApplySettingsCommand.CanExecute(null));
                Assert.False(settingsViewModel.CancelSettingsCommand.CanExecute(null));
                mockSettingsService.Verify(s => s.Save(), Times.Never);
                mockWindowService.Verify(w => w.CloseWindow<SettingsWindow>(), Times.Once);
            }
        }

        [ Theory ]
        [ InlineData("https://configure.ergodox-ez.com/layouts/abcd/latest/0", "default") ]
        [ InlineData("https://configure.ergodox-ez.com/ergodox-ez/layouts/abcd/latest/0", "abcd") ]
        [ InlineData("https://configure.ergodox-ez.com/ergodox-ez/layouts/1234/latest/0", "1234") ]
        [ InlineData("https://configure.ergodox-ez.com/ergodox-ez/layouts/a2Vt/latest/0", "a2Vt") ]
        [ InlineData("https://configure.ergodox-ez.com/ergodox-ez/layouts/default/latest/0", "default") ]
        [ InlineData("https://configure.ergodox-ez.com/ergodox-ez/layouts/j3o4", "j3o4") ]
        [ InlineData("https://configure.ergodox-ez.com/ergodox-ez/layouts/r2d2/lat/9", "r2d2") ]
        [ InlineData("https://configure.ergodox-ez.com/ergodox-ez/layouts/def/latest/0", "default") ]
        [ InlineData("https://configure.ergodox-ez.com/ergodox-ez/layouts/_t3s/latest/0", "default") ]
        [ InlineData("https://configure.ergodox-ez.com/ergodox-ez/layouts/t3s/latest/0", "default") ]
        [ InlineData("https://configure.ergodox-ez.com/ergodox-ez/layouts/adbcd/latest/0", "adbcd") ]
        [ InlineData("https://configure.ergodox-ez.com/ergodox-ez/layouts/asdfasdfasdfasdfgfasdffgasf/latest/0", "asdfasdfasdfasdfgfasdffgasf") ]
        public void UpdateLayoutCommand_Execute(string layoutUrl, string expectedHashId)
        {
            //Arrange
            var mockSettingsService = new Mock<ISettingsService>();
            mockSettingsService.SetupProperty(s => s.ErgodoxLayoutUrl, layoutUrl);
            var mockWindowService = new Mock<IWindowService>();
            var mockLayoutService = new Mock<ILayoutService>();
            mockLayoutService.Setup(l => l.GetErgodoxLayout(expectedHashId)).Returns(Task.FromResult(It.IsAny<ErgodoxLayout>())).Verifiable();
            mockLayoutService.Setup(l => l.PrepareEZLayout(It.IsAny<ErgodoxLayout>())).Verifiable();
            var mockProcessService = new Mock<IProcessService>();

            //Act
            var settingsViewModel = new SettingsViewModel(mockSettingsService.Object, mockWindowService.Object, mockLayoutService.Object, mockProcessService.Object);

            settingsViewModel.UpdateLayoutCommand.Execute(null);

            //Assert
            mockLayoutService.Verify();
        }

        [ Fact ]
        public void UpdateLayoutCommandExecute_ArgumentExceptionRaised()
        {
            // Arrange
            var mockSettingsService = new Mock<ISettingsService>();
            mockSettingsService.SetupProperty(s => s.ErgodoxLayoutUrl, "test");
            var mockWindowService = new Mock<IWindowService>();
            mockWindowService.Setup(w => w.ShowWarning(It.IsAny<string>())).Verifiable();
            var mockLayoutService = new Mock<ILayoutService>();
            mockLayoutService.Setup(l => l.GetErgodoxLayout(It.IsAny<string>())).Throws<ArgumentException>();
            var processService = new Mock<IProcessService>();

            // Act
            var settingsViewModel = new SettingsViewModel(mockSettingsService.Object, mockWindowService.Object, mockLayoutService.Object, processService.Object);
            settingsViewModel.UpdateLayoutCommand.Execute(null);

            // Assert
            mockLayoutService.Verify();
            mockWindowService.Verify();
        }

        [ Fact ]
        public void UpdateLayoutCommandExecute_ArgumentNullExceptionRaised()
        {
            // Arrange
            var mockSettingsService = new Mock<ISettingsService>();
            mockSettingsService.SetupProperty(s => s.ErgodoxLayoutUrl, "");
            var mockWindowService = new Mock<IWindowService>();
            mockWindowService.Setup(w => w.ShowWarning(It.IsAny<string>())).Verifiable();
            var mockLayoutService = new Mock<ILayoutService>();
            mockLayoutService.Setup(l => l.GetErgodoxLayout(It.IsAny<string>())).Throws<ArgumentNullException>();
            var processService = new Mock<IProcessService>();

            // Act
            var settingsViewModel = new SettingsViewModel(mockSettingsService.Object, mockWindowService.Object, mockLayoutService.Object, processService.Object);
            settingsViewModel.UpdateLayoutCommand.Execute(null);

            // Assert
            mockLayoutService.Verify();
            mockWindowService.Verify();
        }

        [ Theory ]
        [ InlineData(null, null, 0) ]
        [ InlineData("", null, 0) ]
        [ InlineData("  ", null, 0) ]
        [ InlineData(null, "", 0) ]
        [ InlineData(null, "  ", 0) ]
        [ InlineData("tag", "geometry", 1) ]
        public void OpenTagSearchCommandExecute_UrlNotOpened(string tag, string keyboardGeometry, int callNumber)
        {
            // Arrange
            var mockSettingsService = new Mock<ISettingsService>();
            mockSettingsService.SetupProperty(s => s.ErgodoxLayoutUrl, "");
            var mockWindowService = new Mock<IWindowService>();
            var mockLayoutService = new Mock<ILayoutService>();
            mockLayoutService.Setup(l => l.GetLayoutInfo(It.IsAny<string>()))
                             .Returns(Task.FromResult(new ErgodoxLayout() {
                                                                              Geometry = keyboardGeometry
                                                                          }));
            var mockProcessService = new Mock<IProcessService>();
            mockProcessService.Setup(p => p.StartWebUrl(It.IsAny<string>())).Verifiable();

            // Act
            var settingsViewModel = new SettingsViewModel(mockSettingsService.Object, mockWindowService.Object, mockLayoutService.Object, mockProcessService.Object);
            settingsViewModel.OpenTagSearchCommand.Execute(tag);

            // Assert
            mockProcessService.Verify(p => p.StartWebUrl($"https://configure.ergodox-ez.com/{keyboardGeometry}/search?q={tag}"), Times.Exactly(callNumber));
        }
    }
}