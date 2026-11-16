// Initialize init libraries
import '@revenge/react/init'
import '@revenge/json-storage/init'

import { onRunApplication } from '@revenge/react/native'
import { onError } from '~index'

const unsub = onRunApplication(() => {
    unsub()

    try {
        // @as-require
        import('./start')
    } catch (e) {
        onError(e)
    }
})

// Run all init plugins
// @as-require
import '~/plugins/init'
// @as-require
import '@revenge/plugins/init'
