const { ipcRenderer } = require('electron')
const component = `
<style>

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

    }
}

customElements.define('menu-logged-in', LoggedInMenu)
module.exports = { LoggedInMenu }