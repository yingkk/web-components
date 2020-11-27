(function () {
  const template = document.createElement('template');
  template.innerHTML = `
    <style>
      .container {
        padding: 8px;
      }
   
      button {
        display: block;
        overflow: hidden;
        position: relative;
        padding: 0 16px;
        font-size: 16px;
        font-weight: bold;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
        outline: none;
   
        width: 100px;
        height: 40px;
   
        box-sizing: border-box;
        border: 1px solid #a1a1a1;
        background: #fff;
        box-shadow: 0 2px 4px 0 rgba(0,0,0, 0.05), 0 2px 8px 0 rgba(161,161,161, 0.4);
        color: #363636;
        cursor: pointer;
      }
    </style>
   
    <div class="container">
      <button></button>
    </div>
  `;

  class Button extends HTMLElement {
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ mode: 'open' });
      this._shadowRoot.appendChild(template.content.cloneNode(true));
      this.$button = this._shadowRoot.querySelector('button');
      // this.$button.addEventListener('click', () => {
      //  alert('🐸 孤寡孤寡。。')
      // })

      this.$button.addEventListener('click', () => {
        this.dispatchEvent(
          new CustomEvent('onClick', { detail: 'Hello from within the Custom Element' })
        )
      })
    }

    get label() {
      return this.getAttribute('label');
    }

    set label(value) {
      this.setAttribute('label', value);
    }

    static get observedAttributes() {
      return ['label'];
    }

    //生命周期：当自定义元素第一次被连接到文档DOM时被调用  
    connectedCallback() {
      if(this.hasAttribute('bg-color')){
        this.$button.style.backgroundColor = 'red';
      }
    }

    //生命周期： 当自定义元素的一个属性被增加、移除或更改时被调用
    attributeChangedCallback(name, oldVal, newVal) {
      this.render();
    }

    //生命周期：当自定义元素与文档DOM断开连接时被调用
    // disconnectedCallback() {
    // }

    //生命周期：当自定义元素被移动到新文档时被调用
    // adoptedCallback() {
    // }


    render() {
      this.$button.innerHTML = this.label; //this指的自定义元素实例my-button，即(类 Button)。this.label => [类.属性名]
    }
  }
  window.customElements.define('my-button', Button);

  /**
   * tip: 执行过程
   *      1. 方法observedAttributes监听label属性；
   *      2. Button的构造方法;
   *      3. 方法attributeChangedCallback监听标签属性更改；
   *      4. render()
   *      5. get label() 
   * */

})()

