import { useState } from "react";

const Cadastro = () => {
  const [formData, setFormData] = useState({
    nome: "",
    idade: "",
    pais: "",
    estadoCivil: "",
    apelido: "",
    email: "",
    senha: "",
  });

  const [cadastroSucesso, setCadastroSucesso] = useState(false); // estado para mensagem

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Cadastro realizado com sucesso:", data);
        setCadastroSucesso(true); // ativa a mensagem

        // Salva o nome e apelido no localStorage
        localStorage.setItem("nomeUsuario", formData.nome);
        localStorage.setItem("apelidoUsuario", formData.apelido);

        setFormData({
          nome: "",
          idade: "",
          pais: "",
          estadoCivil: "",
          apelido: "",
          email: "",
          senha: "",
        }); // limpa o formulário
      } else {
        console.error("Erro ao cadastrar:", data.message);
        setCadastroSucesso(false);
      }
    } catch (err) {
      console.error("Erro ao conectar com o servidor:", err);
      setCadastroSucesso(false);
    }
  };

  return (
    <div className="card-cadastro flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <img src="/img/logo.png" alt="Logo Marca" className="logo-img mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-center mb-4">Criar Conta</h2>

        {cadastroSucesso && (
          <div className="text-center text-green-600 font-semibold text-lg mb-4">
            Cadastro realizado com sucesso!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Nome</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className="input-custom w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Idade</label>
            <input
              type="number"
              name="idade"
              value={formData.idade}
              onChange={handleChange}
              className="input-custom w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">País</label>
            <input
              type="text"
              name="pais"
              value={formData.pais}
              onChange={handleChange}
              className="input-custom w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Estado Civil</label>
            <select
              name="estadoCivil"
              value={formData.estadoCivil}
              onChange={handleChange}
              className="input-civil w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            >
              <option value="">Selecione</option>
              <option value="solteiro">Solteiro(a)</option>
              <option value="casado">Casado(a)</option>
              <option value="divorciado">Divorciado(a)</option>
              <option value="viuvo">Viúvo(a)</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Apelido</label>
            <input
              type="text"
              name="apelido"
              value={formData.apelido}
              onChange={handleChange}
              className="input-custom w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">E-mail</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-custom w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Senha</label>
            <input
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              className="input-custom w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <button
            type="submit"
            className="botao-cadastro w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Cadastrar
          </button>
        </form>

        <p className="text-center mt-4">
          Já tem uma conta?{" "}
          <a href="/login" className="link-log text-purple-600 font-bold">
            Faça login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Cadastro;
