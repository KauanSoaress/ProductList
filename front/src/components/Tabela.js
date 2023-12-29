export default function Tabela({vetor, selecionar}) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Nome</th>
          <th>Marca</th>
          <th>Selecionar</th>
        </tr>
      </thead>
      <tbody>
        {
          vetor.map((obj, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{obj.nome}</td>
                <td>{obj.marca}</td>
                {/* Funções que contém parâmetros necessitam serem chamadas dentro de uma arrow function */}
                <td><button onClick={() => {selecionar(index)}} className="btn btn-success">Selecionar</button></td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}