package app.revenge.xposed.tweaks.plugins.repos

import app.revenge.plugins.PluginErrorCodes
import app.revenge.plugins.PluginSystemError
import app.revenge.plugins.repos.RepoIndex
import app.revenge.plugins.repos.RepoStore
import app.revenge.plugins.repos.parseRepoIndex
import app.revenge.xposed.ETagFetchResult
import app.revenge.xposed.getWithETag
import app.revenge.xposed.httpClient

private const val REFRESH_TIMEOUT = 10_000L

/**
 * Refreshes one repository's cached index for a single source. A failed fetch or invalid index won't modify the cache.
 *
 * @return Returns the new index.
 * @throws PluginSystemError if the repository is unknown, the cache is unreadable, or the index format is unsupported.
 */
internal suspend fun refreshRepo(url: String): RepoIndex {
    if (RepoStore.list().none { it.url == url }) throw PluginSystemError(
        PluginErrorCodes.NOT_FOUND,
        "Unknown repository: '$url'"
    )

    val result = httpClient.getWithETag(
        url = url.trimEnd('/'),
        etag = RepoStore.cachedETag(url),
        timeoutMillis = REFRESH_TIMEOUT,
    )

    return when (result) {
        ETagFetchResult.NotModified ->
            RepoStore.cachedIndex(url)
                ?: throw PluginSystemError(
                    PluginErrorCodes.STORAGE_FAILED,
                    "Repository '$url' responded 304 but the cache is unreadable",
                )

        is ETagFetchResult.Fetched -> {
            val text = result.bytes.decodeToString()
            val index = parseRepoIndex(text, url, RepoStore.log)

            RepoStore.writeCachedIndex(url, text, result.etag)

            index
        }
    }
}
