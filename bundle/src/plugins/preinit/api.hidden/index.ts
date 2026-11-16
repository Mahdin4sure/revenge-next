/// <reference path="../../../../types/globals.hidden.ts" />

import { hiddenApi } from '@revenge/hidden'
import { registerInternalPlugin } from '@revenge/plugins/_'
import manifest from './manifest.json'

const pluginHiddenApi = registerInternalPlugin(manifest, {
    preInit({ cleanup, unscoped }) {
        globalThis.revenge = unscoped
        unscoped.hidden = hiddenApi

        cleanup(() => {
            // biome-ignore lint/performance/noDelete: We want to remove the API completely
            delete globalThis.revenge
            // biome-ignore lint/performance/noDelete: We want to remove the API completely
            delete unscoped.hidden
        })
    },
})

export default pluginHiddenApi
