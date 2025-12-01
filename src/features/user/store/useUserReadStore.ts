import { defineStore } from 'pinia'
import { computed, inject, ref } from 'vue'
import { GetCurrentUserQuery } from '../application/queries/GetCurrentUserQuery'
import { AuthQueryFactoryKey } from '@/app/providers/tokens'
import type { IAuthQueryFactory } from '../application/queries/AuthQueryFactory'
import { UserViewModels } from '../ui/viewmodels/UserViewModels'
import { User } from '@/features/user/domain/User'

export const useUserReadStore = defineStore('userRead', () => {
  const user = ref<User | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const authQueryFactory = inject<IAuthQueryFactory>(AuthQueryFactoryKey)!

  const currentUser = computed(() => {
    return user.value ? new UserViewModels(user.value as User) : null
  })

  const loadCurrentUser = async () => {
    try {
      isLoading.value = true
      error.value = null

      const getCurrentUserQueryHandler = authQueryFactory.createGetCurrentUserQuery()
      user.value = await getCurrentUserQueryHandler.query(new GetCurrentUserQuery(null))
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load user'
    } finally {
      isLoading.value = false
    }
  }
  const clearError = () => {
    error.value = null
  }

  return {
    currentUser,
    isLoading,
    error,
    loadCurrentUser,
    clearError,
  }
})
