import { TapperArgumentEntity } from "../models/tapper.argument.entity";

export class TapperCommandsManager {

    // View Commands
    public static VIEW_DEVELOPER_OPTIONS_COMMAND = "developer-options-view";
    public static VIEW_TESTING_OPTIONS_COMMAND = "testing-options-view";
    public static VALIDATE_ADB_INSTALLATION_COMMAND = "adb-validate";
    public static HELP_COMMAND = "help";

    // Execution Commands
    public static EXECUTE_DEVELOPER_OPTION_COMMAND = "execute-dev-option";
    public static EXECUTE_GENERAL_OPTIONS_COMMAND = "execute-general-options";
    public static EXECUTE_TESTING_EVENTS_COMMAND = "execute-testing-events";
    public static EXECUTE_ANDROID_MONKEY_TESTING_COMMAND = "execute-monkey-testing";
    public static EXECUTE_AUTO_FLOW_TESTING_COMMAND = "execute-auto-flow";

    public static getApplicationArgsOptions(): Array<TapperArgumentEntity> {
        const options: Array<TapperArgumentEntity> = [];

        // Add Execution Commands
        options.push(...this.getExecutionCommands());

        // Add View Commands
        options.push(...this.getViewCommands());

        return options;
    }

    private static getExecutionCommands(): Array<TapperArgumentEntity> {
        return [

        ];
    }

    private static getViewCommands(): Array<TapperArgumentEntity> {
        return [
            {
                command: TapperCommandsManager.VIEW_DEVELOPER_OPTIONS_COMMAND,
                description: "List All Available Commands That can be Executed on Connected Android Device from Developer Options",
                args: undefined
            },
            {
                command: TapperCommandsManager.VIEW_TESTING_OPTIONS_COMMAND,
                description: "List All Available Commands That can be Executed to Test Apps On Connected Devices",
                args: undefined
            },
            {
                command: TapperCommandsManager.VALIDATE_ADB_INSTALLATION_COMMAND,
                description: "Validate That Android Debug Bridge Installed on Your Device",
                args: undefined
            },
            {
                command: TapperCommandsManager.HELP_COMMAND,
                description: "Show Examples On CLI Usage on all Options",
                args: undefined
            }
        ]
    }
}