import { Props, Key, Ref, ReactElementType } from 'shared/ReactTypes';
import {
	Fragment,
	FunctionComponent,
	HostComponent,
	WorkTag
} from './workTags';
import { Flags, NoFlags } from './fiberFlags';
import { Container } from 'hostConfig';

export class FiberNode {
	type: any;
	tag: WorkTag;
	pendingProps: Props;
	key: Key;
	stateNode: any;
	ref: Ref;

	return: FiberNode | null;
	sibling: FiberNode | null;
	children: FiberNode | null;
	index: number;

	memoizedProps: Props | null;
	memoizedState: any;
	alternate: FiberNode | null;
	flags: Flags;
	subtreeFlags: Flags;
	updateQueue: unknown;
	deletions: FiberNode[] | null;

	constructor(tag: WorkTag, pendingProps: Props, key: Key) {
		// 实例
		this.tag = tag;
		this.key = key || null;
		// HostComponent <div> div DOM
		this.stateNode = null;
		// FunctionComponent () => {}
		this.type = null;

		// 构成树状结构
		// 表示节点之间的关系
		// 指向父FiberNode
		this.return = null;
		// 指向兄弟FiberNode
		this.sibling = null;
		// 指向子FiberNode
		this.children = null;
		// 针对同级FiberNode 的index
		this.index = 0;

		this.ref = null;

		// 作为工作单元
		// 开始工作时的props
		this.pendingProps = pendingProps;
		// 结束工作时将pendingProps 赋值给 memoizedProps
		this.memoizedProps = null;
		this.memoizedState = null;
		this.updateQueue = null;

		this.alternate = null;
		// 副作用
		this.flags = NoFlags;
		this.subtreeFlags = NoFlags;
		this.deletions = null;
	}
}

export class FiberRootNode {
	container: Container;
	current: FiberNode; // 指向HostRootFiber
	finishedWork: FiberNode | null; //指向更新完成后的HostRootFiber

	constructor(container: Container, hostRootFiber: FiberNode) {
		this.container = container;
		this.current = hostRootFiber;
		hostRootFiber.stateNode = this;
		this.finishedWork = null;
	}
}

export const createWorkInProgress = (
	current: FiberNode,
	pendingProps: Props
): FiberNode => {
	let wip = current.alternate;

	if (wip === null) {
		// mount
		wip = new FiberNode(current.tag, pendingProps, current.key);
		wip.type = current.type;
		wip.stateNode = current.stateNode;

		wip.alternate = current;
		current.alternate = wip;
	} else {
		// update
		wip.pendingProps = pendingProps;
		wip.flags = NoFlags;
		wip.subtreeFlags = NoFlags;
		wip.deletions = null;
	}
	wip.type = current.type;
	wip.updateQueue = current.updateQueue;
	wip.children = current.children;
	wip.memoizedProps = current.memoizedProps;
	wip.memoizedState = current.memoizedState;

	return wip;
};

export function createFiberFromElement(element: ReactElementType) {
	const { type, key, props } = element;
	let fiberTage: WorkTag = FunctionComponent;

	if (typeof type === 'string') {
		// <div/> type: 'div'
		fiberTage = HostComponent;
	} else if (typeof type !== 'function' && __DEV__) {
		console.warn('未定义的type类型', element);
	}

	const fiber = new FiberNode(fiberTage, props, key);
	fiber.type = type;
	return fiber;
}

export function createFiberFromFragment(elements: any[], key: Key) {
	const fiber = new FiberNode(Fragment, elements, key);

	return fiber;
}
