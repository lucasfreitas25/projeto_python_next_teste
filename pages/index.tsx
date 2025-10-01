import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login/login_page"); // redireciona sem voltar no histórico
  }, [router]);

  return null; // ou um spinner de carregamento
}