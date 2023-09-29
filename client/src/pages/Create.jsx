import React, { useEffect, useState } from "react";
import CreateForm from "../components/Form/CreateForm";
import { MdDelete } from "react-icons/md";
import axios from "axios";
const Create = () => {
  const [variant, setVariant] = useState("Battery"); // can be Battery or Brand
  const [brand, setBrand] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_SERVER_URL}/api/brand`).then((res) => {
      setBrand(res.data);
    });
  });

  const DeleteBrand = (id) => {
    axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/brand` , {
      id
    })
  }

  return (
    <>
      <div className="bg-white p-4">
        <div className="bg-gray-white shadow shadow-gray-300 rounded p-4">
          <div className="flex justify-between items-center pb-4">
            <h3 className="text-sm font-medium text-gray-900">Registro</h3>
            <span
              className="block text-sm font-medium text-gray-900 hover:text-sky-600 transition cursor-pointer"
              onClick={() =>
                setVariant((prev) => (prev === "Brand" ? "Battery" : "Brand"))
              }
            >
              Add {variant === "Brand" ? "Battery" : "Brand"}
            </span>
          </div>
          <div className="bg-gray-white shadow shadow-gray-300 rounded p-4">
            <CreateForm variant={variant} />
          </div>
          <div className="space-y-3 my-2">
            {variant === "Brand" &&
              brand.map((item) => {
                return (
                  <div key={item._id} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                    <div>
                      <span className="text-md font-medium text-gray-900">{item.name}</span>
                    </div>
                    <div onClick={()=> DeleteBrand(item._id)}>
                      <MdDelete size={24} className="text-gray-900 hover:text-sky-600 cursor-pointer" />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;
