import { FiberNode } from 'react-reconciler/src/fiber';
import { HostComponent, HostText } from 'react-reconciler/src/workTags';
import { DOMElement, updateFiberProps } from 'react-dom/src/SynthericEvent';
import { Props } from 'shared/ReactTypes';

export type Container = Element;
export type Instance = Element;
export type TextInstacne = Text;

// export const createInstance = (type: string, props: any): Instance => {
export const createInstance = (type: string, props: Props): Instance => {
	// TODO 处理props
	const element = document.createElement(type) as unknown;
	updateFiberProps(element as DOMElement, props);
	return element as DOMElement;
};

export const appendInitialChild = (parent: Instance, children: Instance) => {
	parent.appendChild(children);
};

export const createTextInstance = (content: string) => {
	return document.createTextNode(content);
};

export const appendChildToContainer = appendInitialChild;

export function commitUpdate(fiber: FiberNode) {
	switch (fiber.tag) {
		case HostText:
			const text = fiber.memoizedProps.content;
			return commitTextUpdate(fiber.stateNode, text);
		case HostComponent:
			return;
		default:
			if (__DEV__) {
				console.warn('未实现的Update类型', fiber);
			}
			break;
	}
}

export function commitTextUpdate(textInstacne: TextInstacne, content: string) {
	textInstacne.textContent = content;
}

export function removeChild(
	child: Instance | TextInstacne,
	container: Container
) {
	container.removeChild(child);
}

export function insertChildToContainer(
	child: Instance | TextInstacne,
	container: Container,
	before: Instance
) {
	container.insertBefore(child, before);
}
