import { lookupModule } from '@revenge/modules/finders'
import { withProps } from '@revenge/modules/finders/filters'
import type { Metro } from '@revenge/modules/types'

// ../discord_common/js/packages/tokens/native.tsx
export const [Tokens, TokensModuleId] = lookupModule(withProps('RawColor')) as [
    any,
    Metro.ModuleID,
]
