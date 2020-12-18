export interface EventResult {}

export interface Observer {
    event: (event_result: EventResult) => void
}

export interface Subject {
    add_observer: (observer: Observer) => void;
    remove_observer: (observer: Observer) => void;
}

export class SubjectBase implements Subject {
    private observers: Observer[] = [];

    add_observer(observer: Observer) {
        this.observers.push(observer);
    }

    remove_observer(observer: Observer) {
        this.observers = this.observers.filter(o => o !== observer);
    }

    protected inform_observers(event_result: EventResult) {
        this.observers.map((observer) => observer.event(event_result));
    }

    destroy(): void {
        // Remove references to listeners incase they also have a reference
        // to this instance (and therefore a circular reference).  Maybe
        // important for helping GC.
        this.observers = [];
    }
}
