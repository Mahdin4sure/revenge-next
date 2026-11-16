import type { RunApplicationCallback } from '@revenge/react/types'

export const sBeforeRunApplication = new Set<RunApplicationCallback>()
export const sAfterRunApplication = new Set<RunApplicationCallback>()
