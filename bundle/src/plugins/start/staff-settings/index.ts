import { ToastActionCreators } from '@revenge/discord/actions'
import { getStore, Stores } from '@revenge/discord/flux'
import { withProps } from '@revenge/modules/finders/filters'
import { instead } from '@revenge/patcher'
import { registerInternalPlugin } from '@revenge/plugins/_'
import { lookupGeneratedIconComponent } from '@revenge/utils/discord'
import { lazyModule } from '@revenge/utils/modules/lazy'
import manifest from './manifest.json'
import type { DiscordModules } from '@revenge/discord/types'

registerInternalPlugin(manifest, {
    start({ cleanup, logger, plugin }) {
        const CircleInformationIcon = lookupGeneratedIconComponent(
            'CircleInformationIcon',
            'CircleInformationIcon-secondary',
            'CircleInformationIcon-primary',
        )

        const showToast = () =>
            ToastActionCreators.open('REVENGE_STAFF_SETTINGS_ACTION', {
                text: 'Navigate out of Settings to apply changes',
                icon: CircleInformationIcon,
            })

        function reset() {
            getStore<{
                initialize(): void
            }>('DeveloperExperimentStore', store => {
                logger.log(
                    'Reinitializing DeveloperExperimentStore to apply changes...',
                )

                const unpatch = instead(
                    Object,
                    'defineProperties',
                    args => args[0],
                )

                store.initialize()
                unpatch()
            })
        }

        cleanup(
            lazyModule(withProps('isStaffEnv')).use(UserStoreUtils => {
                logger.log('Patching UserStoreUtils...')

                const unpatch = instead(
                    UserStoreUtils,
                    'isStaffEnv',
                    ([user]) =>
                        user ===
                        (
                            Stores.UserStore as DiscordModules.Flux.Store<{
                                getCurrentUser(): unknown
                            }>
                        ).getCurrentUser(),
                )

                reset()
                if (plugin.startedLate) showToast()

                return () => {
                    unpatch()
                    reset()
                    showToast()
                }
            }),
        )
    },
})
