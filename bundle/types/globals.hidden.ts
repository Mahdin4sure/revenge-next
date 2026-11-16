import type {
    UnscopedInitPluginApi,
    UnscopedPluginApi,
    UnscopedPreInitPluginApi,
} from '@revenge/plugins/types'

declare global {
    export var revenge:
        | UnscopedPreInitPluginApi
        | UnscopedInitPluginApi
        | UnscopedPluginApi
        | undefined
}
