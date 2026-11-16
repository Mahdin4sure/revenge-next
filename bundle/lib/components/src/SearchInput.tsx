import { Design } from '@revenge/discord/design'
import { lookupGeneratedIconComponent } from '@revenge/utils/discord'
import type { DiscordModules } from '@revenge/discord/types'

const MagnifyingGlassIcon = lookupGeneratedIconComponent('MagnifyingGlassIcon')

export default function SearchInput(
    props: DiscordModules.Components.TextInputProps,
) {
    return (
        <Design.TextInput
            leadingIcon={MagnifyingGlassIcon}
            placeholder="Search"
            returnKeyType="search"
            size="md"
            {...props}
        />
    )
}
