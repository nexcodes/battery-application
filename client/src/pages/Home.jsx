import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import clsx from "clsx";

const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/api/battery`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isLoading]);

  const DeleteBattery = (id) => {
    setIsLoading(true);

    try {
      axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/battery`, {
        id,
      });
      window.location.reload();
    } catch (error) {
      console.error(error, "PAGE_HOME");
    } finally {
      setIsLoading(false);
    }
  };

  if (data.length === 0)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h3 className="text-4xl font-bold text-gray-500">
            Sin Registro de Baterías
          </h3>
          <p className="text-md font-light text-gray-400 ">
            Intenta Crear una Batería
          </p>
        </div>
      </div>
    );

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              MARCA
            </th>
            <th scope="col" className="px-6 py-3">
              MODELO
            </th>
            <th scope="col" className="px-6 py-3">
              RIESGO
            </th>
            <th scope="col" className="px-6 py-3">
              REFERENCIA
            </th>
            <th scope="col" className="px-6 py-3">
              CAPACIDAD
            </th>
            <th scope="col" className="px-6 py-3">
              ELIMINAR
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => {
            const { _id, brand, model, risk, reference, capacity } = item;

            return (
              <>
                <tr
                  key={_id}
                  className={clsx(
                    `border-b`,
                    i % 2 === 0 ? `bg-white` : `bg-gray-50`
                  )}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {brand}
                  </th>
                  <td className="px-6 py-4">{model}</td>
                  <td className="px-6 py-4">{risk}</td>
                  <td className="px-6 py-4">{reference}</td>
                  <td className="px-6 py-4">{capacity}</td>
                  <td
                    className="px-6 py-4 cursor-pointer"
                    onClick={() => DeleteBattery(_id)}
                  >
                    <MdDelete
                      size={24}
                      className="hover:text-sky-600 text-gray-900"
                    />
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
