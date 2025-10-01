import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-700 text-white w-full py-2 shadow-md">
      <ul className="flex justify-center gap-6">
        <li>
          <Link href="/" className="hover:text-fuchsia-300 transition">
            Home
          </Link>
        </li>
        <li>
          <Link href="/dashboard/dashboard_page" className="hover:text-fuchsia-300 transition">
            Clientes
          </Link>
        </li>
        <li>
          <Link href="/profile" className="hover:text-fuchsia-300 transition">
            Ativos financeiros
          </Link>
        </li>
        <li>
          <Link href="/profile" className="hover:text-fuchsia-300 transition">
            Movimentações
          </Link>
        </li>
        <li>
          <Link href="/settings" className="hover:text-fuchsia-300 transition">
            Exportar
          </Link>
        </li>
      </ul>
    </nav>
  );
}
