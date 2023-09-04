const elementInDOM = (id: string) => document.getElementById(id);

export const elementReady = <T extends HTMLElement>(
    id: string,
    elementType: { new (): T }
) => {
    const element = elementInDOM(id);
    if (element && element instanceof elementType) {
        return element;
    } else {
        throw new Error(`Element with id ${id} not found in DOM`);
    }
};

export const removeElement = (element: Element, child: Element) => {
    element?.removeChild(child);
};
