import { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid'

import API from '../helpers/API'

import List from './List'

function AllLists () {
  const [lists, setLists] = useState([])

  useEffect(() => {
    ;(async () => {
      const newLists = await API('/lists')
      console.log(newLists)
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

  return (
    <div>
      {
        lists && lists.length && (
          lists.map(list => (
            <List list={list} key={list.id} onDelete={handleDelete} />
          ))
        )
      }
      <button onClick={handleAddList}>+</button>
    </div>
  )
}

export default AllLists
