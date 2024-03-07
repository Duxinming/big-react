import { Action } from 'shared/ReactTypes';

export interface Update<State> {
	action: Action<State>;
}

export interface UpdateQueue<State> {
	shared: {
		pending: Update<State> | null;
	};
}

// 实例化update
export const createUpdate = <State>(action: Action<State>) => {
	return { action };
};

// 实例化updateQueue
export const createUpdateQueue = <State>() => {
	return {
		shared: {
			pending: null // 指向Update
		}
	} as UpdateQueue<State>;
};

// 在UpdateQueue插入Update
export const enqueueUpdate = <State>(
	updateQueue: UpdateQueue<State>,
	update: Update<State>
) => {
	updateQueue.shared.pending = update;
};

// 消费Update
export const processUpdateQueue = <State>(
	baseState: State,
	pendingUpdate: Update<State> | null
): { memoizedState: State } => {
	const result: ReturnType<typeof processUpdateQueue<State>> = {
		memoizedState: baseState
	};

	if (pendingUpdate !== null) {
		const action = pendingUpdate.action;
		if (action instanceof Function) {
			// baseState 1 update (x)=> 2x => memoizedState 2
			result.memoizedState = action(baseState);
		} else {
			// baseState 1 update 2 => memoizedState 2
			result.memoizedState = action;
		}
	}

	return result;
};
