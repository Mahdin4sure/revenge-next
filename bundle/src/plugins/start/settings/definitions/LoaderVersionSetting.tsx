import TableRowAssetIcon from '@revenge/components/TableRowAssetIcon'
import { getBridgeInfo } from '@revenge/modules/native'
import { Setting } from '../constants'
import { CopyableSetting } from './shared'
import type { SettingsItem } from '@revenge/discord/modules/settings'

const bridgeInfo = getBridgeInfo()

const LoaderVersionSetting: SettingsItem = CopyableSetting(
    {
        parent: Setting.Revenge,
        IconComponent: () => <TableRowAssetIcon name="SendMessageIcon" />,
        useTitle: () => 'Loader',
        usePredicate: () => Boolean(bridgeInfo),
    },
    () => `${bridgeInfo!.name} (${bridgeInfo!.version})`,
)

export default LoaderVersionSetting
