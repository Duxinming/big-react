import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbol';
import {
	Type,
	Key,
	Ref,
	Props,
	ReactElementType,
	ElementType
} from 'shared/ReactTypes';
// ReactElementType
const ReactElementType = function (
	type: Type,
	key: Key,
	ref: Ref,
	props: Props
): ReactElementType {
	const element = {
		$$typeof: REACT_ELEMENT_TYPE,
		type,
		key,
		ref,
		props,
		__mark: 'Dxm'
	};
	return element;
};

export const jsx = (type: ElementType, config: any, ...maybeChilern: any) => {
	let key: Key = null;
	const props: Props = {};
	let ref: Ref = null;
	for (const prop in config) {
		const val = config[prop];
		if (prop === 'key') {
			if (val !== undefined) {
				key = '' + val;
			}
			continue;
		}
		if (prop === 'ref') {
			if (val !== undefined) {
				ref = val;
			}
			continue;
		}
		// 判断prop是不是config自己的属性
		/**
		 * 因为 javascript 没有将hasOwnProperty作为一个敏感词，
		 * 所以我们很有可能将对象的一个属性命名为hasOwnProperty，
		 * 这样一来就无法再使用对象原型的 hasOwnProperty 方法来判断属性是否是来自原型链
		 */
		if ({}.hasOwnProperty.call(config, prop)) {
			props[prop] = val;
		}
	}
	const maybeChilernLength = maybeChilern.length;
	if (maybeChilernLength) {
		// [child] [child,child,child]
		if (maybeChilernLength === 1) {
			props.children = maybeChilern[0];
		} else {
			props.children = maybeChilern;
		}
	}
	return ReactElementType(type, key, ref, props);
};

export const jsxDEV = (type: ElementType, config: any) => {
	let key: Key = null;
	const props: Props = {};
	let ref: Ref = null;
	for (const prop in config) {
		const val = config[prop];
		if (prop === 'key') {
			if (val !== undefined) {
				key = '' + val;
			}
			continue;
		}
		if (prop === 'ref') {
			if (val !== undefined) {
				ref = val;
			}
			continue;
		}
		// 判断prop是不是config自己的属性
		/**
		 * 因为 javascript 没有将hasOwnProperty作为一个敏感词，
		 * 所以我们很有可能将对象的一个属性命名为hasOwnProperty，
		 * 这样一来就无法再使用对象原型的 hasOwnProperty 方法来判断属性是否是来自原型链
		 */
		if ({}.hasOwnProperty.call(config, prop)) {
			props[prop] = val;
		}
	}
	return ReactElementType(type, key, ref, props);
};
