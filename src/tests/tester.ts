import assert from "assert";

const testInfo = {
    started: false,
    passed: 0,
    failed: 0,
    tests: new Set<string>()
}

export function test(name: string, action: () => void) {
    if (!testInfo.started) {
        testInfo.started = true
        setTimeout(() => console.log(`✔️  ${testInfo.passed} passed, ${testInfo.failed} failed`), 1);
    }

    if (!testInfo.tests.has(name))
        testInfo.tests.add(name)
    else
        throw new Error(`Test "${name}" already exists`)

    try {
        action();
        testInfo.passed++;
        console.log(`✅ ${name}: passed`);
    }
    catch (e: any) {
        testInfo.failed++;
        console.error(`❌ ${name}: ${e}`);
    }
}

export function testEq<T>(name: string, actual: T, expected: T) {
    test(name, () => assert.deepStrictEqual(actual, expected));
}

export type TypesAreEqual<X, Y> =
    (<T>() => T extends X ? 1 : 2) extends
    (<T>() => T extends Y ? 1 : 2) ? true : false;

export const typeEq: <X, Y>(x: X, y: Y) => TypesAreEqual<X, Y> = () => true as any
export const typeAssert: (value: true) => void = () => { }
export const typeGen: <T>() => T = <T>() => null as any as T

export type TypeAssert<T extends true> = T
