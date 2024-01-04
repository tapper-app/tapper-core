export interface TapperArgumentEntity {
    command: string,
    description: string,
    args: Array<TapperArgumentOption> | undefined
}

export interface TapperArgumentOption {
    name: string,
    description: string
}