import { useEffect, useState } from 'react';
import './App.css';
import Formulario from './components/Formulario';
import Tabela from './components/Tabela';

function App() {

  // Objeto produto
  const produto = {
    codigo: 0,
    nome: '',
    marca: ''
  }

  // UseState
  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [produtos, setProdutos] = useState([]);
  const [objProduto, setObjProduto] = useState(produto);

  // UseEffect - Faz a requisição com o backend para obter os produtos e, em seguida, enviar para o useState produtos
  useEffect(() => {
    fetch('http://localhost:8080/listar')
    .then(retorno => retorno.json())
    .then(retorno_convertido => setProdutos(retorno_convertido))
  }, []); // O [] garante que vai fazer apenas 1 vez a requisição à API, não entrando em loop infinito

  // Obtendo os dados do formulário
  const aoDigitar = (e) => {
    setObjProduto({...objProduto, [e.target.name]:e.target.value});
  }

  // Cadastrar Produto
  const cadastrar = () => {
    fetch('http://localhost:8080/cadastrar', {
      method: 'POST',
      body: JSON.stringify(objProduto),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      if (retorno_convertido.mensagem !== undefined) {
        alert(retorno_convertido.mensagem);
      } else {
        // Atualizar o vetor de produtos
        setProdutos([...produtos, retorno_convertido]);

        //Mensagem
        alert('Produto cadastrado com sucesso!');

        //Limpar o formulário
        limparFormulario();
      }
    })
  }

  // Remover Produto
  const remover = () => {
    fetch('http://localhost:8080/remover/'+objProduto.codigo, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      // Mensagem
      alert(retorno_convertido.mensagem);

      // Cópia do vetor de produtos
      let vetorTemp = [...produtos]; // Dessa forma, o vetorTemp vai ter acesso a todos os produtos, com código, nome e marca

      // Índice
      let index = vetorTemp.findIndex((p) => {
        return p.codigo === objProduto.codigo; // Retornará o índice do produto que tiver o código igual ao código do produto que está no formulário
      });

      // Remover o produto do vetorTemp
      vetorTemp.splice(index, 1);

      // Atualizar o vetor de produtor
      setProdutos(vetorTemp);

      // Limpar formulário
      limparFormulario();
    })
  }

    // Alterar Produto
    const alterar = () => {
      fetch('http://localhost:8080/alterar', {
        method: 'PUT',
        body: JSON.stringify(objProduto),
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {
        if (retorno_convertido.mensagem !== undefined) {
          alert(retorno_convertido.mensagem);
        } else {

          // Cópia do vetor de produtos
          let vetorTemp = [...produtos]; // Dessa forma, o vetorTemp vai ter acesso a todos os produtos, com código, nome e marca

          // Índice
          let index = vetorTemp.findIndex((p) => {
            return p.codigo === objProduto.codigo; // Retornará o índice do produto que tiver o código igual ao código do produto que está no formulário
          });

          // Alterar o produto do vetorTemp
          vetorTemp[index] = objProduto; // Altera o produto do índice index pelo produto que está no formulário

          // Atualizar o vetor de produtor
          setProdutos(vetorTemp);

          //Mensagem
          alert('Produto alterado com sucesso!');

          //Limpar o formulário
          limparFormulario();
        }
      })
    }

  // Limpar Formulário 
  const limparFormulario = () => {
    setObjProduto(produto);
    setBtnCadastrar(true);
  }

  // Selecionar Produto
  const selecionarProduto = (index) => {
    setObjProduto(produtos[index]);
    setBtnCadastrar(false);
  }

  // Retorno
  return (
    <div>
      <Formulario botao={btnCadastrar} eventoTeclado={aoDigitar} cadastrar={cadastrar} obj={objProduto} cancelar={limparFormulario} remover={remover} alterar={alterar}/>
      <Tabela vetor={produtos} selecionar={selecionarProduto} />
    </div>
  );
}

export default App;
