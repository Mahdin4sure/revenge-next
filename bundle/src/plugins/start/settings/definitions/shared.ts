import { ToastActionCreators } from '@revenge/discord/actions'
import { Clipboard } from '@revenge/externals/react-native-clipboard'
import { ReactNative } from '@revenge/react'
import { lookupGeneratedIconComponent } from '@revenge/utils/discord'
import type { SettingsItem } from '@revenge/discord/modules/settings'

const CopyIcon = lookupGeneratedIconComponent('CopyIcon')

export const CopyableSetting = (
    item: Omit<SettingsItem, 'type' | 'onClick'>,
    description: () => string,
): SettingsItem => ({
    ...item,
    useDescription: item.useDescription ?? (() => description()),
    type: 'pressable',
    onPress() {
        Clipboard.setString(description())
        ToastActionCreators.open('REVENGE_SETTING_COPIED', {
            text: 'Copied to clipboard',
            icon: CopyIcon,
        })
    },
})

export const getRNVersion = () => {
    const { major, minor, patch, prerelease } =
        ReactNative.Platform.constants.reactNativeVersion
    return `${major}.${minor}.${patch}${prerelease ? `-${prerelease}` : ''}`
}
