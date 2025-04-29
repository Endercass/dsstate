import { SUBSCRIBERS, REF } from "./consts.js"

export interface Ref<T, U = T> {
    // Type as readonly to prevent direct mutation without properly updating
    get val(): Readonly<T>
    set val(v: MaybeRef<T, U> | [Ref<U, any>, RefModifier<T, U>])
    [SUBSCRIBERS]: ((v: T) => void)[]
    [REF]: 1
}

export type RefModifier<T, U> = (v: U) => T
export type MaybeRef<T, U> = Ref<T, U> | T

export function isRef(obj: any): obj is Ref<any> {
    return obj && obj[REF]
}

export function ref<T>(base: T): Ref<T>;
export function ref<T, U = T>(base: Ref<U, any>, modifier: (v: U) => T): Ref<T,U>;
export function ref<T, U = T>(base: T | Ref<U, any>, modifier?: (v: U) => T): Ref<T,U> {
    let activeBases: Ref<U>[] = [];
    let _val: T;
    let _ref: Ref<T, U>;

    let assign = (v: U | T) => {
        _val = modifier ? modifier(v as U) : (v as T)
        _ref[SUBSCRIBERS].forEach((listener) => listener(_val))
    }
    
    _ref = {
        get val(): Readonly<T> {
            return Object.freeze(_val)
        },
        set val(value: MaybeRef<T, U> | [Ref<U, any>, RefModifier<T, U> | undefined]) {
            if (value !== _val) {
                activeBases.length = 0
                if (isRef(value)) {
                    activeBases.push(value)
                    watch(value, (v) => {
                        if (activeBases.includes(value))
                            assign(v)
                    })
                } else if (Array.isArray(value) && isRef(value[0]) && (
                    value.length === 1 as number || (value.length === 2 && typeof value[1] === 'function')
                )) {
                    modifier = value[1]
                    activeBases.push(value[0])
                    watch(value[0], (v) => {
                        if (activeBases.includes(value[0]))
                            assign(v)
                    })
                } else {
                    modifier = undefined
                    assign(value as T)
                }
            }
        },
        [SUBSCRIBERS]: [] as ((v: T) => void)[],
        [REF]: 1 as const
    }

    _ref.val = base as MaybeRef<T, U>

    return _ref
}

export function watch<T>(ref: Ref<T>, callback: (v: T) => void) {
    ref[SUBSCRIBERS].push(callback)
    callback(ref.val)
}