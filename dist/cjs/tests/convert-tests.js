"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../lib/index.js");
const tester_js_1 = require("./tester.js");
function testConvert(name, convert, value, expectedValue) {
    (0, tester_js_1.testEq)(name, convert.convert(value), expectedValue);
}
testConvert('Convert.toEnum gets the right item', index_js_1.Convert.toEnum('a', 'b', 'c'), 'b', 'b');
testConvert('Convert.toEnum uses first item by default', index_js_1.Convert.toEnum('a', 'b', 'c'), null, 'a');
testConvert('Convert.toEnum compares strings (1)', index_js_1.Convert.toEnum(null, 'true', 'false'), true, 'true');
testConvert('Convert.toEnum compares strings (2)', index_js_1.Convert.toEnum(null, 'true', 'false'), false, 'false');
testConvert('Convert.toString uses only item in array', index_js_1.Convert.toString(), [10], '10');
testConvert('Convert.toString fails for multiple items array', index_js_1.Convert.toString('DEF'), [true, false], 'DEF');
testConvert('Convert.toString defaults for empty array', index_js_1.Convert.toString('DEF'), [], 'DEF');
testConvert('Convert.toString defaults for object', index_js_1.Convert.toString('DEF'), {}, 'DEF');
testConvert('Convert.toString defaults for null', index_js_1.Convert.toString('DEF'), null, 'DEF');
testConvert('Convert.toString defaults for undefined', index_js_1.Convert.toString('DEF'), undefined, 'DEF');
testConvert('Convert.toNumber uses only item in array', index_js_1.Convert.toNumber(-1), ['10'], 10);
testConvert('Convert.toNumber fails for multiple items array', index_js_1.Convert.toNumber(-1), [true, false], -1);
testConvert('Convert.toNumber defaults for empty array', index_js_1.Convert.toNumber(-1), [], -1);
testConvert('Convert.toNumber defaults for null', index_js_1.Convert.toNumber(-1), null, -1);
testConvert('Convert.toNumber converts from true', index_js_1.Convert.toNumber(-1), true, 1);
testConvert('Convert.toNumber converts from false', index_js_1.Convert.toNumber(-1), false, 0);
testConvert('Convert.toNumber converts from string', index_js_1.Convert.toNumber(-1), '123.45', 123.45);
testConvert('Convert.toNumber converts infinity from string', index_js_1.Convert.toNumber(-1), 'Infinity', Infinity);
testConvert('Convert.toNumber converts -infinity from string', index_js_1.Convert.toNumber(-1), '-Infinity', -Infinity);
testConvert('Convert.toNumber converts NaN from string', index_js_1.Convert.toNumber(-1), 'NaN', NaN);
testConvert('Convert.toNumber converts from bigint', index_js_1.Convert.toNumber(-1), BigInt(12345), 12345);
testConvert('Convert.toNumber defaults for too large bigint', index_js_1.Convert.toNumber(-1), BigInt(Number.MAX_SAFE_INTEGER + 1), -1);
testConvert('Convert.toNumber defaults for too small bigint', index_js_1.Convert.toNumber(-1), BigInt(Number.MIN_SAFE_INTEGER - 1), -1);
testConvert('Convert.toFinite gets only item in array', index_js_1.Convert.toFinite(-1), ['-3.14'], -3.14);
testConvert('Convert.toFinite fails for multiple items array', index_js_1.Convert.toFinite(-1), ['-3.14', 2], -1);
testConvert('Convert.toFinite defaults for Infinity', index_js_1.Convert.toFinite(-1), Infinity, -1);
testConvert('Convert.toFinite defaults for NaN', index_js_1.Convert.toFinite(-1), NaN, -1);
testConvert('Convert.toFinite defaults for string Infinity', index_js_1.Convert.toFinite(-1), 'Infinity', -1);
testConvert('Convert.toFinite defaults for string NaN', index_js_1.Convert.toFinite(-1), 'NaN', -1);
testConvert('Convert.toFinite parses float', index_js_1.Convert.toFinite(-1), '123.45', 123.45);
testConvert('Convert.toInteger gets only item in array', index_js_1.Convert.toInteger(-1), ['1.2'], 1);
testConvert('Convert.toInteger fails for multiple items asrray', index_js_1.Convert.toInteger(-1), ['1.2', '2.3'], -1);
testConvert('Convert.toInteger rounds down', index_js_1.Convert.toInteger(-1), '123.45', 123);
testConvert('Convert.toInteger rounds up', index_js_1.Convert.toInteger(-1), '123.65', 124);
testConvert('Convert.toInteger converts from bigint', index_js_1.Convert.toInteger(-1), BigInt(123), 123);
testConvert('Convert.toInteger defaults for too large bigint', index_js_1.Convert.toInteger(-1), BigInt(Number.MAX_SAFE_INTEGER + 1), -1);
testConvert('Convert.toBoolean parses true', index_js_1.Convert.toBoolean(null), 'true', true);
testConvert('Convert.toBoolean parses false', index_js_1.Convert.toBoolean(null), 'false', false);
testConvert('Convert.toBoolean does not coerce to true', index_js_1.Convert.toBoolean(null), 'aaaaaaaa', null);
testConvert('Convert.toBoolean does not coerce to false', index_js_1.Convert.toBoolean(null), '', null);
testConvert('Convert.toTruthy coerces to false', index_js_1.Convert.toTruthy(), null, false);
testConvert('Convert.toTruthy coerces to true', index_js_1.Convert.toTruthy(), [], true);
testConvert('Convert.toBigInt parses large integer', index_js_1.Convert.toBigInt(null), Number.MAX_SAFE_INTEGER.toString() + '0', BigInt(Number.MAX_SAFE_INTEGER.toString()) * BigInt(10));
testConvert('Convert.toBigInt passes through bigint', index_js_1.Convert.toBigInt(null), BigInt(33), BigInt(33));
testConvert('Convert.toArray accepts empty array', index_js_1.Convert.toArray(null), [], []);
testConvert('Convert.toArray accepts array', index_js_1.Convert.toArray(null), [1, 2, 3], [1, 2, 3]);
testConvert('Convert.toArray defaults for null', index_js_1.Convert.toArray('DEF'), null, 'DEF');
testConvert('Convert.toArray defaults for undefined', index_js_1.Convert.toArray('DEF'), null, 'DEF');
testConvert('Convert.toArray wraps object', index_js_1.Convert.toArray(null), { hi: 123 }, [{ hi: 123 }]);
testConvert('Convert.toArray wraps primitive', index_js_1.Convert.toArray(null), 123, [123]);
testConvert('Convert.toArrayOf converts empty array', index_js_1.Convert.toArrayOf(index_js_1.Convert.toString(), null), [], []);
testConvert('Convert.toArrayOf converts array contents', index_js_1.Convert.toArrayOf(index_js_1.Convert.toString(), null), [1, 2, 3], ['1', '2', '3']);
testConvert('Convert.toArrayOf wraps primitive', index_js_1.Convert.toArrayOf(index_js_1.Convert.id, 'DEF'), 'hello', ['hello']);
testConvert('Convert.toArrayOf wraps object', index_js_1.Convert.toArrayOf(index_js_1.Convert.id, 'DEF'), { hi: 123 }, [{ hi: 123 }]);
testConvert('Convert.toArrayOf defaults for null', index_js_1.Convert.toArrayOf(index_js_1.Convert.id, 'DEF'), null, 'DEF');
testConvert('Convert.toArrayOf defaults for undefined', index_js_1.Convert.toArrayOf(index_js_1.Convert.id, 'DEF'), undefined, 'DEF');
testConvert('Convert.toStructOf converts empty struct', index_js_1.Convert.toStructOf(index_js_1.Convert.toString(), null), {}, {});
testConvert('Convert.toStructOf converts struct contents', index_js_1.Convert.toStructOf(index_js_1.Convert.toString(), null), { uno: 10, dos: '20' }, { uno: '10', dos: '20' });
testConvert('Convert.toStructOf defaults for array', index_js_1.Convert.toStructOf(index_js_1.Convert.id, 'DEF'), [], 'DEF');
testConvert('Convert.toStructOf defaults for primitive', index_js_1.Convert.toStructOf(index_js_1.Convert.id, 'DEF'), 123, 'DEF');
testConvert('Convert.toStructOf defaults for null', index_js_1.Convert.toStructOf(index_js_1.Convert.id, 'DEF'), null, 'DEF');
testConvert('Convert.toStructOf defaults for undefined', index_js_1.Convert.toStructOf(index_js_1.Convert.id, 'DEF'), undefined, 'DEF');
testConvert('Convert.to empty array produces empty array on success', index_js_1.Convert.to([]), [1, 2, 3], []);
testConvert('Convert.to empty array produces empty array on error', index_js_1.Convert.to([]), null, []);
testConvert('Convert.to array converts array items', index_js_1.Convert.to([index_js_1.Convert.toString('DEF'), index_js_1.Convert.toNumber()]), [{}, 'NaN', 20], ['DEF', NaN]);
testConvert('Convert.to empty object produces empty object on success', index_js_1.Convert.to({}), { hi: 1 }, {});
testConvert('Convert.to empty object produces empty object on error', index_js_1.Convert.to({}), null, {});
testConvert('Convert.to object converts object items', index_js_1.Convert.to({ hi: index_js_1.Convert.toString('DEF'), bye: index_js_1.Convert.toNumber() }), { hi: {}, bye: '22.3' }, { hi: 'DEF', bye: 22.3 });
testConvert('Convert.toNumber converts false to 0', index_js_1.Convert.toNumber(-1), false, 0);
testConvert('Convert.toNumber converts true to 1', index_js_1.Convert.toNumber(-1), true, 1);
testConvert('Convert.toFinite converts false to 0', index_js_1.Convert.toFinite(-1), false, 0);
testConvert('Convert.toFinite converts true to 1', index_js_1.Convert.toFinite(-1), true, 1);
testConvert('Convert.toInteger converts false to 0', index_js_1.Convert.toInteger(-1), false, 0);
testConvert('Convert.toInteger converts true to 1', index_js_1.Convert.toInteger(-1), true, 1);
testConvert('Convert.toBigInt converts false to 0', index_js_1.Convert.toBigInt(BigInt(-1)), false, BigInt(0));
testConvert('Convert.toBigInt converts true to 1', index_js_1.Convert.toBigInt(BigInt(-1)), true, BigInt(1));
const convertAllEmptyArray = index_js_1.Convert.all([]);
const convertAllEmptyStruct = index_js_1.Convert.all({});
const convertAllStringInArray = index_js_1.Convert.all([index_js_1.Convert.toString()]);
const convertAllStringInStruct = index_js_1.Convert.all({ a: index_js_1.Convert.toString() });
const convertAllCastInArray = index_js_1.Convert.all([index_js_1.Cast.asString]);
const convertAllCastInStruct = index_js_1.Convert.all({ a: index_js_1.Cast.asString });
const convertAllCastAndConvertInArray = index_js_1.Convert.all([index_js_1.Convert.toString(), index_js_1.Cast.asNumber]);
const convertAllCastAndConvertInTuple = index_js_1.Convert.all([index_js_1.Convert.toString(), index_js_1.Cast.asNumber]);
const convertAllCastAndConvertInStruct = index_js_1.Convert.all({ a: index_js_1.Convert.toString(), b: index_js_1.Cast.asNumber });
(0, tester_js_1.testEq)('Convert.all empty array produces a Convert', index_js_1.Convert.all([]).constructor.name, index_js_1.Convert.prototype.constructor.name);
(0, tester_js_1.testEq)('Convert.all empty struct produces a Convert', index_js_1.Convert.all({}).constructor.name, index_js_1.Convert.prototype.constructor.name);
(0, tester_js_1.testEq)('Convert.all with Cast in array produces a Cast', index_js_1.Convert.all([index_js_1.Cast.asString]).constructor.name, index_js_1.Cast.prototype.constructor.name);
(0, tester_js_1.testEq)('Convert.all with Cast in struct produces a Cast', index_js_1.Convert.all({ hi: index_js_1.Cast.asString }).constructor.name, index_js_1.Cast.prototype.constructor.name);
(0, tester_js_1.testEq)('Convert.all with Convert in array produces a Convert', index_js_1.Convert.all([index_js_1.Convert.toString()]).constructor.name, index_js_1.Convert.prototype.constructor.name);
(0, tester_js_1.testEq)('Convert.all with Convert in struct produces a Convert', index_js_1.Convert.all({ hi: index_js_1.Convert.toString() }).constructor.name, index_js_1.Convert.prototype.constructor.name);
(0, tester_js_1.testEq)('Convert.all with both in array produces a Cast', index_js_1.Convert.all([index_js_1.Convert.toString(), index_js_1.Cast.asString]).constructor.name, index_js_1.Cast.prototype.constructor.name);
(0, tester_js_1.testEq)('Convert.all with both in struct produces a Cast', index_js_1.Convert.all({ hi: index_js_1.Convert.toString(), bye: index_js_1.Cast.asString }).constructor.name, index_js_1.Cast.prototype.constructor.name);
testConvert('Convert.all converts null to empty array', index_js_1.Convert.all([]).else('DEF'), null, []);
testConvert('Convert.all converts null to empty struct', index_js_1.Convert.all({}).else('DEF'), null, {});
testConvert('Convert.toDate defaults for null', index_js_1.Convert.toDate('DEF'), null, 'DEF');
testConvert('Convert.toDate defaults for undefined', index_js_1.Convert.toDate('DEF'), undefined, 'DEF');
testConvert('Convert.toDate defaults for invalid date', index_js_1.Convert.toDate('DEF'), new Date(NaN), 'DEF');
testConvert('Convert.toDate converts valid date', index_js_1.Convert.toDate('DEF'), new Date('2020-01-02T03:04:05.678+01:00'), new Date('2020-01-02T03:04:05.678+01:00'));
testConvert('Convert.toDate converts string', index_js_1.Convert.toDate('DEF'), '2020-01-02T03:04:05.678+01:00', new Date('2020-01-02T03:04:05.678+01:00'));
testConvert('Convert.toDate fails for invalid string', index_js_1.Convert.toDate('DEF'), 'invalid', 'DEF');
testConvert('Convert.toDate converts valid number', index_js_1.Convert.toDate('DEF'), 1577836800000, new Date('2020-01-01T00:00:00.000Z'));
testConvert('Convert.toDate fails for float', index_js_1.Convert.toDate('DEF'), 1577836800000.1, 'DEF');
testConvert('Convert.toDate fails for unsafe integer', index_js_1.Convert.toDate('DEF'), 999999999999999 * 10, 'DEF');
testConvert('Cast.elseNothing returns nothing on fail', index_js_1.Cast.asInteger.toMaybe, [], index_js_1.Maybe.nothing());
testConvert('Cast.elseNothing returns something on success', index_js_1.Cast.asInteger.toMaybe, '123', index_js_1.Maybe.just(123));
(0, tester_js_1.testEq)('Cast.elseThrow returns a convert', index_js_1.Cast.asInteger.elseThrow().constructor.name, index_js_1.Convert.prototype.constructor.name);
testConvert('Cast.elseThrow converts valid value', index_js_1.Cast.asInteger.elseThrow(), '123', 123);
(0, tester_js_1.testError)('Cast.elseThrow throws for invalid value with default message', 'Cast has no value', () => index_js_1.Cast.asInteger.elseThrow().convert('bad'));
(0, tester_js_1.testError)('Cast.elseThrow throws for invalid value with custom message', 'Bad number', () => index_js_1.Cast.asInteger.elseThrow(() => new Error('Bad number')).convert('bad'));
//# sourceMappingURL=convert-tests.js.map