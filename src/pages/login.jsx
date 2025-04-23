import { useState, useEffect } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Recupera o e-mail do localStorage se existir
  useEffect(() => {
    const emailSalvo = localStorage.getItem("emailUsuario");
    if (emailSalvo) {
      setEmail(emailSalvo); // Preenche o campo de e-mail com o valor armazenado
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          senha: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login bem-sucedido", data);

        // Salvando token, apelido e e-mail no localStorage
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("nomeUsuario", data.apelido); // Usar apelido no lugar do nome
        localStorage.setItem("emailUsuario", email); // Salva o e-mail no localStorage

        // Redireciona para a tela principal
        window.location.href = "/telaprincipal";
      } else {
        setError(data.message || "Erro no login");
      }
    } catch (err) {
      console.error("Erro de conexão com o servidor:", err);
      setError("Erro de conexão com o servidor");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-container">
      {/* Card 1: Boas-vindas e logo */}
      <div className="card-1">
        <h2 className="text-2xl font-bold mb-4">Bem-vindo</h2>
        <div className="logo-container">
          <img src="/img/logo.png" alt="Logo Marca" className="logo-img" />
        </div>
      </div>

      {/* Card 2: Formulário de Login */}
      <div className="card-2">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          />

          {error && (
            <p className="text-red-500 text-center">{error}</p>
          )}

          <button
            type="submit"
            className="button-login w-full"
            disabled={isLoading}
          >
            {isLoading ? "Carregando..." : "Entrar"}
          </button>
        </form>

        <div className="text-center mt-4">
          <p>Não tem conta?</p>
          <a href="/cadastro" className="text-cadastro">
            Cadastre-se
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
