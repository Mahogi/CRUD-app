import ApiService from './api-service.js';
import HeaderComponent from './components/concrete/header-component.js';
import CandyTableComponent from "./components/concrete/candy-table-component.js";
import ContainerComponent from "./components/wrappers/container-component.js";
import AddCandyFormComponent from "./components/concrete/addCandy-form-component.js";

const rootHtmlElement = document.querySelector('#root');
if (rootHtmlElement === null) throw new Error('Error: #root element  was not found in HTML file.');

let candyTableComponent;
let addCandyFormComponent;

const onDeleteCandy = async ({ id, title }) => {
    try {
        await ApiService.deleteCandy({ id, title });
    } catch (error) {
        alert(error);
    } finally {
        const candyStore = await ApiService.getCandyStore();
        candyTableComponent.renderCandyStore(candyStore);
    }
}

const onCreateCandy = async ({ title, price }) => {
    try {
        await ApiService.createCandy({ title, price });
    } catch (error) {
        alert(error);
    } finally {
        const candyStore = await ApiService.getCandyStore();
        candyTableComponent.renderCandyStore(candyStore);
    }
}

ApiService.getCandyStore().then( (candyStore) => {
    candyTableComponent = new CandyTableComponent( {candyStore, onDeleteCandy});
    const headerComponent = new HeaderComponent({
        text: 'Candy Store',
        className: 'text-center my-4 fw-normal',
    });
    addCandyFormComponent = new AddCandyFormComponent( {onSubmit: onCreateCandy})

    const container = new ContainerComponent({
        children: [
            headerComponent.htmlElement,
            addCandyFormComponent.htmlElement,
            candyTableComponent.htmlElement,
        ],
    });

    rootHtmlElement.append(
        container.htmlElement,
    );
})