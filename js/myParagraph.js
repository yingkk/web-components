(function () {
  const template = document.createElement('template');
  template.innerHTML = `
   <style>
     p {
       color: #fff;
       background-color: #000;
       padding: 5px;
     }
       
    <p><slot name="my-text"></slot></p>
  `

  class MyParagraph extends HTMLElement {
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ mode: 'closed' });
      this._shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }
})()
