package app.revenge.xposed.tweaks.plugins.internal

import app.revenge.plugins.API_VERSION
import app.revenge.plugins.PluginManifest
import app.revenge.xposed.api.registerNativeMethod

private val manifest = PluginManifest(
    id = "revenge.example",
    name = "Example Plugin",
    description = "Example plugin.",
    author = "Revenge",
    version = API_VERSION,
)

internal val examplePlugin =
    internalPlugin(manifest, setOf(InternalPluginFlags.INTERNAL, InternalPluginFlags.ESSENTIAL)) {
        start {
            log.i("started in ${appInfo.packageName}")
            registerNativeMethod("revenge.example.test") { args ->
                log.i("revenge.example.test($args)")
                null
            }

            registerNativeMethod("revenge.example.test.error") {
                errors.tryEmit(Exception("Test exception!"))
            }
        }
    }