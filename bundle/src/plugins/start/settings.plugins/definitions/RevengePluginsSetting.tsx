import TableRowAssetIcon from '@revenge/components/TableRowAssetIcon'
import { isDefaultsOnlyBoot } from '@revenge/plugins/_'
import { useEnabledPluginCountInActiveSlot } from '@revenge/plugins/_/react'
import { RouteNames, Setting } from '../constants'
import defer * as RevengePluginsSettingScreen from '../screens/RevengePluginsSettingScreen'
import type { SettingsItem } from '@revenge/discord/modules/settings'

const RevengePluginsSetting: SettingsItem = {
    parent: null,
    type: 'route',
    IconComponent: () => <TableRowAssetIcon name="PuzzlePieceIcon" />,
    useTitle: () => 'Plugins',
    useTrailing: () =>
        `${useEnabledPluginCountInActiveSlot()} enabled` +
        (isDefaultsOnlyBoot ? ' (recovery)' : ''),
    screen: {
        route: RouteNames[Setting.RevengePlugins],
        getComponent: () => RevengePluginsSettingScreen.default,
    },
}

export default RevengePluginsSetting
