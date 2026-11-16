import { getAssetIdByName } from '@revenge/assets'
import { Design } from '@revenge/discord/design'

const { Button } = Design

const RetryIcon = getAssetIdByName('RetryIcon', 'png')!

export default function RefreshButton({
    loading,
    onPress,
}: {
    loading: boolean
    onPress: () => void
}) {
    return (
        <Button
            size="sm"
            variant="secondary"
            icon={RetryIcon}
            text="Refresh"
            loading={loading}
            disabled={loading}
            onPress={onPress}
        />
    )
}
