package app.revenge.xposed.tweaks

import android.content.res.Resources
import app.revenge.xposed.RevengeConstants
import app.revenge.xposed.hook
import app.revenge.xposed.method
import app.revenge.xposed.tweak

/**
 * Hooks [Resources.getIdentifier] to rewrite the package name to `com.discord` when the host app was repackaged.
 */
val fixResources by tweak {
    val hostPkg = appInfo.packageName
    if (hostPkg == RevengeConstants.TARGET_PACKAGE) return@tweak

    Resources::class.java.method(
        "getIdentifier",
        String::class.java,
        String::class.java,
        String::class.java,
    ).hook {
        before {
            if (args[2] == hostPkg) args[2] = RevengeConstants.TARGET_PACKAGE
        }
    }
}
