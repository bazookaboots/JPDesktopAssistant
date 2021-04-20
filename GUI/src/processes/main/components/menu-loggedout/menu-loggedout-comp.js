const component = `
<style>

</style>

<div id="btn-login">Log In</div>
<div id="btn-settings"> Settings</div>
<div style="margin-top:auto;padding-bottom:16px;">
    <button id="btn-create-account" class="formBtn"> Create Account </button>
</div>

<script>

</script>
`

class LoggedOutMenu extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        console.log('connected')
        this._shadowRoot = this.attachShadow({ mode: 'open' });

        var template = document.createElement('template');
        template.innerHTML = component;
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this._shadowRoot.getElementById('btn-create-account').addEventListener('click',()=>{
            var registerPage = document.createElement('page-register')
            var pageContainer = document.getElementById('page-container')
            pageContainer.appendChild(registerPage)
            pageContainer.style.display = "block"
        })
        this._shadowRoot.getElementById('btn-login').addEventListener('click',()=>{
            var loginPage = document.createElement('page-login')
            var pageContainer = document.getElementById('page-container')
            pageContainer.appendChild(loginPage)
            pageContainer.style.display = "block"
        })
    }
}

customElements.define('menu-logged-out', LoggedOutMenu)
module.exports = { LoggedOutMenu: LoggedOutMenu }