package app.revenge.xposed

import android.app.Activity
import android.content.Context
import android.content.pm.ApplicationInfo
import de.robv.android.xposed.IXposedHookLoadPackage
import de.robv.android.xposed.IXposedHookZygoteInit
import de.robv.android.xposed.callbacks.XC_LoadPackage
import app.revenge.bridge.RevengeBridge
import app.revenge.xposed.api.HostScope
import app.revenge.xposed.tweaks.*
import app.revenge.xposed.tweaks.base.lifecycleSupport
import app.revenge.xposed.tweaks.base.scriptLoader
import app.revenge.xposed.tweaks.bridge.RevengeBridgeRegistry
import app.revenge.xposed.tweaks.bridge.additionalBridgeMethods
import app.revenge.xposed.tweaks.bridge.revengeBridgeSupport
import app.revenge.xposed.tweaks.plugins.pluginInstallMethods
import app.revenge.xposed.tweaks.plugins.pluginLoader
import app.revenge.xposed.tweaks.plugins.pluginMethods
import app.revenge.xposed.tweaks.plugins.pluginStates
import app.revenge.xposed.tweaks.plugins.repos.pluginRepos

private lateinit var modulePath: String

@Suppress("UNUSED")
class Main : IXposedHookLoadPackage, IXposedHookZygoteInit {
    @Volatile
    private var hooked = false

    private val tweaks: List<TweakSpec> = listOf(
        // Framework
        lifecycleSupport,
        revengeBridgeSupport,
        scriptLoader,
        discordVersionRetriever,

        // Static patches
        fixResources,

        // Persistence
        caches,
        pluginStates,
        pluginRepos,

        // Async updater
        devLoader,
        revengeBundleManifest,

        // Consumers
        recoveryCompanion,
        discordDevSupport,
        additionalBridgeMethods,
        pluginLoader,
        pluginMethods,
        pluginInstallMethods,
        revengeScriptLoader,
    )

    override fun initZygote(startupParam: IXposedHookZygoteInit.StartupParam) {
        modulePath = startupParam.modulePath
    }

    override fun handleLoadPackage(param: XC_LoadPackage.LoadPackageParam) {
        // Only hook the main process.
        // Discord uses ProcessPhoenix to spawn a ":phoenix" process to restart the app. It will cause concurrency issues.
        if (param.processName != param.packageName) return

        if (hooked) return
        hooked = true

        val ctx = HostScopeImpl(
            modulePath = modulePath,
            appInfo = param.appInfo,
            classLoader = param.classLoader,
        )
        DexFinder.init(param.appInfo, param.classLoader, modulePath)
        for (spec in tweaks) spec.applyTo(ctx)
        DexFinder.release()
    }
}

private class HostScopeImpl(
    override val modulePath: String,
    override val appInfo: ApplicationInfo,
    override val classLoader: ClassLoader,
) : HostScope {
    override val bridge: RevengeBridge get() = RevengeBridgeRegistry
    override val dexFinder: DexFinder get() = DexFinder
    override fun withAppContext(block: (Context) -> Unit) = app.revenge.xposed.tweaks.base.withAppContext(block)
    override fun withAppActivity(block: (Activity) -> Unit) =
        app.revenge.xposed.tweaks.base.withAppActivity(block)
}