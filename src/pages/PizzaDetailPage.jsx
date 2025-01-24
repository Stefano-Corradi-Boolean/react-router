import { useParams, useNavigate } from "react-router-dom"
import axios from "axios";
import { useEffect, useState } from "react";

const PizzaDetailPage = () => {

  const { id } = useParams();
  const baseApiUrl = import.meta.env.VITE_BASE_API_URL;
  const [pizza, setPizza] = useState(null);
  const navigate = useNavigate()

  const fetchPizza = () => {

    axios.get(`${baseApiUrl}/pizzas/${id}`)
      .then(res => {
        setPizza(res.data)
      })
      .catch(err => {
        console.log('Errore nel caricamento della pizza', err);

      })
  }

  const handleDeletePizza = () => {

    axios.delete(`${baseApiUrl}/pizzas/${id}`)
      .then(res => {
        // torno all'elenco
        navigate('/elenco-pizze')
      })
      .catch(error => {
        console.error("Errore ", error)
      })
  }

  useEffect(() => {
    fetchPizza()
  }, [])



  return (
    <>
      <div className="container my-5">
        <div className="card">
          <div className="card-body">
            <h1>{pizza?.name}</h1>
            <img className="my-3 img-fluid" src={pizza?.image} alt={pizza?.name} />
            <p>
              Ingredienti: <strong>{pizza?.ingredients.join(', ')}</strong>
            </p>
            <div className="d-flex justify-content-between">
              <button
                className="btn btn-warning"
                onClick={() => navigate(-1)}
              >Torna</button>
              <button
                className="btn btn-danger"
                onClick={handleDeletePizza}
              >Elimina</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PizzaDetailPage
