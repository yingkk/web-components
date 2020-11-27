(function () {
  const template = document.createElement('template');
  /**
   *  CSS伪类
   *  :defined: 匹配任何已定义的元素，包括内置元素和使用CustomElementRegistry.define()定义的自定义元素。
   *  :host: 选择 shadow DOM 的 shadow host ，内容是它内部使用的 CSS（ containing the CSS it is used inside ）。
   *  :host(): 选择 shadow DOM 的 shadow host ，内容是它内部使用的 CSS （这样您可以从 shadow DOM 内部选择自定义元素）— 但只匹配给定方法的选择器的 shadow host 元素。
   *  :host-context(): 选择 shadow DOM 的 shadow host ，内容是它内部使用的 CSS （这样您可以从 shadow DOM 内部选择自定义元素）— 但只匹配给定方法的选择器匹配元素的子 shadow host 元素。
   */
  template.innerHTML =
    `<style>
      :host {
          display: flex;
          align-items: center;
          width: 450px;
          height: 180px;
          background-color: #d4d4d4;
          border: 1px solid #d5d5d5;
          box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
          border-radius: 3px;
          overflow: hidden;
          padding: 10px;
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }
  
        .image {
          flex: 0 0 auto;
          width: 160px;
          height: 160px;
          vertical-align: middle;
          border-radius: 5px;
        }
  
        .container {
          box-sizing: border-box;
          padding: 20px;
          height: 160px;
        }
  
        .container>.name {
          font-size: 20px;
          font-weight: 600;
          line-height: 1;
          margin: 0;
          margin-bottom: 5px;
        }
  
        .container>.email {
          font-size: 12px;
          opacity: 0.75;
          line-height: 1;
          margin: 0;
          margin-bottom: 15px;
        }
  
        .container>.button {
          padding: 10px 25px;
          font-size: 12px;
          border-radius: 5px;
          text-transform: uppercase;
        }
    </style>
    
        <img class="image">
        <div class="container">
          <p class="name"></p>
          <p class="email"></p>
          <button class="button">Share</button>
        </div>
      `;

  class UserCard extends HTMLElement {
    constructor() {
      super();
      //tip: 创建一个shadow root。 mode: 'closed' 拒绝从js外部访问关闭的shadow root节点。 this: 自定义元素实例user-card。
      this._shadowRoot = this.attachShadow({ mode: 'closed' });
      //tip: template节点子元素深度克隆
      let content = template.content.cloneNode(true);
      content.querySelector('.image').setAttribute('src', this.getAttribute('image'));
      content.querySelector('.container>.name').innerText = this.getAttribute('name');
      content.querySelector('.container>.email').innerText = this.getAttribute('email');
      this._shadowRoot.appendChild(content);
    }
  }
  window.customElements.define('user-card', UserCard);

})()
