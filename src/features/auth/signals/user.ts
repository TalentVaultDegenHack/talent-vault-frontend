import {signal} from "@preact/signals-react";

export type User = {
    id: string;
    username: string;
    email: string;
    roles: number[];
}

export const userSignal = signal<User | null>(null);