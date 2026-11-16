import * as PluginsApiConstants from '@revenge/plugins/constants'
import * as PluginsApiUtils from '@revenge/plugins/utils'

export interface PluginApiPlugins {
    utils: typeof import('@revenge/plugins/utils')
    constants: typeof import('@revenge/plugins/constants')
}

export const plugins: PluginApiPlugins = {
    constants: PluginsApiConstants,
    utils: PluginsApiUtils,
}
