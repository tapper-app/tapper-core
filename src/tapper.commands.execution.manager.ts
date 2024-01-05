import {TapperCommandsManager} from "./utils/tapper.commands.manager.js";
import {TapperGeneralOptionsCommandsManager} from "./commands/tapper.general.options.commands.manager.js";
import {TapperDeveloperOptionsCommandsManager} from "./commands/tapper.developer.options.commands.manager.js";
import {AdbValidationManager} from "./utils/adb.validation.manager.js";

export class TapperCommandsExecutionManager {

    public static onExecuteCommand(command: string) {
        if (command === TapperCommandsManager.VIEW_TESTING_OPTIONS_COMMAND) {
            this.onPrintOptions(TapperGeneralOptionsCommandsManager.getAvailableCommands());
            TapperCommandsManager.onRepeatAskCommandsQuestion();
            return
        }

        if (command === TapperCommandsManager.VIEW_DEVELOPER_OPTIONS_COMMAND) {
            this.onPrintOptions(TapperDeveloperOptionsCommandsManager.getAvailableCommands());
            TapperCommandsManager.onRepeatAskCommandsQuestion();
            return
        }

        if (command === TapperCommandsManager.VALIDATE_ADB_INSTALLATION_COMMAND) {
            AdbValidationManager.checkAdbInstallation()
                .then((result) => {
                    if (result) {
                        console.log("")
                        console.log("======= ADB Installed")
                        console.log("")
                    } else {
                        console.log("")
                        console.log("======= ADB Not Installed")
                        console.log("")
                    }

                    TapperCommandsManager.onRepeatAskCommandsQuestion();
                })
                .catch((ex: Error) => {
                    console.log("======= ADB Installation Check Error : " + ex.message)
                    TapperCommandsManager.onRepeatAskCommandsQuestion();
                });

            return;
        }

        if (command === TapperCommandsManager.HELP_COMMAND) {
            this.onPrintHelpCommandsExamples();
            TapperCommandsManager.onRepeatAskCommandsQuestion();
            return;
        }

        if (command === TapperCommandsManager.EXECUTE_GENERAL_OPTIONS_COMMAND) {
            TapperGeneralOptionsCommandsManager.onExecuteGeneralOptionsCommands();
            return;
        }

        if (command === TapperCommandsManager.EXECUTE_DEVELOPER_OPTION_COMMAND) {
            TapperDeveloperOptionsCommandsManager.onExecuteDeveloperOptionsCommands();
            return;
        }
    }

    public static onExecuteCommandWithAttributes(command: string, attributes: Array<String>) {

    }

    private static onPrintHelpCommandsExamples() {

    }

    private static onPrintOptions(options: Array<string>) {
        for (let i = 0; i < options.length; i++) {
            console.log(options[i])
        }
    }

}
