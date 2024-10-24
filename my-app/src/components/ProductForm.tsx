// components/ProductForm.js
export default function ProductForm() {
    return (
      <form>
        <label>
          Tên sản phẩm:
          <input type="text" name="productName" />
        </label>
        <button type="submit">Thêm sản phẩm</button>
      </form>
    );
  }
  