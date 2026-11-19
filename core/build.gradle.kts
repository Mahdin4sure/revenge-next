plugins {
    alias(libs.plugins.kotlin.multiplatform)
    alias(libs.plugins.android.kmp.library)
    alias(libs.plugins.kotlin.serialization)
    `maven-publish`
}

kotlin {
    jvmToolchain(libs.versions.javaVersion.get().toInt())

    android {
        namespace = "app.valenced.core"
        compileSdk = libs.versions.compileSdk.get().toInt()
        minSdk = libs.versions.minSdkLibrary.get().toInt()

        withHostTest {
            // Logger wraps android.util.Log; return default values so host tests can run.
            isReturnDefaultValues = true
        }
    }

    sourceSets {
        commonMain.dependencies {
            api(libs.kotlinx.coroutines.core)
            api(libs.okio)
            api(libs.kotlinx.serialization.json)
        }

        commonTest.dependencies {
            implementation(kotlin("test"))
            implementation(libs.okio.fakefilesystem)
        }
    }
}

// commonMain can't read BuildConfig, so the API version arrives as a generated constant.
val generateCoreConstants = tasks.register("generateCoreConstants") {
    val apiVersion = libs.versions.apiVersion.get()
    val outputDir = layout.buildDirectory.dir("generated/valenced/commonMain/kotlin")

    inputs.property("apiVersion", apiVersion)
    outputs.dir(outputDir)

    doLast {
        val file = outputDir.get().file("app/valenced/core/CoreConstants.kt").asFile
        file.parentFile.mkdirs()
        file.writeText(
            """
            package app.valenced.core

            /** The published `:android:api` version, mirrored from `gradle/libs.versions.toml`. */
            internal const val API_VERSION_STRING: String = "$apiVersion"
            """.trimIndent() + "\n"
        )
    }
}

kotlin.sourceSets.commonMain {
    kotlin.srcDir(generateCoreConstants)
}

// Forks publish to their own repository's packages.
val githubRepository = providers.environmentVariable("GITHUB_REPOSITORY").getOrElse("Valenced/valenced")

publishing {
    publications.withType<MavenPublication>().configureEach {
        groupId = "app.valenced"
        version = libs.versions.apiVersion.get()
    }

    repositories {
        // Credentials come from the `GitHubPackagesUsername` and `GitHubPackagesPassword` Gradle properties.
        maven {
            name = "GitHubPackages"
            url = uri("https://maven.pkg.github.com/$githubRepository")
            credentials(PasswordCredentials::class)
        }
    }
}
