export const TooltipComponent = (content: string) => {
	const tooltip: HTMLDivElement = document.createElement("div");
	tooltip.setAttribute("class", "tooltip");
	tooltip.innerHTML = content;

	return tooltip;
};
