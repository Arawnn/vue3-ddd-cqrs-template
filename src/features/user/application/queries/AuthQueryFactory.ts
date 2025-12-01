import type { IAuthService } from '../../domain/IAuthService'
import type { IQueryHandler } from '@/core/application/IQueryHandler'
import type { GetCurrentUserQuery } from './GetCurrentUserQuery'
import { GetCurrentUserQueryHandler } from './GetCurrentUserQueryHandler'
import type { User } from '@/features/user/domain/User'

export interface IAuthQueryFactory {
  createGetCurrentUserQuery(): IQueryHandler<GetCurrentUserQuery, User | null>
}

export class AuthQueryFactory implements IAuthQueryFactory {
  constructor(private authService: IAuthService) {
    this.authService = authService
  }

  createGetCurrentUserQuery(): IQueryHandler<GetCurrentUserQuery, User | null> {
    return new GetCurrentUserQueryHandler(this.authService)
  }
}
