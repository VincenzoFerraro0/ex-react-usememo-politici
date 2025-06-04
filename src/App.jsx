import { useState, useEffect } from "react"
import './index.css';
function App() {

  //dichiaro lo stato iniziale dell'oggetto 
  const [politicians, setPoliticians] = useState([])

  useEffect(() => {
    fetch('http://localhost:3333/politicians')
      .then(res => res.json())
      .then(data => setPoliticians(data))
      .catch(error => console.error(error))
  }, []) // useEffect vuole sempre una dipendenza che adesso è settata come vuota



  console.log(politicians)
  return (
    <>
      <h1>Lista dei politici</h1>
      <div className="politicians-list">
        {politicians.map(p => {
          const { id, name, image, position, biography } = p
          return (
            <div key={id} className="politicians-card">
              <h3 className="card-title">{name}</h3>
              <figure className="card-image">
                <img src={image} alt={name} />
              </figure>
              <p className="card-position"><strong>posizione:</strong>{position}</p>
              <p className="card-biography">{biography}</p>
            </div>
          )
        })
        }
      </div>
    </>
  )
}

export default App
