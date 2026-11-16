package app.revenge.xposed.tweaks

import app.revenge.xposed.RevengeConstants
import app.revenge.xposed.tweak
import app.revenge.xposed.tweaks.base.InjectorScope
import app.revenge.xposed.tweaks.base.registerScriptInjector

/**
 * Loads the Revenge bundle shipped in this module's APK. Depends on [app.revenge.xposed.tweaks.base.scriptLoader].
 *
 * Debug builds can run preloads and a development bundle from [DevLoader] instead.
 */
val revengeScriptLoader by tweak {
    registerScriptInjector { scope: InjectorScope ->
        runRevengeScripts(scope)
    }
}

private fun runRevengeScripts(scope: InjectorScope) {
    val log = scope.tweakLog
    log.i("Running Revenge scripts...")

    try {
        val devBundle = DevLoader.awaitBundle()

        for (f in DevLoader.preloads()) {
            log.d("Running preload: ${f.absolutePath}")
            scope.runFile(f.absolutePath)
        }

        if (devBundle != null) {
            log.i("Loading development bundle: ${devBundle.absolutePath}")
            scope.runFile(devBundle.absolutePath)
        } else {
            scope.runAsset(RevengeConstants.BUNDLE_ASSET)
        }
    } catch (e: Throwable) {
        log.e("Unable to run Revenge scripts", e)
    }
}
