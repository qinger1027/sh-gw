import type { RouteLocationNormalizedLoaded } from 'vue-router'
import {useRoute} from "vue-router"
import { watch } from 'vue'

export function useWatchRoute(callback: (route: RouteLocationNormalizedLoaded) => void) {
    const route = useRoute()
    watch(
        route,
        () => {
            callback(route)
        },
        {
            immediate: true
        }
    )
    return {
        route
    }
}
