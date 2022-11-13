import { useHooks } from "@components/providers/web3"


export const useOwnedCourses = () => {
    return useHooks((hooks) => hooks.useOwnedCourses)()
}