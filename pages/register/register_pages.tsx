import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, full_name: fullName }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Erro ao registrar usuário");
        return;
      }

      alert("Usuário registrado com sucesso: " + data.email);
      router.push("/login/login_page"); // volta para login após registro
    } catch (err) {
      console.error(err);
      setError("Erro ao conectar com a API");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#1f1f4d]">
      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-4 p-6 bg-gray-800 rounded-xl shadow-lg w-96"
      >
        <h1 className="text-3xl font-bold text-center text-white mb-4">Registrar</h1>
        {error && <p className="text-red-400 text-center">{error}</p>}

        <input
          type="text"
          placeholder="Nome completo"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
        />

        <button
          type="submit"
          className="p-3 bg-fuchsia-950 rounded-lg text-white font-semibold hover:bg-fuchsia-500 hover:shadow-md transition"
        >
          Registrar
        </button>

        {/* Link para voltar ao login */}
        <p className="text-center mt-4 text-gray-300">
          Já tem uma conta?{" "}
          <Link
            href="/login/login_page"
            className="text-fuchsia-300 font-bold hover:underline"
          >
            Voltar ao login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
