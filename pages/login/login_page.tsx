import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);

      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Erro no login");
        return;
      }

      localStorage.setItem("token", data.access_token);
      router.push("/dashboard/dashboard_page");
    } catch (err) {
      console.error(err);
      setError("Erro ao conectar com a API");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#1f1f4d]">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 p-6 bg-gray-800 rounded-xl shadow-lg w-96"
      >
        <h1 className="text-3xl font-bold text-center text-white mb-4">Login</h1>
        {error && <p className="text-red-400 text-center">{error}</p>}

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
          Entrar
        </button>

        {/* Link para registrar */}
        <p className="text-center mt-4 text-gray-300">
          Não tem uma conta?{" "}
          <Link
            href="/register/register_pages"
            className="text-fuchsia-300 font-bold hover:underline"
          >
            Registre-se
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
