package app.revenge.xposed

object RevengeConstants {
    const val TARGET_PACKAGE = "com.discord"

    const val FILES_DIR = "files/revenge"
    const val CACHE_DIR = "cache/revenge"
    const val MAIN_SCRIPT_FILE = "bundle.js"
    const val BUNDLE_MANIFEST_FILE = "manifest.json"
    const val PRELOADS_DIR = "preloads"

    const val LOADER_NAME = "RevengeAndroid"
    val LOADER_VERSION
        get() = BuildConfig.VERSION_NAME
    val USER_AGENT
        get() = "RevengeAndroid/$LOADER_VERSION"

    /**
     * Hermes bundle shipped inside this APK's `assets/` directory, built by the `:bundle` project.
     * Loaded by [app.revenge.xposed.tweaks.revengeScriptLoader].
     */
    const val BUNDLE_ASSET = "assets://revenge.bundle"
}

/**
 * Hermes bytecode assets shipped inside the Xposed module APK.
 */
val scriptAssets = emptyList<String>()
