export class TapperDeveloperOptionsCommandsManager {

    public static getAvailableCommands(): Array<string> {
        return [
            "",
            "Enable / Disable Developer Options",
            "Enable / Disable USB Debugging",
            "Enable / Disable Strict Mode",
            "Enable / Disable GPU Overdraw",
            "Enable / Disable Hardware Acceleration",
            "Limit Background Processes",
            "Change GPU Rendering (OpenGL, Vulkan)",
            "Show / Hide Layout Bounds",
            "Show / Hide Touches",
            "Show / Hide Pointer Location",
            "GPU View Updates",
            "Maximum Background Processes",
            "",
        ];
    }

}
