pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}

dependencyResolutionManagement {
    repositories {
        google()
        mavenCentral()
        maven(url = "https://api.xposed.info/")
    }
}

rootProject.name = "Valenced"
include(":android")
include(":android:api")
include(":bundle")
include(":core")

val ANDROID_PATCHES_BUILD_NAME = "android-patches"

val wantsPatches = gradle.startParameter.taskNames.any { it.startsWith(":$ANDROID_PATCHES_BUILD_NAME") }
val hasReseam = System.getenv("RESEAM_BIN")?.isNotBlank() == true ||
    System.getenv("PATH").orEmpty().split(File.pathSeparator).any { File(it, "reseam").canExecute() }

if (wantsPatches || hasReseam) includeBuild("android/patches") { name = ANDROID_PATCHES_BUILD_NAME }
