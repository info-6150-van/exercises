class ProductCard extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    shadow.innerHTML = `
      <style>
        .card {
          border: 1px solid #ccc;
          padding: 12px;
          width: 240px;
          font-family: sans-serif;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }

        .image {
          width: 100%;
          height: 150px;
          overflow: hidden;
          border-radius: 6px;
          background: #eee;
        }

        /* ⭐关键：裁剪 slot 里的图片 */
        ::slotted(img) {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        h3 {
          margin: 10px 0 4px;
          font-size: 18px;
        }

        .price {
          color: #555;
          margin-bottom: 8px;
        }

        button {
          margin-top: 8px;
          padding: 6px 12px;
          border: 1px solid #ccc;
          background: #f3f3f3;
          cursor: pointer;
          border-radius: 4px;
        }

        button:hover {
          background: #e5e5e5;
        }
      </style>

      <div class="card">
        <div class="image">
          <slot name="image"></slot>
        </div>

        <h3 id="name"></h3>
        <div class="price" id="price"></div>

        <slot name="desc"></slot>

        <button id="buy">Buy</button>
      </div>
    `;
  }

  connectedCallback() {
    const name = this.getAttribute("name");
    const price = this.getAttribute("price");

    this.shadowRoot.getElementById("name").textContent = name;
    this.shadowRoot.getElementById("price").textContent = "$" + price;

    this.shadowRoot.getElementById("buy").addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("purchase", {
          detail: { name, price },
          bubbles: true,
          composed: true
        })
      );
    });
  }
}

customElements.define("product-card", ProductCard);
