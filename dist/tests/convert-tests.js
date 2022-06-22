import { Convert } from "../lib/index.js";
import assert from "assert";
import { test } from "./tester.js";
function testConvert(name, convert, value, expectedValue) {
    test(name, () => {
        assert.deepStrictEqual(convert.convert(value), expectedValue);
    });
}
testConvert('Convert.toEnum gets the right item', Convert.toEnum(['a', 'b', 'c']), 'b', 'b');
testConvert('Convert.toEnum uses first item by default', Convert.toEnum(['a', 'b', 'c']), null, 'a');
testConvert('Convert.toEnum compares strings (1)', Convert.toEnum([null, 'true', 'false']), true, 'true');
testConvert('Convert.toEnum compares strings (2)', Convert.toEnum([null, 'true', 'false']), false, 'false');
testConvert('Convert.toString uses only item in array', Convert.toString(), [10], '10');
testConvert('Convert.toString uses first item in array', Convert.toString(), [true, false], 'true');
testConvert('Convert.toString fails for empty array', Convert.toString('DEF'), [], 'DEF');
testConvert('Convert.toString fails for object', Convert.toString('DEF'), {}, 'DEF');
testConvert('Convert.toString fails for null', Convert.toString('DEF'), null, 'DEF');
testConvert('Convert.toString fails for undefined', Convert.toString('DEF'), undefined, 'DEF');
testConvert('Convert.toNumber uses only item in array', Convert.toNumber(-1), ['10'], 10);
testConvert('Convert.toNumber uses first item in array', Convert.toNumber(-1), [true, false], 1);
testConvert('Convert.toNumber fails for empty array', Convert.toNumber(-1), [], -1);
testConvert('Convert.toNumber fails for null', Convert.toNumber(-1), null, -1);
testConvert('Convert.toNumber converts from true', Convert.toNumber(-1), true, 1);
testConvert('Convert.toNumber converts from false', Convert.toNumber(-1), false, 0);
testConvert('Convert.toNumber converts from string', Convert.toNumber(-1), '123.45', 123.45);
testConvert('Convert.toNumber converts infinity from string', Convert.toNumber(-1), 'Infinity', Infinity);
testConvert('Convert.toNumber converts -infinity from string', Convert.toNumber(-1), '-Infinity', -Infinity);
testConvert('Convert.toNumber converts NaN from string', Convert.toNumber(-1), 'NaN', NaN);
testConvert('Convert.toNumber converts from bigint', Convert.toNumber(-1), BigInt(12345), 12345);
testConvert('Convert.toNumber fails for too large bigint', Convert.toNumber(-1), BigInt(Number.MAX_SAFE_INTEGER + 1), -1);
testConvert('Convert.toNumber fails for too small bigint', Convert.toNumber(-1), BigInt(Number.MIN_SAFE_INTEGER - 1), -1);
testConvert('Convert.toFinite gets first item in array', Convert.toFinite(-1), ['-3.14', 2], -3.14);
testConvert('Convert.toFinite fails for Infinity', Convert.toFinite(-1), Infinity, -1);
testConvert('Convert.toFinite fails for NaN', Convert.toFinite(-1), NaN, -1);
testConvert('Convert.toFinite fails for string Infinity', Convert.toFinite(-1), 'Infinity', -1);
testConvert('Convert.toFinite fails for string NaN', Convert.toFinite(-1), 'NaN', -1);
testConvert('Convert.toFinite parses float', Convert.toFinite(-1), '123.45', 123.45);
testConvert('Convert.toInteger gets first item in array', Convert.toInteger(-1), ['1.2'], 1);
testConvert('Convert.toInteger rounds down', Convert.toInteger(-1), '123.45', 123);
testConvert('Convert.toInteger rounds up', Convert.toInteger(-1), '123.65', 124);
testConvert('Convert.toInteger converts from bigint', Convert.toInteger(-1), BigInt(123), 123);
testConvert('Convert.toInteger fails for too large bigint', Convert.toInteger(-1), BigInt(Number.MAX_SAFE_INTEGER + 1), -1);
testConvert('Convert.toBoolean parses true', Convert.toBoolean(null), 'true', true);
testConvert('Convert.toBoolean parses false', Convert.toBoolean(null), 'false', false);
testConvert('Convert.toBoolean does not coerce to true', Convert.toBoolean(null), 'aaaaaaaa', null);
testConvert('Convert.toBoolean does not coerce to false', Convert.toBoolean(null), '', null);
testConvert('Convert.toTruthy coerces to false', Convert.toTruthy(null), '', false);
testConvert('Convert.toTruthy coerces to true', Convert.toTruthy(null), 'aaa', true);
testConvert('Convert.toBigInt parses large integer', Convert.toBigInt(null), Number.MAX_SAFE_INTEGER.toString() + '0', BigInt(Number.MAX_SAFE_INTEGER.toString()) * BigInt(10));
testConvert('Convert.toBigInt passes through bigint', Convert.toBigInt(null), BigInt(33), BigInt(33));
testConvert('Convert.toArray accepts empty array', Convert.toArray(null), [], []);
testConvert('Convert.toArray accepts array', Convert.toArray(null), [1, 2, 3], [1, 2, 3]);
testConvert('Convert.toArray fails for object', Convert.toArray(null), {}, null);
testConvert('Convert.toCollectionOf empty array produces empty array on success', Convert.toCollectionOf([]), [1, 2, 3], []);
testConvert('Convert.toCollectionOf empty array produces empty array on error', Convert.toCollectionOf([]), null, []);
testConvert('Convert.toCollectionOf empty array converts array items', Convert.toCollectionOf([Convert.toString('DEF'), Convert.toNumber()]), [{}, 'NaN', 20], ['DEF', NaN]);
testConvert('Convert.toCollectionOf empty object produces empty object on success', Convert.toCollectionOf({}), { hi: 1 }, {});
testConvert('Convert.toCollectionOf empty object produces empty object on error', Convert.toCollectionOf({}), null, {});
testConvert('Convert.toCollectionOf empty object converts object items', Convert.toCollectionOf({ hi: Convert.toString('DEF'), bye: Convert.toNumber() }), { hi: {}, bye: '22.3' }, { hi: 'DEF', bye: 22.3 });
//# sourceMappingURL=convert-tests.js.map