export type Container = Element;
export type Instance = Element;

// export const createInstance = (type: string, props: any): Instance => {
export const createInstance = (type: string): Instance => {
	// TODO 处理props
	const element = document.createElement(type);
	return element;
};

export const appendInitialChild = (parent: Instance, children: Instance) => {
	parent.appendChild(children);
};

export const createTextInstance = (content: string) => {
	return document.createTextNode(content);
};

export const appendChildToContainer = appendInitialChild;
