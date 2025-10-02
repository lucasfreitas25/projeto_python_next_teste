import { useState, useEffect } from "react";
import Link from "next/link";

interface Cliente {
  id: number;
  nome: string;
  email: string;
  status: string;
}

function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [active, setActive] = useState("Clientes");

  const pageSize = 5;
  
  const menuItems = [
    { name: "Dashboard", path: "/dashboard/dashboard_page" },
    { name: "Clientes", path: "/dashboard/clientes_page" },
    { name: "Ativos financeiros", path: "/dashboard/ativos_page" },
    { name: "Movimentações", path: "/dashboard/movimentacoes_page" },
    { name: "Exportação", path: "/dashboard/exportacao_page" },
  ];

  const fetchClientes = () => {
    let allClientes: Cliente[] = [
      { id: 1, nome: "Lucas Freitas", email: "lucas@email.com", status: "ativo" },
      { id: 2, nome: "Maria Silva", email: "maria@email.com", status: "inativo" },
      { id: 3, nome: "João Pedro", email: "joao@email.com", status: "ativo" },
      { id: 4, nome: "Ana Paula", email: "ana@email.com", status: "ativo" },
      { id: 5, nome: "Carlos", email: "carlos@email.com", status: "inativo" },
      { id: 6, nome: "Renata", email: "renata@email.com", status: "ativo" },
      { id: 7, nome: "Fernando", email: "fer@email.com", status: "ativo" },
    ];

    if (search) {
      allClientes = allClientes.filter(
        (c) =>
          c.nome.toLowerCase().includes(search.toLowerCase()) ||
          c.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter) {
      allClientes = allClientes.filter((c) => c.status === statusFilter);
    }

    const start = (page - 1) * pageSize;
    const pagedClientes = allClientes.slice(start, start + pageSize);
    setClientes(pagedClientes);
    setTotalPages(Math.ceil(allClientes.length / pageSize));
  };

  useEffect(() => {
    fetchClientes();
  }, [search, statusFilter, page]);

  return (
    <div className="flex h-screen bg-[#070720]">
      {/* NAVBAR */}
      <aside className="w-64 bg-[#1f1f4d] text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-gray-700">
          BetterEdge
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`block p-2 rounded hover:bg-gray-700 transition ${
                active === item.name ? "bg-gray-700" : ""
              }`}
              onClick={() => setActive(item.name)}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="w-full bg-[#1f1f4d] p-6 text-white text-2xl font-bold flex items-center">
          Clientes
        </header>

        {/* Conteúdo abaixo do header */}
        <main className="flex-1 bg-[#070720] p-6 text-amber-50 overflow-y-auto">
          {/* Filtros */}
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="Buscar por nome ou email"
              className="px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 flex-1"
              value={search}
              onChange={(e) => { setPage(1); setSearch(e.target.value); }}
            />
            <select
              className="px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              value={statusFilter}
              onChange={(e) => { setPage(1); setStatusFilter(e.target.value); }}
            >
              <option value="">Todos</option>
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
            </select>
          </div>

          {/* Tabela de clientes */}
          <table className="min-w-full bg-gray-900 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-800 text-left">
                <th className="px-4 py-2">Nome</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr key={cliente.id} className="border-b border-gray-700">
                  <td className="px-4 py-2">{cliente.nome}</td>
                  <td className="px-4 py-2">{cliente.email}</td>
                  <td className="px-4 py-2 capitalize">{cliente.status}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button className="px-2 py-1 bg-fuchsia-600 hover:bg-fuchsia-500 rounded">Editar</button>
                    <button className="px-2 py-1 bg-red-600 hover:bg-red-500 rounded">Deletar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Paginação */}
          <div className="flex justify-center gap-2 mt-4">
            <button
              disabled={page === 1}
              className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
              onClick={() => setPage((p) => p - 1)}
            >
              Anterior
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`px-3 py-1 rounded ${page === i + 1 ? "bg-fuchsia-600" : "bg-gray-700"}`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={page === totalPages}
              className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
              onClick={() => setPage((p) => p + 1)}
            >
              Próximo
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ClientesPage;
