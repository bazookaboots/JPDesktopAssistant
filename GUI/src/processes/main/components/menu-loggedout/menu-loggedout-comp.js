const { ipcRenderer } = require("electron");

const component = `
<style>
.menu {
    -webkit-app-region: no-drag;
    display: none;
    height: 100%;
    width: 100%;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    overflow-x: hidden;
    transition: 0.5s;
}

.menuContainer {
    display: flex;
    float: left;
    flex-direction: column;
    height: 100%;
    width: 50%;
    justify-content: flex-start;
    background-color: #111;
    flex-grow: 1;
}

.menuItemsContainer {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: flex-start;
    background-color: #111;
    flex-grow: 1;
}

.menuItemsContainer div {
    padding: 6px 16px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
    transition: 0.3s;
}

.menuItemsContainer div:hover {
    color: #f1f1f1;
}

.menuTitle {
    border: 1px solid #111;
    padding: 6px 16px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
    transition: 0.3s;
    background-color: #232325;
}

</style>

<div id="btn-login">Log In</div>
<div id="btn-settings"> Settings</div>
<div style="margin-top:auto;padding-bottom:16px;">
    <button id="btn-create-account" class="formBtn"> Create Account </button>
</div>

<script>

</script>
`

function killChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.lastChild);
    }
}

class LoggedOutMenu extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this._shadowRoot = this.attachShadow({ mode: 'open' });

        var template = document.createElement('template');
        template.innerHTML = component;
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this._shadowRoot.getElementById('btn-create-account').addEventListener('click',()=>{
            var registerPage = document.createElement('page-register')
            var pageContainer = document.getElementById('page-container')
            killChildren(pageContainer)
            pageContainer.appendChild(registerPage)
            pageContainer.style.display = "block"
        })

        this._shadowRoot.getElementById('btn-login').addEventListener('click',()=>{
            var loginPage = document.createElement('page-login')
            var pageContainer = document.getElementById('page-container')
            killChildren(pageContainer)
            pageContainer.appendChild(loginPage)
            pageContainer.style.display = "block"
        })

        this._shadowRoot.getElementById('btn-settings').addEventListener('click',()=>{
            ipcRenderer.send('open-settings-page')
        })
    }
}

customElements.define('menu-logged-out', LoggedOutMenu)
module.exports = { LoggedOutMenu: LoggedOutMenu }