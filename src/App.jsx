import { useRef, useState } from "react"
import { Address } from "./components/Address.jsx"
import { Error } from "./components/Error.jsx"
import { api } from "./services/api.js"

export function App() {
  const [address, setAddress] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const inputCep = useRef(null)

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      verifyInput()
    }
  }

  function verifyInput() {
    let message = ""
    const cep = inputCep.current.value.trim()
    const regexLetters = /[a-zA-ZÀ-ÿ]/
    const regexCaracteres = /^\d{5}-?\d{3}$/

    if (regexLetters.test(cep)) {
      message = "O CEP informado não pode possuir letras!"
    } else if (!regexCaracteres.test(cep)) {
      message = "O CEP deve estar no formato XXXXX-XXX ou XXXXXXXX."
    }

    if (message !== "") {
      setErrorMessage(message)
      setIsOpen(true)
      return
    }

    searchCep(cep)
  }

  async function searchCep(cep) {
    setLoading(true)

    try {
      const res = await api.get(`/${cep}/json/`)

      if (res.data.erro === true) {
        setErrorMessage("O CEP não foi encontrado, tente novamente!")
        setIsOpen(true)
        return
      }

      const newAddress = {
        id: address.length + 1,
        cep: res.data.cep,
        street: res.data.logradouro,
        nbh: res.data.bairro,
        city: res.data.localidade,
        state: res.data.uf
      }

      setAddress([...address, newAddress])

    } catch (e) {
      setErrorMessage("Ocorreu um erro ao buscar o CEP. Tente novamente mais tarde.")
      setIsOpen(true)

    } finally {
      setLoading(false)
    }

    inputCep.current.value = ""
    setIsOpen(false)
  }

  function closeAddress(id) {
    setAddress(address.filter(item => id !== item.id))
  }

  return (
    <main className="p-10 w-full h-full flex flex-col items-center justify-center cursor-default gap-10">
      <h1 className="text-green-600 font-bold text-5xl">Buscar CEP</h1>
      <div className="md:justify-between md:flex-row md:gap-5 justify-center items-center flex flex-col gap-5">
        <input onKeyUp={handleKeyPress} ref={inputCep} type="text" placeholder="Ex: 28460785" className="w-96 p-3 text-lg font-bold outline-none  text-[20px] bg-slate-700 text-zinc-200 rounded-sm placeholder:font-normal" />
        <button onClick={verifyInput} className="w-[100%] md:w-fit md: px-5 h-[50px] bg-red-800 rounded-sm text-white font-bold hover:bg-red-900 active:scale-95 duration-150 ">{loading ? "Carregando..." : "Buscar"}</button>
      </div>

      {address.length > 0 && address.map(item => (
        <Address key={item.id} item={item} closeAddress={closeAddress} />
      ))}

      {isOpen && <Error errorMessage={errorMessage} setIsOpen={setIsOpen} />}

    </main>
  )
}