interface UseMutationReturn {
  pending: Ref<boolean>
  mutate: (args?: any) => void
}

/**
 * ## useMutation
 *
 * handle the user mutation function
 * that become more interactive and easy to mutate
 *
 * @param mutateFn the function to run for mutate
 * @param options options when something happen to mutation
 * @returns UseMutationReturn
 */
function useMutation<D extends any, E extends any>(
  mutateFn: (args?: any) => Promise<any>,
  options?: {
    onSuccess?: (data?: D) => void
    onError?: (error?: E) => void
    onPending?: () => void
  }
): UseMutationReturn {
  // define the reference that will be return
  const pendingRef = ref<boolean>(false)

  return {
    pending: pendingRef,
    mutate: async (args) => {
      try {
        pendingRef.value = true

        // start to fetching the
        // function to mutate
        const res = await mutateFn(args)

        if (options?.onSuccess) {
          options.onSuccess(res)
        }
        pendingRef.value = false
      } catch (error: any) {
        if (options?.onError) {
          options.onError(error)
        }
        pendingRef.value = false
      }
    }
  }
}

export default useMutation
