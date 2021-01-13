import { useState } from 'react'

import logo from './logo.svg'
import './App.css'

function App () {

  const [lists, setLists] = useState([
    {id:0,title:'List1',cards:[
      {id:0,title:'Lorem ipsum',description:'',status:0,due:''},
      {id:1,title:'Dolor sit amet',description:'',status:0,due:''},
      {id:2,title:'Consectetur adipiscing',description:'description',status:0,due:''}
    ]},
    {id:1,title:'Other',cards:[]}
  ])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main className="App-main">
        {
          lists && lists.length && (
            lists.map(list => (
              <List list={list} key={list.id} />
            ))
          )
        }
      </main>
    </div>
  )
}

function List (props) {
  const [cards, setCards] = useState(props.list.cards || [])

  const handleClickAdd = function () {
    const newCards = Array.from(cards)
    newCards.push({
      id: Date(), 
      title:'', 
      description:'', 
      status:0, 
      due:'',
      isNew:true
    })
    setCards(newCards)
    console.log(props.list)
  }

  const handleDelete = function (cardId) {
    const newCards = []
    for (let i in cards) {
      if (cards[i].id !== cardId) {
        newCards.push(cards[i])
      }
    }
    setCards(newCards)
  }

  return (
    <div style={{
      border:'1px solid black',
      padding:10,
      borderRadius:3,
      marginBottom:10
    }}>
      <h2>{props.list.title}</h2>
      {
        cards.map(card => (
          <Card card={card} key={card.id} onDelete={handleDelete} />
        ))
      }
      <button onClick={handleClickAdd}>+</button>
    </div>
  )
}

function Card (props) {
  const handleTitleChange = function (newTitle) {
    if (props.card.title !== newTitle) {
      props.card.title = newTitle
      console.log(props.card)
    }
  }

  const handleDelete = function () {
    if (props.onDelete) props.onDelete(props.card.id)
  }

  return (
    <div style={{
    border:'1px solid black',
    borderRadius:3,
    padding:10,
    marginBottom:10
    }}>
      <h3><EditableText text={props.card.title} onChange={handleTitleChange} /></h3>
      <p>{props.card.description || '(empty)'}</p>
      <p>{props.card.status}</p>
      <p>{props.card.due || '(empty)'}</p>
      <button onClick={handleDelete}>-</button>
    </div>
  )
}

function EditableText (props) {
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(props.text)

  const handleChange = function (evt) {
    setText(evt.target.value)
  }
  const handleFocus = function () {
    setEditing(true)
  }
  const handleBlur = function () {
    setEditing(false)
    if (props.onChange) props.onChange(text)
  }

  const className = editing ? 'is-editing' : 'not-editing'
  return (
    <input type="text" value={text} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} className={className} />
  )  
}

export default App;
