interface Props {
	imageUrl: string;
	indexCard: number;
}

export const CardComponent = (props: Props): HTMLDivElement => {
	const { imageUrl, indexCard } = props;
	const id = `card-${indexCard}`;

	const flipContainer: HTMLDivElement = document.createElement("div");
	flipContainer.setAttribute("class", "flip-container");
	flipContainer.setAttribute("id", id);
	flipContainer.setAttribute("data-index-array", indexCard.toString());

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
	backImage.setAttribute("data-index-img", indexCard.toString());
	back.appendChild(backImage);

	return flipContainer;
};
