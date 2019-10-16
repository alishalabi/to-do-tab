// Inspired by Google's Tutorial: https://googlechromelabs.github.io/howto-components/howto-tabs/#demo

(function() {

  // Define codes for keyboard events
  const KEYCODE = {
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    HOME: 36,
    END: 35,
  };

  // Creating template for all how-to instances
  const template = document.createElement('template');
  template.innerHTML = `
    <style>
      :host {
        display: flex;
        flex-wrap: wrap;
      }
      ::slotted(howto-panel) {
        flex-basis: 100%;
      }
    </style>
    <slot name="tab"></slot>
    <slot name="panel"></slot>
  `;

  class HowtoTabs extends HTMLElement {

    contructor() {
      super();
      // Binding event handlers that are not attached to this element (if they need access to `this`)
      this._onSlotChange = this._onSlotChange.bind(this);
      // Attaching to Shadow DOM (modularity)
      this.attachShadow({mode: 'open'});
      // Importing shared template to create slots for tabs and panels
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this._tabSlot = this.shadowRoot.querySelector('slot[name=tab]');
      this._panelSlot = this.shadowRoot.querySelector('slot[name=panel]');

      // Associate children with event listener
      this._tabSlot.addEventListener('slotchange', this._onSlotChange);
      this._panelSlot.addEventListener('slotchange', this._onSlotChange);
    }

    // Setup connected callback
    connectedCallback() {
      this.addEventListener('keydown', this._onKeyDown);
      this.addEventListener('click', this._onClick);

      if (!this.hasAttribute('role'))
        this.setAttribute('role', 'tablist');

      Promise.all([
        customElements.whenDefined('howto-tab'),
        customElements.whenDefined('howto-panel'),
      ])
        .then(_ => this._linkPanels());
    }

    
  }




})();
