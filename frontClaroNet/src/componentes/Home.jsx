import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const Tabela = ({ dados }) => {
  console.log(888, dados);
  const [filtro, setFiltro] = useState("");
  const filtrarDados = (id) => {
    return id?.toLowerCase().includes(filtro.toLowerCase());
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Tabela de Dados</h1>
          <input
            type="text"
            placeholder="Filtrar por ID"
            className="p-2 border border-gray-400 rounded-lg"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        </div>
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-200 text-gray-800 font-bold uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Cliente</th>
              <th className="py-3 px-6 text-left">Nome</th>
              <th className="py-3 px-6 text-left">Endereço</th>
              <th className="py-3 px-6 text-left">Telefone</th>
              <th className="py-3 px-6 text-left">Produto</th>
              <th className="py-3 px-6 text-left">Valor</th>
            </tr>
          </thead>
          <tbody>
            {dados.data &&
              dados.data
                .filter((dado) => filtrarDados(dado.id))
                .map((dado) => (
                  <tr key={dado.id} className="border-b border-gray-400">
                    <td className="py-3 px-6 text-left">{dado.id}</td>
                    <td className="py-3 px-6 text-left">{dado.num.cliente}</td>
                    <td className="py-3 px-6 text-left">{dado.nome}</td>
                    <td className="py-3 px-6 text-left">{dado.endereço}</td>
                    <td className="py-3 px-6 text-left">{dado.telefone}</td>
                    <td className="py-3 px-6 text-left">{dado.produto}</td>
                    <td className="py-3 px-6 text-left">{dado.valor}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

function App() {
  const [file, setFile] = useState(null);
  const [dados, setData] = useState([]);

  useEffect(() => {
    initialData();
  }, [dados]);

  const initialData = async () => {
    let response = await axios.get("http://localhost:3000/convert");
    setData(response);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const fetchData = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("csv", file);
    await axios.post("http://localhost:3000/convert", formData);

    initialData();
  };

  console.log(dados);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Converter CSV para JSON</h1>
      <form onSubmit={fetchData}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Selecione o arquivo CSV:
          </label>
          <input
            type="file"
            name="csv"
            onChange={handleFileChange}
            className="border rounded px-4 py-2 w-full"
          />
        </div>
        <button
          type="submit"
          onClick={() => fetchData}
          disabled={!file}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Converter
        </button>
      </form>
      <div>
        <Tabela dados={dados} />
      </div>
    </div>
  );
}

export default App;
