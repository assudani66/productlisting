import { useState } from "react";
import ProductForm from "../components/admin/AddItemComponent";
import MyGridComponent from "../components/admin/MyGridComponent";

const Admin = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const handleAddItem = (item) => {
    console.log("Adding item:", item);
  };

  return (
    <div>
      <button style={{ color: "white" }} onClick={openForm}>
        Add Item
      </button>
      <ProductForm
        open={isFormOpen}
        onClose={closeForm}
        onAdd={handleAddItem}
      />
      <MyGridComponent />
    </div>
  );
};

export default Admin;
