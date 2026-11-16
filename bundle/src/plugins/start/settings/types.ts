import type { RouteNames } from './constants'

declare module '@revenge/externals/react-navigation' {
    interface ReactNavigationParamList extends RevengeSettingsParamList {}
}

type RevengeSettingsParamList = {
    [K in (typeof RouteNames)[keyof typeof RouteNames]]: object
}
