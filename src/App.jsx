import { useState, useEffect, useMemo, memo } from "react"
import './index.css';


const PoliticianCard = memo(({ name, image, position, biography }) => {
  console.log('test')
  return (
    <div className="politicians-card">
      <h3 className="card-title">{name}</h3>
      <figure className="card-image">
        <img src={image} alt={name} />
      </figure>
      <p className="card-position"><strong>posizione:</strong>{position}</p>
      <p className="card-biography">{biography}</p>
    </div>
  )
})

function App() {

  //dichiaro lo stato iniziale dell'oggetto 
  const [politicians, setPoliticians] = useState([])

  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch('http://localhost:3333/politicians')
      .then(res => res.json())
      .then(data => setPoliticians(data))
      .catch(error => console.error(error))
  }, []) // useEffect vuole sempre una dipendenza che adesso è settata come vuota


  const politiciansFiltred = useMemo(() => {
    return politicians.filter((politician) => {
      const isInName = politician.name.toLowerCase().includes(search.toLocaleLowerCase())
      const isInBio = politician.biography.toLowerCase().includes(search.toLocaleLowerCase())
      return isInName || isInBio
    })
  }, [politicians, search])

  return (
    <>
      <h1>Lista dei politici</h1>
      <input
        type="text"
        placeholder="cerca per nome o per biografia"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
     
      <div className="politicians-list">
        {politiciansFiltred.map(p => {

          return (
            <PoliticianCard key={p.id} {...p} />
          )
        })
        }
      </div>
    </>
  )
}

export default App
