import type { DomainEvent } from './DomainEvent'
import type { ILogger } from './Logger'

export type EventHandler<T extends DomainEvent = DomainEvent> = (event: T) => void | Promise<void>

export interface IEventBus {
  on<T extends DomainEvent>(eventName: string, handler: EventHandler<T>): () => void
  publish(events: DomainEvent[]): void
  off<T extends DomainEvent>(eventName: string, handler: EventHandler<T>): void
}
