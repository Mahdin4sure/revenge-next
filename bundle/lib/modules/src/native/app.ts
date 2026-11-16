import { callNativeMethodSync } from '@revenge/modules/native'

export function reloadApp() {
    callNativeMethodSync('revenge.app.reload', [])
}

declare module '@revenge/modules/native' {
    interface NativeMethods {
        'revenge.app.reload': [[], null]
    }
}
