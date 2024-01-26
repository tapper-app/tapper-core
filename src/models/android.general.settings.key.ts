export enum AndroidGeneralSettingsKey {
    ToggleDarkMode = "night_display_activated",
    ToggleWifi = "wifi_network_suggestions_splice",
    Devices = "devices",
    DetailedDevices = "devices -l",
    InstallApk = "install",
    UnInstallApk = "uninstall",
    Reboot = "reboot",
    RemovePermissions = "reset-permissions",
    PowerSavingMode = "low_power",
    HomeButton = " shell am start -W -c android.intent.category.HOME -a android.intent.action.MAIN",
    PhoneNumber = " shell am start -a android.intent.action.CALL -d tel:",
    OpenUrl = " shell am start -a android.intent.action.VIEW -d",
    Screenshot = "shell screencap -p"
}
