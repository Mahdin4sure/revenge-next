import { getAssetIdByName } from '@revenge/assets'
import { Design } from '@revenge/discord/design'
import type { DiscordModules } from '@revenge/discord/types'

export default function TableRowAssetIcon(props: TableRowAssetIconProps) {
    return (
        <Design.TableRow.Icon
            source={props.name ? getAssetIdByName(props.name)! : props.id}
            {...props}
        />
    )
}

export type TableRowAssetIconProps = Omit<
    DiscordModules.Components.TableRowIconProps,
    'source'
> &
    (
        | {
              name: string
              id?: never
              IconComponent?: never
          }
        | {
              name?: never
              id: number
              IconComponent?: never
          }
        | {
              name?: never
              id?: never
              IconComponent: DiscordModules.Components.BaseIconImage
          }
    )
