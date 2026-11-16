package app.revenge.xposed.tweaks

import android.content.res.XModuleResources
import app.revenge.plugins.API_VERSION
import app.revenge.plugins.BUNDLE_MANIFEST_FORMAT
import app.revenge.plugins.BundleManifest
import app.revenge.plugins.parseBundleManifest
import app.revenge.xposed.RevengeConstants
import app.revenge.xposed.tweak

lateinit var bundleManifest: BundleManifest

val revengeBundleManifest by tweak {
    runCatching { DevLoader.readBundleManifest() }
        .onFailure { log.e("Unable to read development bundle manifest", it) }
        .getOrNull()?.let {
            if (setBundleManifest(it)) {
                log.i("Development bundle manifest: $bundleManifest")
                return@tweak
            }
        }

    log.i("Using module bundle manifest...")
    runCatching {
        XModuleResources.createInstance(modulePath, null)
            .assets.open(RevengeConstants.BUNDLE_MANIFEST_FILE)
            .use { it.readBytes().decodeToString() }
    }
        .onFailure { log.w("No bundle manifest in module assets", it) }
        .getOrNull()?.let {
            if (setBundleManifest(it)) return@tweak
        }

    log.w("Using fallback manifest...")
    bundleManifest = BundleManifest(BUNDLE_MANIFEST_FORMAT, API_VERSION.toString(), emptyList())
}

private fun setBundleManifest(json: String): Boolean {
    bundleManifest = parseBundleManifest(json) ?: return false

    return true
}
