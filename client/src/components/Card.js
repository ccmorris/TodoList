import moment from 'moment'

import EditableText from './EditableText'

function Card (props) {
  const handleTitleChange = function (newTitle) {
    if (props.card.title !== newTitle) {
      props.card.title = newTitle
      if (props.onChange) props.onChange(props.card)
    }
  }
  const handleDescriptionChange = function (newDescription) {
    if (props.card.description !== newDescription) {
      props.card.description = newDescription
      if (props.onChange) props.onChange(props.card)
    }
  }
  const handleStatusChange = function (evt) {
    props.card.status = evt.target.checked ? 1 : 0
    if (props.onChange) props.onChange(props.card)
  }
  const handleDueChange = function (evt) {
    const newDue = evt.target.value
    if (props.card.due !== newDue) {
      props.card.due = newDue
      if (props.onChange) props.onChange(props.card)
    }
  }

  const handleDelete = function () {
    if (props.onDelete) props.onDelete(props.card.id)
  }

  const isPast = !props.card.due || moment(props.card.due).isAfter()
  const bgColor = props.card.status ? '#a5dca5' : (isPast ? '#fbffc5' : '#e9b9b9')
  return (
    <div style={{
    borderRadius:4,
    padding:10,
    marginBottom:10,
    background:bgColor,
    transition:'background 0.4s'
    }}>
      <h3>
        <EditableText text={props.card.title} onChange={handleTitleChange} />
        <button onClick={handleDelete}>-</button>
      </h3>
      <p><EditableText text={props.card.description} onChange={handleDescriptionChange} /></p>
      <p><label><input type="checkbox" checked={props.card.status} onChange={handleStatusChange} /> finished</label></p>
      <p><label>due <input type="date" value={props.card.due} onChange={handleDueChange} /></label></p>
      
    </div>
  )
}

export default Card
