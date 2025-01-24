import { useNavigate } from "react-router-dom"
import axios from "axios";
import { useState } from "react";

const PizzaCreate = () => {
  const initialFormData = {
    name: '',
    image: '',
    ingredients: ''
  }

  const navigate = useNavigate();
  const baseApiUrl = import.meta.env.VITE_BASE_API_URL;
  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }))
  }

  const handleAddPizza = (e) => {
    e.preventDefault();
    // trasformo la stringa degli ingredienti in array col trim() degli elementi
    const ingredientsArray = formData.ingredients
      .split(',')
      .map(item => item.trim());

    // imposto l'oggetto da inviare all'API
    const newPizza = { ...formData, ingredients: ingredientsArray }

    // chiamata in POST all'API inviando il nuovo elemento
    axios.post(`${baseApiUrl}/pizzas`, newPizza)
      .then(res => {
        // resetto il form
        setFormData(initialFormData)
        //reindirizzo all'elenco delle pizze
        navigate('/elenco-pizze')
      })
  }

  return (
    <>
      <div className="container my-5">
        <div className="card">
          <div className="card-body">
            <h1 className="my-3">NUOVA PIZZA</h1>
            <div className="container my-5">
              <div className="card">
                <div className="card-body">
                  <div className="card-title">
                    <h2>Aggungi una nuova pizza</h2>
                  </div>
                  <form action="" onSubmit={handleAddPizza}>
                    <div className="mb-3">
                      <label htmlFor="name">Nome pizza</label>
                      <input
                        id='name'
                        type="text"
                        name='name'
                        className='form-control'
                        placeholder='Nome pizza'
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="image">URL immagine</label>
                      <input
                        id='image'
                        type="text"
                        name='image'
                        className='form-control'
                        placeholder='URL immagine'
                        value={formData.image}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="ingredients">Ingredienti (separati da virgola)</label>
                      <input
                        id='ingredients'
                        type="text"
                        name='ingredients'
                        className='form-control'
                        placeholder='Es. pomodoro, mozzarella'
                        value={formData.ingredients}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <button
                        className="btn btn-primary"
                        type='submit'
                      >
                        Aggiungi pizza
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PizzaCreate
