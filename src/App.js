import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories')
      .then(response => {
        setRepositories(response.data);
      })
      .catch(e => alert('Erro ao pegar dados da API' + e));
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories',{
      title: `Novo Repositório ${Date.now()}`,
      url: `http://github.com/GustavoBenevenuto`,
      techs: [
        "Node JS", "React Native", 'React JS', `React-${Date.now()}`
      ]
    });
    console.log(repositories);
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id,index) {
    await api.delete(`repositories/${id}`);
    const newRepositories = [...repositories];
    newRepositories.splice(index,1);
    setRepositories(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((item,index) => {
          return (
            <div key={item.id}>
              <li>{item.title}</li>
              <button onClick={() => handleRemoveRepository(item.id,index)}>
                Remover
          </button>
            </div>
          )
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
