import { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import { DragDropContext, Droppable, Draggable  } from 'react-beautiful-dnd'

import API from '../helpers/API'

import List from './List'

function AllLists () {
  const [lists, setLists] = useState([])

  useEffect(() => {
    ;(async () => {
      const newLists = await API('/lists')
      setLists(newLists)
    })()
  }, [])

  const handleAddList = function () {
    const newLists = Array.from(lists)
    newLists.push({
      id:uuid(), 
      title:'', 
      cards:[], 
      weight:lists.length,
      isNew:true})
    setLists(newLists)
  }
  const handleDelete = function (listId) {
    const newLists = []
    for (let i in lists) {
      if (lists[i].id !== listId) {
        newLists.push(lists[i])
      }
    }
    setLists(newLists)
    API(`/lists/${listId}`, 'DELETE')
  }
  const handleOnDragEnd = function (result, provided) {
    if (!result.destination) return

    // re-order lists
    if (result.draggableId.substr(0, 4) === 'list' &&
    result.source.droppableId === 'all' &&
    result.destination.droppableId === 'all') {
      const newLists = Array.from(lists)
      const [reorderedList] = newLists.splice(result.source.index, 1)
      newLists.splice(result.destination.index, 0, reorderedList)
      newLists.map((list, index) => {
        list.weight = index
        API(`/lists/${list.id}`, 'PATCH', list)
        return list
      })
      setLists(newLists)
    }
  }

  return (
    <div>
      {!!lists.length && (
      <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="all">
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {
            lists && lists.length && (
              lists.map((list, index) => (
                <Draggable index={index} draggableId={`list-${list.id}`} key={`list-${list.id}`}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                  <List list={list} key={list.id} onDelete={handleDelete} dragHandleProps={provided.dragHandleProps} />
                  {provided.placeholder}
                  </div>
                )}
                </Draggable>
              ))
            )
          }
          {provided.placeholder}
        </div>
      )}
      </Droppable>
      </DragDropContext>
      )}
      {!lists.length && (
        <p>There are no lists.</p>
      )}
      <button onClick={handleAddList}>+</button>
    </div>
  )
}

export default AllLists
