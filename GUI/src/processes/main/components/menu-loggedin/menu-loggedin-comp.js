const { ipcRenderer } = require('electron')

const component = `
<style> @import "../../global-styles.css"</style>
<style> @import "components/menu-loggedin/menu-loggedin-comp.css"</style>

<div id="btn-account" class="menuItem"><p>Account</p></div>
<div id="btn-settings" class="menuItem"><p>Settings</p></div>
<div id="btn-contacts" class="menuItem"><p>Contacts</p></div>
<div class="menuItemBtn">
    <button id="btn-logout" class="formBtn red" style="margin-top:auto;"><p> Logout </p> </button>
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