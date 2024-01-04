export class TapperGeneralOptionsCommandsManager {

    private static ADB_PREFIX = "adb";

    public static getDevicesQuery(): string {
        return `${TapperGeneralOptionsCommandsManager.ADB_PREFIX} devices`;
    }

    public static getAvailableCommands(): Array<string> {
        return [
            "",
            "Enable / Disable Dark Mode",
            "Enable / Disable WIFI",
            "Enable / Disable Power Saving Mode",
            "Get Connected Devices",
            "Get Connected Devices With Full Information",
            "Install Apk By Path",
            "Uninstall Apk By Package Name",
            "Reboot Device",
            "",
        ];
    }
}
