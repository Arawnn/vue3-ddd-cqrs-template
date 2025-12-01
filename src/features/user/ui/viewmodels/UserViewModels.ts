import type { User } from '@/features/user/domain/User'

export class UserViewModels {
  constructor(private user: User) {}

  get email(): string {
    return this.user.email.value
  }

  get lastSignedInAt(): Date | null {
    return this.user.lastSignedInAt
  }
}
