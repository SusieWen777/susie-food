import "./List.scss";
import axiosInstance, { baseURL } from "../../utils/axiosInstance.js";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IoTrashOutline } from "react-icons/io5";

function List() {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axiosInstance.get("/api/food/list");
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axiosInstance.post("api/food/remove", {
        id: foodId,
      });
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
      await fetchList();
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item) => (
          <div key={item._id} className="list-table-format">
            <img
              src={`${baseURL}/api/food/image/${item.image}`}
              alt={item.name}
            />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.price}</p>
            <IoTrashOutline
              className="delete-icon"
              onClick={() => removeFood(item._id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;
