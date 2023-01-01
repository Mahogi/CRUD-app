class AddCandyFormComponent {
    htmlElement;

    constructor({ onSubmit }) {
        this.htmlElement = document.createElement('form');
        this.htmlElement.className = 'addCandy-form shadow p-4'
        this.htmlElement.innerHTML = `
    <h2 class="h3 text-center mb-4 fw-normal">Add New Candy</h2>
    <div class="mb-3">
      <label for="candy-title" class="form-label">Title</label>
      <input type="text" class="form-control" id="candy-title" name="title">
    </div>
    <div class="mb-3">
      <label class="form-label" for="candy-price">Price</label>
      <input type="number" placeholder="0.00" step="0.01" class="form-control" id="candy-price" name="price">
    </div>
    <button type="submit" class="btn btn-primary w-100">Add to Shop</button>`;

        this.htmlElement.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = new FormData(event.target);
            const title = formData.get('title');
            const price = Number(formData.get('price')) ;

            if (isNaN(price)) {
                //Should technically never happen but hey
                alert("Price entered is not a number");
            } else {
                onSubmit({ title, price });
                event.target.reset();
            }
        });
    }
}

export default AddCandyFormComponent;