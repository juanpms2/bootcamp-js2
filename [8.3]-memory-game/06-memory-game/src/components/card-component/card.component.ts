interface Props {
	imageUrl: string;
	index: number;
}

export const CardComponent = (props: Props): HTMLDivElement => {
	const { imageUrl, index } = props;
	const id = `card-${index}`;

	const flipContainer: HTMLDivElement = document.createElement("div");
	flipContainer.setAttribute("class", "flip-container");
	flipContainer.setAttribute("id", id);
	flipContainer.setAttribute("data-index-array", index.toString());

	const flipper: HTMLDivElement = document.createElement("div");
	flipper.setAttribute("class", "flipper");
	flipContainer.appendChild(flipper);

	const front: HTMLDivElement = document.createElement("div");
	front.setAttribute("class", "front");
	flipper.appendChild(front);

	const back: HTMLDivElement = document.createElement("div");
	back.setAttribute("class", "back");
	flipper.appendChild(back);

	const backImage: HTMLImageElement = document.createElement("img");
	backImage.setAttribute("src", imageUrl);
	backImage.setAttribute("data-index-img", index.toString());
	back.appendChild(backImage);

	return flipContainer;
};
