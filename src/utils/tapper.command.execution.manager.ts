import { exec } from 'child_process';

export class TapperCommandExecutionManager {

    // @ts-ignore
    public static onExecuteCommandString(command: string) {
        exec(command, (error, stdout: string, stderr: string) => {
            if (error) {
                console.log("Error While Executing the Command ... " + error.message)
                return
            }

            console.log(stdout)
        });
    }

}
