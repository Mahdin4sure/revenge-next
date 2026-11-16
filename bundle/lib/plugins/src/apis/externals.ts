import defer * as Browserify from '@revenge/externals/browserify'
import defer * as Gorhom from '@revenge/externals/gorhom'
import defer * as ReactNativeClipboard from '@revenge/externals/react-native-clipboard'
import defer * as ReactNativeCommunity from '@revenge/externals/react-native-community'
import defer * as ReactNativeSafeAreaContext from '@revenge/externals/react-native-safe-area-context'
import defer * as ReactNavigation from '@revenge/externals/react-navigation'
import defer * as Shopify from '@revenge/externals/shopify'
import defer * as Zustand from '@revenge/externals/zustand'
import { defineLazyProperties } from '@revenge/utils/object'

export interface PluginApiExternals {
    Browserify: typeof import('@revenge/externals/browserify')
    Gorhom: typeof import('@revenge/externals/gorhom')
    ReactNativeClipboard: typeof import('@revenge/externals/react-native-clipboard')
    ReactNativeCommunity: typeof import('@revenge/externals/react-native-community')
    ReactNativeSafeAreaContext: typeof import('@revenge/externals/react-native-safe-area-context')
    ReactNavigation: typeof import('@revenge/externals/react-navigation')
    Shopify: typeof import('@revenge/externals/shopify')
    Zustand: typeof import('@revenge/externals/zustand')
}

export const externals: PluginApiExternals = defineLazyProperties(
    {} as PluginApiExternals,
    {
        Browserify: () => {
            return Browserify
        },
        Gorhom: () => {
            return Gorhom
        },
        ReactNativeClipboard: () => {
            return ReactNativeClipboard
        },
        ReactNativeCommunity: () => {
            return ReactNativeCommunity
        },
        ReactNativeSafeAreaContext: () => {
            return ReactNativeSafeAreaContext
        },
        ReactNavigation: () => {
            return ReactNavigation
        },
        Shopify: () => {
            return Shopify
        },
        Zustand: () => {
            return Zustand
        },
    },
)
