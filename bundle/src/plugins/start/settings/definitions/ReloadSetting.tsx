import TableRowAssetIcon from '@revenge/components/TableRowAssetIcon'
import { reloadApp } from '@revenge/modules/native/app'
import { Setting } from '../constants'
import type { SettingsItem } from '@revenge/discord/modules/settings'

const ReloadSetting: SettingsItem = {
    parent: Setting.Revenge,
    IconComponent: () => <TableRowAssetIcon name="RetryIcon" />,
    useTitle: () => 'Reload App',
    onPress: () => {
        reloadApp()
    },
    type: 'pressable',
}

export default ReloadSetting
