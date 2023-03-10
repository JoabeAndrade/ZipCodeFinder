import { useState } from 'react';
import { FiSearch } from 'react-icons/fi'
import './style.css';
import api from './services/api';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch(){
    if(input === ''){
      alert("Preencha o campo vazio")
      return;
    }

    try{
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput("")
    }catch{
      alert("Ops! Erro ao efetuar a busca")
      setInput("")
    }
  }

  return (
    <div className="container">
      <h1 className="title">Bucador de CEP</h1>

      <div className="container-Input">
        <input 
        type="text" 
        placeholder="Digite seu CEP"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#fff"/>
        </button>
      </div>
      
      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>

          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Cidade: {cep.localidade} - {cep.uf}</span>
        
        </main>
      )}
      
    </div>
  );
}

export default App;
