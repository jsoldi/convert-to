// ---------------- Type guarding ----------------
import { Guard, Convert, Cast } from "../lib/index.js";
// ---------------- Type guarding ----------------
const guard = Guard.is({
    integer: 10,
    float: Number.EPSILON,
    boolean: false,
    tuple: [20, 'default', false],
    arrayOfNumbers: Guard.isArrayOf(Guard.isFinite),
    even: Guard.isInteger.if(n => n % 2 === 0),
    object: {
        union: Guard.some(Guard.isConst(null), Guard.isString, Guard.isNumber),
        intersection: Guard.every(Guard.is({ int: 0 }), Guard.is({ str: "" }))
    }
});
const valid = {
    integer: 123,
    float: 3.14159,
    boolean: true,
    tuple: [10, 'hello', true, 'ignore me'],
    arrayOfNumbers: [-1, 1, 2.5, Number.MAX_VALUE],
    even: 16,
    object: {
        union: null,
        intersection: { int: 100, str: 'good bye' }
    }
};
if (guard.guard(valid)) {
    // In this context, valid has type:
    // {
    //     integer: number;
    //     float: number;
    //     boolean: boolean;
    //     tuple: readonly [number, string, boolean];
    //     arrayOfNumbers: number[];
    //     even: number;
    //     object: {
    //         union: string | number | null;
    //         intersection: { int: number } & { str: string }
    //     }
    // }
    console.log('valid'); // valid
}
// ---------------- Type casting / converting ----------------
const converter = Convert.to({
    integer: 0,
    floatDefaultToEPSILON: Number.EPSILON,
    floatDefaultToZero: Convert.toFinite(0),
    string: '',
    boolean: false,
    trueIfTruthyInput: Convert.toTruthy(),
    tuple: [0, '', false],
    arrayOfInts: Convert.toArrayOf(Convert.to(0)),
    percentage: Convert.toFinite(.5).map(x => Math.round(x * 100) + '%'),
    enum: Convert.toEnum('zero', 'one', 'two', 'three'),
    object: {
        originalAndConverted: Convert.all({
            original: Convert.id,
            converted: Convert.to('')
        }),
        strictNumberOrString: Guard.isNumber.or(Convert.to('')),
        relaxedNumberOrString: Cast.asNumber.or(Convert.to(''))
    }
});
console.log(converter.convert({ ignored: 'ignored' }));
// {
//     integer: 0,
//     floatDefaultToEPSILON: 2.220446049250313e-16,
//     floatDefaultToZero: 0,
//     string: '',
//     boolean: false,
//     trueIfTruthyInput: false,
//     tuple: [ 0, '', false ],
//     arrayOfInts: [],
//     percentage: '50%',
//     enum: 'zero',
//     object: {
//         originalAndConverted: { original: undefined, converted: '' },
//         strictNumberOrString: '',
//         relaxedNumberOrString: ''
//     }
// }
console.log(converter.convert({
    integer: 2.99,
    floatDefaultToEPSILON: '3.14',
    floatDefaultToZero: 'cannot parse this',
    string: 'hello',
    boolean: 'true',
    trueIfTruthyInput: [],
    tuple: ['10', 3.14159, 1, 'ignored'],
    arrayOfInts: ['10', 20, '30', false, true],
    percentage: ['0.33333'],
    enum: 'two',
    object: {
        originalAndConverted: 12345,
        strictNumberOrString: '-Infinity',
        relaxedNumberOrString: '-Infinity'
    }
}));
// {
//     integer: 3,
//     floatDefaultToEPSILON: 3.14,
//     floatDefaultToZero: 0,
//     string: 'hello',
//     boolean: true,
//     trueIfTruthyInput: true,
//     tuple: [ 10, '3.14159', true ],
//     arrayOfInts: [ 10, 20, 30, 0, 1 ],
//     percentage: '33%',
//     enum: 'two',
//     object: {
//         originalAndConverted: { original: 12345, converted: '12345' },
//         strictNumberOrString: '-Infinity',
//         relaxedNumberOrString: -Infinity
//     }
// }
//# sourceMappingURL=aaa.js.map