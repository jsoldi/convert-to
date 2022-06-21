import { Maybe, Cast, Convert, TCastAll, Utils } from "./internal.js";
import { Collection, Nothing, PrimitiveValue, SimpleType, SimpleTypeOf, Struct } from "./types.js";

type TGuardEvery<A extends readonly Guard<unknown>[]> = A extends Array<infer T> ? 
    ((g: T) => void) extends ((g: Guard<infer I>) => void) ? I : unknown : 
never

// Maps { b: ? => B, c: C } to { b: B, c: C }:
type TGuardMap<T> = 
    T extends SimpleType ? SimpleTypeOf<T> :
    T extends Guard<infer R> ? R :
    T extends { [k in keyof T]: any } ? { [k in keyof T]: TGuardMap<T[k]> } :
    unknown;

export class Guard<out T = unknown> extends Cast<T> {
    constructor(public readonly guard: (input: unknown) => input is T) { 
        super(val => guard(val) ? Maybe.just(val) : Maybe.nothing());
    }

    public static readonly isUnknown = new Guard<unknown>((val): val is unknown => true);
    public static readonly isNever = new Guard<never>((val): val is never => false);

    public and<R>(right: Guard<R> | ((t: T) => t is T & R)): Guard<T & R> {
        return new Guard<T & R>((val): val is T & R => this.guard(val) && (right instanceof Guard ? right.guard(val) : right(val)));
    }

    public or<R>(right: Guard<R>): Guard<T | R>
    public or<R>(right: Convert<R>): Convert<T | R>
    public or<R>(right: Cast<R>): Cast<T | R>
    public or<R>(right: Cast<R>): Cast<T | R> {
        if (right instanceof Guard) 
            return new Guard<T | R>((val): val is T | R => this.guard(val) || right.guard(val));
        else
            return super.or(right);
    }

    public if(condition: (input: T) => boolean): Guard<T> {
        return new Guard((val): val is T => this.guard(val) && condition(val));
    }

    public static every<T extends readonly Guard<unknown>[]>(guards: T): Guard<TGuardEvery<T>> {
        return guards.reduce((acc, guard) => acc.and(guard), Guard.isUnknown) as Guard<TGuardEvery<T>>;
    }

    public static isConst<T>(value: T) {
        return new Guard((val): val is T => val === value);
    }

    public static isClass<T>(cls: new (...args: any[]) => T): Guard<T> {
        return new Guard((val): val is T => val instanceof cls);
    }

    public static isEnum<T extends readonly unknown[]>(options: T): Guard<T[number]> {
        return Guard.some(options.map(Guard.isConst));
    }

    public static get isPrimitiveValue(): Guard<PrimitiveValue> {
        return new Guard((val): val is PrimitiveValue => 
            typeof val === 'string' ||
            typeof val === 'number' ||
            typeof val === 'bigint' ||
            typeof val === 'boolean' ||
            typeof val === 'symbol'
        );
    }

    public static get isNothing(): Guard<Nothing> {
        return new Guard((val): val is Nothing => 
            val === undefined ||
            val === null
        );
    }

    public static get isObject(): Guard<object> {
        return new Guard((val): val is object => (val !== null && typeof val === 'object') || typeof val === 'function');
    }

    public static get isPrimitive() { return Guard.isPrimitiveValue.or(Guard.isNothing) }
    public static get isSomething() { return Guard.isPrimitiveValue.or(Guard.isObject) }
    //public static get isWeirdShit() { return Guard.isNothing.or(Guard.isObject); } // For completeness

    public static get isString(): Guard<string> { return new Guard((val): val is string => typeof val === 'string') }
    public static get isNumber(): Guard<number> { return new Guard((val): val is number => typeof val === 'number') }
    public static get isBigInt(): Guard<bigint> { return new Guard((val): val is bigint => typeof val === 'bigint') }
    public static get isBoolean(): Guard<boolean> { return new Guard((val): val is boolean => typeof val === 'boolean') }
    public static get isSymbol(): Guard<symbol> { return new Guard((val): val is symbol => typeof val === 'symbol') }
    public static get isFinite(): Guard<number> { return Guard.isNumber.if(Number.isFinite) }
    public static get isInteger(): Guard<number> { return Guard.isNumber.if(Number.isInteger) }
    public static get isSafeInteger(): Guard<number> { return Guard.isNumber.if(Number.isSafeInteger) }

    public static get isCollection(): Guard<Collection> { return new Guard((val): val is Collection => val !== null && typeof val === 'object') }
    public static get isStruct(): Guard<Struct> { return new Guard((val): val is Struct => val !== null && typeof val === 'object' && !Array.isArray(val)) }
    public static get isArray(): Guard<Array<unknown>> { return new Guard((val): val is Array<unknown> => Array.isArray(val)) }
    public static get isFunction(): Guard<Function> { return new Guard((val): val is Function => typeof val === 'function') }

    public static isInstanceOf<T>(cls: new (...args: any[]) => T): Guard<T> {
        return new Guard((val): val is T => val instanceof cls);
    }

    public static isArrayOf<T>(guard: Guard<T>): Guard<T[]> {
        return Guard.isArray.and((val): val is T[] => val.every(guard.guard));
    }

    public static isCollectionOf<T extends Collection<Guard>>(guards: T): Guard<TCastAll<T>> {
        return Guard.isCollection.and((col): col is TCastAll<T> => 
            Object.entries(guards).every(([k, g]) => g.guard((col as Struct)[k]))
        );
    }
    
    public static is<T>(alt: T): Guard<TGuardMap<T>> {
        switch (typeof alt) {
            case 'string':
                return Guard.isString as Guard<TGuardMap<T>>;
            case 'number':
                if (Number.isInteger(alt))
                    return Guard.isInteger as Guard<TGuardMap<T>>;
                else if (Number.isFinite(alt))
                    return Guard.isFinite as Guard<TGuardMap<T>>;
                else
                    return Guard.isNumber as Guard<TGuardMap<T>>;
            case 'boolean':
                return Guard.isBoolean as Guard<TGuardMap<T>>;
            case 'bigint':
                return Guard.isBigInt as Guard<TGuardMap<T>>;
            case 'symbol':
                return Guard.isSymbol as Guard<TGuardMap<T>>;
            case 'undefined':
                return Guard.isConst(undefined) as Guard<TGuardMap<T>>;
            case 'function':
                return Guard.isFunction as Guard<TGuardMap<T>>;
            case 'object': 
                if (alt instanceof Guard)
                    return alt;
                else if (alt === null)
                    return Guard.isConst(null) as Guard<TGuardMap<T>>;
        }

        return Guard.isCollectionOf(Utils.map(Guard.is)(alt as any)) as Guard<TGuardMap<T>>
    }
}