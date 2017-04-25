export interface EventResult {
}
export interface Observer {
    event: (event_result: EventResult) => void;
}
export interface Subject {
    add_observer: (observer: Observer) => void;
    remove_observer: (observer: Observer) => void;
}
export declare class SubjectBase implements Subject {
    private observers;
    add_observer(observer: Observer): void;
    remove_observer(observer: Observer): void;
    protected inform_observers(event_result: EventResult): void;
    destroy(): void;
}
