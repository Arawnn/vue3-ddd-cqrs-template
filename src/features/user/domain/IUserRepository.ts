import { User } from './User'
import { UserId } from './UserId'
import { Email } from './Email'
export interface IUserRepository {
  create(user: User): Promise<User>
  save(user: User): Promise<User>
  delete(id: UserId): Promise<void>
  findById(id: UserId): Promise<User | null>
  findByEmail(email: Email): Promise<User | null>
  findAll(): Promise<User[] | null>
}
