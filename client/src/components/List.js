import { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid'

import EditableText from './EditableText'
import Card from './Card'
import API from '../helpers/API'

function List (props) {
  const [title, setTitle] = useState(props.list.title)
  const [cards, setCards] = useState(props.list.cards || [])
  const [weight, setWeight] = useState(props.list.weight)

  useEffect(() => {
    props.list.title = title
    props.list.cards = cards
    ;(async () => {
      if (props.list.isNew) {
        await API('/lists', 'POST', {id:props.list.id, title:title, weight:weight})
        props.list.isNew = false
      } else {
        API(`/lists/${props.list.id}`, 'PATCH', {title:title, cards:cards, weight:weight})
      }
    })()
  }, [title, cards, weight])

  const handleClickAdd = function () {
    const newCards = Array.from(cards)
    newCards.push({
      id: uuid(), 
      title:'', 
      description:'', 
      status:0, 
      due:'',
      weight:cards.length
    })
    setCards(newCards)
  }
  const handleCardDelete = function (cardId) {
    const newCards = []
    for (let i in cards) {
      if (cards[i].id !== cardId) {
        newCards.push(cards[i])
      }
    }
    setCards(newCards)
  }
  const handleTitleChange = function (newText) {
    setTitle(newText)
  }
  const handleDeleteClick = function () {
    if (props.onDelete) props.onDelete(props.list.id)
  }
  const handleCardChange = function () {
    setCards(JSON.parse(JSON.stringify(cards)))
  }

  return (
    <div style={{
      boxShadow:'0 1px 2px rgba(0,0,0,0.25)',
      padding:15,
      borderRadius:4,
      marginBottom:20,
      background:'white'
    }}>
      <h2>
        <EditableText text={title} onChange={handleTitleChange} />
        <button onClick={handleDeleteClick}>-</button>
      </h2>
      {
        cards.map(card => (
          <Card card={card} key={card.id} onDelete={handleCardDelete} onChange={handleCardChange} />
        ))
      }
      <button onClick={handleClickAdd}>+</button>
    </div>
  )
}

export default List
