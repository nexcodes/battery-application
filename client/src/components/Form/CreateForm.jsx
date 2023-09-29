import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Loading from "../misc/Loading";

const CreateForm = ({ variant }) => {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_SERVER_URL}/api/brand`).then((res) => {
      setBrands(res.data);
    });
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleOnSubmit = (data) => {
    // variant === "Brand" || variant === "Battery"

    setIsLoading(true);

    try {
      if (variant === "Brand") {
        axios.post(`${import.meta.env.VITE_SERVER_URL}/api/brand`, {
          name: data.add_brand,
        });

        reset({
          add_brand: "",
        });
      }

      if (variant === "Battery") {
        const { brand, model, risk, reference, capacity } = data;

        axios.post(`${import.meta.env.VITE_SERVER_URL}/api/battery`, {
          brand,
          model,
          risk,
          reference,
          capacity,
        });

        reset({
          brand: "",
          model: "",
          risk: "",
          reference: "",
          capacity: "",
        });
      }
    } catch (error) {
      console.log(error, "CREATE_FORM");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      {variant === "Brand" ? (
        <>
          <div className="mb-2">
            <label
              htmlFor="add_brand"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Registrar Marca
            </label>
            <input
              {...register("add_brand", { required: true })}
              type="text"
              id="add_brand"
              className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
        </>
      ) : (
        <>
          <div className="mb-2">
            <label
              htmlFor="brand"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              MARCA
            </label>
            <select
              {...register("brand", { required: true })}
              id="brand"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option hidden>Elige una marca</option>
              {brands.map((brand) => (
                <option key={brand._id} value={brand.name}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label
              htmlFor="model"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              MODELO
            </label>
            <input
              {...register("model", { required: true })}
              type="text"
              id="model"
              className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="risk"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              RIESGO
            </label>
            <select
              {...register("risk", { required: true })}
              id="risk"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option hidden>Elige un nivel</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="mb-2">
            <label
              htmlFor="references"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              REFERENCIA
            </label>
            <input
              {...register("reference", { required: true })}
              type="text"
              id="references"
              className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="capacity"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              CAPACIDAD
            </label>
            <input
              {...register("capacity", { required: true })}
              type="text"
              id="capacity"
              className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          {/* <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <input
                id="checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 border border-gray-300 rounded bg-white focus:ring-3 focus:ring-blue-300 "
              />
            </div>
            <label
              htmlFor="checkbox"
              className="ml-2 text-sm font-medium text-gray-900"
            >
              Something here
            </label>
          </div> */}
        </>
      )}
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        {isLoading ? <Loading /> : variant === "Brand" ? "Registrar Marca" : "Registrar Batería"}
      </button>
    </form>
  );
};

export default CreateForm;
