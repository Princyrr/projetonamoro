import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const pessoasOriginais = [
  { nome: "Pamela", descricao: "Recife / PE", foto: "/img/pamela.jpg", email: "pamela@gmail.com" },
  { nome: "Renata", descricao: "São Paulo / SP", foto: "/img/renata.jpg", email: "renata@gmail.com" },
  { nome: "Jorge", descricao: "Rio de Janeiro / RJ", foto: "/img/jorge.jpg", email: "jorge@gmail.com" },
  { nome: "Mica", descricao: "Belo Horizonte / MG", foto: "/img/mica.jpg", email: "mica@gmail.com" },
  { nome: "Fonseca", descricao: "Curitiba / PR", foto: "/img/fonseca.jpg", email: "fonseca@gmail.com" },
  { nome: "Elisa", descricao: "São Paulo / SP", foto: "/img/elisa.jpg", email: "elisa@gmail.com" },
  { nome: "Caique", descricao: "Rio de Janeiro / RJ", foto: "/img/caique.jpg", email: "caique@gmail.com" },
  { nome: "Kaly", descricao: "Belo Horizonte / MG", foto: "/img/kaly.jpg", email: "kaly@gmail.com" },
  { nome: "Roberto", descricao: "Curitiba / PR", foto: "/img/roberto.jpg", email: "roberto@gmail.com" },
  { nome: "Rute", descricao: "Curitiba / PR", foto: "/img/rute.jpg", email: "rute@gmail.com" },
  { nome: "Flavia", descricao: "Curitiba / PR", foto: "/img/flavia.jpg", email: "flavia@gmail.com" },
  { nome: "Paulo", descricao: "Paraiba / PB", foto: "/img/paulo.jpg", email: "paulo@gmail.com" },
  { nome: "Jean", descricao: "Natal / RN", foto: "/img/jean.jpg", email: "jean@gmail.com" },
  { nome: "Habibi", descricao: "Recife / PE", foto: "/img/habibi.jpg", email: "habibi@gmail.com" },
  { nome: "Turco", descricao: "São Paulo / SP", foto: "/img/turco.jpg", email: "turco@gmail.com" },
  { nome: "Binho", descricao: "Rio de Janeiro / RJ", foto: "/img/binho.jpg", email: "binho@gmail.com" },
  { nome: "Layla", descricao: "São Paulo / SP", foto: "/img/layla.jpg", email: "layla@gmail.com" },
  { nome: "Amanda", descricao: "Rio de Janeiro / RJ", foto: "/img/amanda.jpg", email: "amanda@gmail.com" },
  { nome: "Vanessa", descricao: "Recife / PE", foto: "/img/vanessa.jpg", email: "vanessa@gmail.com" },
  { nome: "Bruna", descricao: "São Paulo / SP", foto: "/img/bruna.jpg", email: "bruna@gmail.com" },
];

const embaralharArray = (array) => array.sort(() => Math.random() - 0.5);
const pessoas = embaralharArray([...pessoasOriginais]).slice(0, 20);

export default function TelaPrincipal() {
  const [emailLogado, setEmailLogado] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const emailUsuario = localStorage.getItem("emailUsuario");
    if (emailUsuario) {
      setEmailLogado(emailUsuario);
    }
  }, []);

  const handleSair = () => {
    setEmailLogado(null);
    localStorage.removeItem("emailUsuario");
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="templante">
      <div className="topo">
        <div className="logado">
          <div className="status-logado">
            <img src="/img/logado.png" alt="Usuário logado" />
          </div>
          <div className="status-logado">
            <h5>{emailLogado ? emailLogado : "Usuário não logado"}</h5>
            {emailLogado && (
              <p className="sair" onClick={handleSair}>
                Sair
              </p>
            )}
          </div>
        </div>

        <div className="banner-content">
          <h1>Salas de BATE-PAPO</h1>
          <p>Aqui é onde sua jornada começa!</p>
        </div>

        <div className="tela-principal">
          <div className="links-container">
            <div className="link-item">
              <a href="/link1">
                <img src="/img/namoro.png" alt="Namoro" className="link-img" />
                <h3 className="link-title">Namoro</h3>
              </a>
            </div>
            <div className="link-item">
              <a href="/link2">
                <img src="/img/date.png" alt="Acompanhante" className="link-img" />
                <h3 className="link-title">Acompanhante</h3>
              </a>
            </div>
            <div className="link-item">
              <a href="/link3">
                <img src="/img/amizade.png" alt="Amizade" className="link-img" />
                <h3 className="link-title">Amizade</h3>
              </a>
            </div>
            <div className="link-item">
              <a href="/link4">
                <img src="/img/hot.png" alt="Sexo" className="link-img" />
                <h3 className="link-title">Sexo</h3>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="cont2">
        <h2>Pessoas Online</h2>

        <div className="perfil">
          {pessoas.map((pessoa, index) => (
            <div key={index} className="card">
              <img src={pessoa.foto} alt={pessoa.nome} className="card-img" />
              <h3 className="card-title">{pessoa.nome}</h3>
              <p className="card-description">{pessoa.descricao}</p>

              <div className="card-actions">
                <a href="/curtir" className="action-link">
                  <img src="/img/curtir.png" alt="Curtir" className="action-icon" />
                </a>
                <a href="/comentar" className="action-link">
                  <img src="/img/mensagem.png" alt="Comentar" className="action-icon" />
                </a>
                <a href="/excluir" className="action-link">
                  <img src="/img/x.png" alt="Excluir" className="action-icon" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="footer">
        <p>&copy; 2025 Bate-Papo Online. Todos os direitos reservados.</p>
        <nav>
          <a href="/sobre">Sobre</a> | <a href="/privacidade">Política de Privacidade</a> | <a href="/contato">Contato</a>
        </nav>
      </footer>
    </div>
  );
}
