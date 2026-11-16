import type { DiscordModules } from '.'

declare module '@revenge/plugins/types' {
    export interface InitPluginApi<O extends PluginApiExtensionsOptions> {
        logger: DiscordModules.Logger
    }
}
