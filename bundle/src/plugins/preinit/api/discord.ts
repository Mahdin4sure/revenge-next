import { defineLazyProperty } from '@revenge/utils/object'
import type { InitPluginApi } from '@revenge/plugins/types'

export function init({
    decorate,
    unscoped: {
        discord: {
            common: {
                logger: { Logger },
            },
        },
    },
}: InitPluginApi) {
    decorate(plugin => {
        defineLazyProperty(
            plugin.api,
            'logger',
            () => new Logger(`Revenge > Plugins (${plugin.manifest.id})`),
        )
    })
}
