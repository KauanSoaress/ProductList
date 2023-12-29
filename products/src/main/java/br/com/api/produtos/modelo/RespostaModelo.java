// Classe utilizada quando houver algum problema em problemas como cadastramentos, seleções, alterações e exclusões 
package br.com.api.produtos.modelo;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

// Possibilita a injeção de dependência (Deixar por conta do spring a criação de um objeto relacioanda àquela classe)
@Component
@Getter
@Setter
public class RespostaModelo {
  // Modelo para validar requisições
  private String mensagem;
}
