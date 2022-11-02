/* eslint-disable indent */
/* eslint-disable import/extensions */
const bodyEl = document.querySelector('body');



const createGrid = (numberOfRows) => {
    let rows = '';
    let dataProp = 1;

    for (let i = 0; i < numberOfRows; i++) {
        let column = '';

        for (let k = 0; k < numberOfRows; k++) {
            column += `<div data-id=${dataProp} column=${k} class="column"></div>`;
            dataProp += 1;
        }

        rows += `<div row=${i} class="row">${column}</div>`;
    }

    return rows;
};

(function setScene() {
    const wrapper = document.createElement('div');
    wrapper.className = 'wrapper';

    const button = document.createElement('button');
    button.innerText = 'Start Game';

    const grid = createGrid(20);
    wrapper.innerHTML = grid;

    bodyEl.appendChild(button);
    bodyEl.appendChild(wrapper);
}());







