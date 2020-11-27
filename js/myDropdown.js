(function () {
  const template = document.createElement('template');
  template.innerHTML = `
  <style>
    :host {
      font-family: sans-serif;
    }
 
    .dropdown {
      padding: 3px 8px 8px;
    }

    .dropdown.open .dropdown-list {
      display: flex;
      flex-direction: column;
    }
 
    .label {
      display: block;
      margin-bottom: 5px;
      color: #000000;
      font-size: 16px;
      font-weight: normal;
      line-height: 16px;
    }
 
    .dropdown-list-container {
      position: relative;
    }
 
    .dropdown-list {
      position: absolute;
      width: 200px;
      display: none;
      max-height: 192px;
      overflow-y: auto;
      margin: 4px 0 0;
      padding: 0;
      background-color: #ffffff;
      border: 1px solid #a1a1a1;
      box-shadow: 0 2px 4px 0 rgba(0,0,0, 0.05), 0 2px 8px 0 rgba(161,161,161, 0.4);
      list-style: none;
    }
 
    .dropdown-list li {
      display: flex;
      align-items: center;
      margin: 4px 0;
      padding: 0 7px;
      font-size: 16px;
      height: 40px;
      cursor: pointer;
    }

    .dropdown-list li.selected {
      font-weight: 600;
    }
  </style>
 
  <div class="dropdown">
    <span class="label">Label</span>
    <my-button as-atom>Content</my-button>
    <div class="dropdown-list-container">
      <ul class="dropdown-list"></ul>
    </div>
  </div>
  `;


  class Dropdown extends HTMLElement {
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ mode: 'open' });
      this._shadowRoot.appendChild(template.content.cloneNode(true));

      this.open = false;

      this.$label = this._shadowRoot.querySelector('.label');
      this.$button = this._shadowRoot.querySelector('my-button');
      this.$dropdown = this._shadowRoot.querySelector('.dropdown');
      this.$dropdownList = this._shadowRoot.querySelector('.dropdown-list');

      this.$button.addEventListener('onClick', this.toggleOpen.bind(this));
    }
    get label() {
      return this.getAttribute('label');
    }
    set label(val) {
      this.setAttribute('label', val);
    }
    get option() {
      return this.getAttribute('option');
    }
    set option(val) {
      this.setAttribute('option', val);
    }
    get options() {
      return JSON.parse(this.getAttribute('options'));
    }
    set options(val) {
      this.setAttribute('options', JSON.stringify(val));
    }

    static get observedAttributes() {
      return ['label', 'option', 'options'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
      this.render()
    }

    render() {
      this.$label.innerHTML = this.label;

      // this.$button.setAttribute('label', this.option);
      if (this.options) {
        this.$button.setAttribute(
          'label',
          this.options[this.option].label
        );
      }

      this.$dropdownList.innerHTML = '';
      Object.keys(this.options || {}).forEach(key => {
        let option = this.options[key];
        let $option = document.createElement('li');
        $option.innerHTML = option.label;

        if (this.option && this.option === key) {
          $option.classList.add('selected');
        }

        $option.addEventListener('click', () => {
          this.option = key;
          this.toggleOpen();
          this.dispatchEvent(
            new CustomEvent('onChange', { detail: key })
          );
          this.render();
        })

        this.$dropdownList.appendChild($option);
      })
    }

    toggleOpen(event) {
      this.open = !this.open;
      this.open ? this.$dropdown.classList.add('open') : this.$dropdown.classList.remove('open');
    }
  }
  window.customElements.define('my-dropdown', Dropdown);
})()