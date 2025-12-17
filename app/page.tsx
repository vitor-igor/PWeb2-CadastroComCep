"use client"

import { useEffect, useState } from "react";

export default function Home() {
  const [ cep, setCep ] = useState("");
  const [ rua, setRua ] = useState("");
  const [ numero, setNumero ] = useState("");
  const [ bairro, setBairro ] = useState("");
  const [ estado, setEstado ] = useState("");
  const [ cidade, setCidade ] = useState("");

  const [ fetchError, setFetchError ] = useState(false);

  async function getAddress() {
    try{
      const address = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await address.json();

      if(data.erro) {
        throw Error;
      }

      setFetchError(false);

      return data;
    }
    catch(err) {
      setFetchError(true);
      setRua("");
      setBairro("");
      setEstado("");
      setCidade("");
    }
  }

  const handleCep = () => {
    (cep.length == 8) ? (
      async () => {
        const address = await getAddress();
        
        (address) && (
          setRua(address.logradouro || ""),
          setBairro(address.bairro || ""),
          setEstado(address.uf || ""),
          setCidade(address.localidade || "")
        )
      })() : (
        setFetchError(true),
        setRua(""),
        setBairro(""),
        setEstado(""),
        setCidade("")
      )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-preto">
      <div className="p-5 pl-10 pr-10 border border-branco rounded-2xl">
        <h1 className="font-bold text-4xl p-3">Cadastro de Endereço</h1>
        
        <form className="flex flex-col gap-3">
          {(fetchError) ? (
            <div className="flex flex-col gap-1 text-red-500">
              <label className="font-bold">CEP:</label>
              <input 
                type="text" 
                className="border border-red-500 p-2 rounded-xl" 
                placeholder="Informe o CEP" 
                value={cep}
                onChange={(e) => {setFetchError(false); setCep(e.target.value)}}
                onBlur={handleCep}
              />

              <p className="pt-2 text-red-500">O CEP digitado é inválido.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <label className="font-bold">CEP:</label>
              <input 
                type="text" 
                className="border border-branco p-2 rounded-xl" 
                placeholder="Informe o CEP" 
                value={cep}
                onChange={(e) => {setFetchError(false); setCep(e.target.value)}}
                onBlur={handleCep}
              />
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="font-bold">Rua:</label>
            <input 
              type="text" 
              className="border border-branco p-2 rounded-xl" 
              placeholder="Informe a Rua" 
              value={rua} 
              onChange={(e) => setRua(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-bold">Número:</label>
            <input 
              type="text" 
              className="border border-branco p-2 rounded-xl" 
              placeholder="Informe o Número" 
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-bold">Bairro:</label>
            <input 
              type="text" 
              className="border border-branco p-2 rounded-xl" 
              placeholder="Informe o Bairro" 
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-bold">Estado:</label>
            <input 
              type="text" 
              className="border border-branco p-2 rounded-xl" 
              placeholder="Informe o Estado" 
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-bold">Cidade:</label>
            <input 
              type="text" 
              className="border border-branco p-2 rounded-xl" 
              placeholder="Informe a Cidade" 
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
