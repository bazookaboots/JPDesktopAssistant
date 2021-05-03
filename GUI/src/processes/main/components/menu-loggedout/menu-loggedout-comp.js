const { ipcRenderer } = require("electron");

const component = `
<style> @import "../../global-styles.css"</style>
<style> @import "./components/menu-loggedout/menu-loggedout-comp.css"</style>

<div id="btn-login" class="menuItem"><p>Log In</p></div>
<div id="btn-settings" class="menuItem"><p> Settings</p></div>
<div class="menuItemBtn">
    <button id="btn-create-account" class="formBtn"><p>Create Account</p> </button>
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
            pageContainer.classList.remove("hidden")
        })

        this._shadowRoot.getElementById('btn-login').addEventListener('click',()=>{
            var loginPage = document.createElement('page-login')
            var pageContainer = document.getElementById('page-container')
            killChildren(pageContainer)
            pageContainer.appendChild(loginPage)
            pageContainer.classList.remove("hidden")
        })

        this._shadowRoot.getElementById('btn-settings').addEventListener('click',()=>{
            ipcRenderer.send('open-settings-page')
        })
    }
}

customElements.define('menu-logged-out', LoggedOutMenu)
module.exports = { LoggedOutMenu: LoggedOutMenu }