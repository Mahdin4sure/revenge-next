import TableRowAssetIcon from '@revenge/components/TableRowAssetIcon'
import { BuildEnvironment, FullVersion } from '~/constants'
import RevengeIcon from '~assets/RevengeIcon'
import { Setting } from '../constants'
import { CopyableSetting } from './shared'
import type { SettingsItem } from '@revenge/discord/modules/settings'

const RevengeVersionSetting: SettingsItem = CopyableSetting(
    {
        parent: Setting.Revenge,
        IconComponent: () => <TableRowAssetIcon id={RevengeIcon} />,
        useTitle: () => 'Revenge',
    },
    () => `${FullVersion} (${BuildEnvironment})`,
)

export default RevengeVersionSetting
