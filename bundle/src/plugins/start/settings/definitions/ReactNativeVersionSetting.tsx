import TableRowAssetIcon from '@revenge/components/TableRowAssetIcon'
import { Setting } from '../constants'
import { CopyableSetting, getRNVersion } from './shared'
import type { SettingsItem } from '@revenge/discord/modules/settings'

const ReactNativeVersionSetting: SettingsItem = CopyableSetting(
    {
        parent: Setting.Revenge,
        IconComponent: () => <TableRowAssetIcon name="ScienceIcon" />,
        useTitle: () => 'React Native',
    },
    getRNVersion,
)

export default ReactNativeVersionSetting
