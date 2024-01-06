import {TapperCommandsManager} from "./utils/tapper.commands.manager.js";
import {TapperGeneralOptionsCommandsManager} from "./commands/tapper.general.options.commands.manager.js";
import {TapperDeveloperOptionsCommandsManager} from "./commands/tapper.developer.options.commands.manager.js";
import {AdbValidationManager} from "./utils/adb.validation.manager.js";
import {TapperCommandExecutionManager} from "./utils/tapper.command.execution.manager.js";
import {TapperTestingCommandsManager} from "./commands/tapper.testing.commands.manager.js";

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
            AdbValidationManager.checkAdbInstallation();
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

        if (command === TapperCommandsManager.EXECUTE_ANDROID_MONKEY_TESTING_COMMAND) {
            this.onExecuteNativeAndroidMonkeyTesting();
            return;
        }

        if (command === TapperCommandsManager.EXECUTE_TESTING_EVENTS_COMMAND) {
            TapperTestingCommandsManager.onExecuteTestingOptionsCommands();
            return;
        }
    }

    public static onExecuteCommandWithAttributes(command: string, attributes: Array<String>) {

    }

    private static async onExecuteNativeAndroidMonkeyTesting() {
        const packageNameQuestion = await TapperCommandsManager.onAskStringInputQuestion("Insert Your Application Package Name ?");
        const numberOfEventsCount = await TapperCommandsManager.onAskStringInputQuestion("Write how Many Events you want to Execute on your Application ?");
        if (numberOfEventsCount === '0' || numberOfEventsCount === '' || !numberOfEventsCount) {
            return
        }

        if (!packageNameQuestion || packageNameQuestion === '') {
            return
        }

        TapperCommandExecutionManager.onExecuteCommandStringWithoutInput(`adb shell monkey -p ${packageNameQuestion} -v ${numberOfEventsCount}`);
    }

    private static onPrintHelpCommandsExamples() {

    }

    private static onPrintOptions(options: Array<string>) {
        for (let i = 0; i < options.length; i++) {
            console.log(options[i])
        }
    }

}
