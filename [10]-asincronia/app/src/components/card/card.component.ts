// interface Props {
//     name: string;
//     speciality: string;
//     skills: string[];
//     imageUrl: string;
// }

export const CardComponent = () => {
    // const {name, speciality, skills, imageUrl} = props;
    const card: HTMLDivElement = document.createElement("div");
    card.setAttribute("class", "card");
    card.innerHTML = "Hello World";

    return card;
};
