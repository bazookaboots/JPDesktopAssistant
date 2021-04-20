const { ipcRenderer } = require('electron')
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

<div id="btn-account">Account</div>
<div id="btn-settings">Settings</div>
<div id="btn-contacts">Contacts</div>
<div style="margin-top:auto;padding-bottom:16px;">
    <button id="btn-logout" class="formBtn red" style="margin-top:auto;"> Logout </button>
</div>

<script>

</script>
`

class LoggedInMenu extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        console.log('connected')
        this._shadowRoot = this.attachShadow({ mode: 'open' });

        var template = document.createElement('template');
        template.innerHTML = component;
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this._shadowRoot.getElementById("btn-logout").addEventListener('click',()=>{
            ipcRenderer.send('logout-user')
        })

        this._shadowRoot.getElementById('btn-account').addEventListener('click',()=>{
            ipcRenderer.send('open-account-page')
        })

        this._shadowRoot.getElementById('btn-contacts').addEventListener('click',()=>{
            ipcRenderer.send('open-contacts-page')
        })

        this._shadowRoot.getElementById('btn-settings').addEventListener('click',()=>{
            ipcRenderer.send('open-settings-page')
        })

    }
}

customElements.define('menu-logged-in', LoggedInMenu)
module.exports = { LoggedInMenu }