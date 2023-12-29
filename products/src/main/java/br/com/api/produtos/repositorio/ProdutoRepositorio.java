package br.com.api.produtos.repositorio;

import org.springframework.stereotype.Repository;
import org.springframework.data.repository.CrudRepository;
import br.com.api.produtos.modelo.ProdutoModelo;

// Classe utilizada para realizar as operações de CRUD no banco de dados
// Notação @Repository indica ao spring que a classe é um repositório e futuramente pode-se utilizar a injeção de dependência
@Repository
public interface ProdutoRepositorio extends CrudRepository<ProdutoModelo, Long> {
  
}
