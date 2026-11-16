import TableRowAssetIcon from '@revenge/components/TableRowAssetIcon'
import { RouteNames, Setting } from '../constants'
import defer * as RevengePluginsBrowseSettingScreen from '../screens/RevengePluginsBrowseSettingScreen'
import type { SettingsItem } from '@revenge/discord/modules/settings'

const RevengePluginsBrowseSetting: SettingsItem = {
    parent: null,
    type: 'route',
    IconComponent: () => <TableRowAssetIcon name="PlusLargeIcon" />,
    useTitle: () => 'Browse Plugins',
    screen: {
        route: RouteNames[Setting.RevengePluginsBrowse],
        getComponent: () => RevengePluginsBrowseSettingScreen.default,
    },
}

export default RevengePluginsBrowseSetting
