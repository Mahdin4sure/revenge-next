import * as UtilsBitset from '@revenge/utils/bitset'
import * as UtilsCallback from '@revenge/utils/callback'
import defer * as UtilsDiscord from '@revenge/utils/discord'
import * as UtilsError from '@revenge/utils/error'
import * as UtilsModulesLazy from '@revenge/utils/modules/lazy'
import * as UtilsObject from '@revenge/utils/object'
import * as UtilsPromise from '@revenge/utils/promise'
import * as UtilsProxy from '@revenge/utils/proxy'
import * as UtilsReact from '@revenge/utils/react'
import * as UtilsTree from '@revenge/utils/tree'
import { guardIndexInitialized } from '.'
import type { PluginApiUtils } from '@revenge/utils/types'

export const utils = UtilsObject.defineLazyProperties(
    {
        bitset: UtilsBitset,
        callback: UtilsCallback,
        error: UtilsError,
        modules: { lazy: UtilsModulesLazy },
        object: UtilsObject,
        promise: UtilsPromise,
        proxy: UtilsProxy,
        tree: UtilsTree,
        react: UtilsReact,
    } as PluginApiUtils,
    {
        discord: () => {
            guardIndexInitialized('utils.discord')
            return UtilsDiscord
        },
    },
)
