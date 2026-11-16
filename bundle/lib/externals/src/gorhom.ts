import { lookupModule } from '@revenge/modules/finders'
import { withDependencies, withProps } from '@revenge/modules/finders/filters'
import { proxify } from '@revenge/utils/proxy'

const { partial, relative } = withDependencies

export let BottomSheet: typeof import('@gorhom/bottom-sheet') = proxify(
    () => {
        const [module] = lookupModule(
            withProps<typeof BottomSheet>(
                'BottomSheetModal',
                'BottomSheetScrollView',
            )
                // [constants, ...]
                .and(withDependencies(partial([relative(1), relative(2)])))
                .keyAs('revenge.externals.Gorhom.BottomSheet'),
        )

        if (module) return (BottomSheet = module)
    },
    {
        hint: {},
    },
)!
