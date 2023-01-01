class CandyTableComponent {
    htmlElement;
    tbodyHtmlElement;

    onDeleteCandy;

    constructor({ candyStore, onDeleteCandy }) {
        this.htmlElement = document.createElement('table');
        this.htmlElement.className = 'table table-striped shadow';
        this.htmlElement.innerHTML = `
    <thead class="bg-dark text-white">
      <tr>
        <th>Id</th>
        <th>Title</th>
        <th>Price</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody></tbody>`;
        this.onDeleteCandy = onDeleteCandy;
        this.tbodyHtmlElement = this.htmlElement.querySelector('tbody');
        this.renderCandyStore(candyStore);
    }

    createRowHtmlElement = ({ id, title, price }) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
      <td>${id}</td>
      <td>${title}</td>
      <td>${price.toFixed(2)}</td>
      <td class="d-flex justify-content-end">
        <button class="btn btn-danger btn-sm">✕</button>
      </td>`;

        const delButton = tr.querySelector('.btn-danger');
        delButton.addEventListener('click', () => this.onDeleteCandy({ id, title }));

        return tr;
    }

    renderCandyStore = (candyStore) => {
        this.tbodyHtmlElement.innerHTML = null;
        const rowsHtmlElements = candyStore.map(this.createRowHtmlElement);
        this.tbodyHtmlElement.append(...rowsHtmlElements);
    }
}

export default CandyTableComponent;