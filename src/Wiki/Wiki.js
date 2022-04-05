import React, { useState, useEffect } from 'react'

const Wiki = () => {
  const [term, setTerm] = useState('Frontend Development')
  const [result, setResult] = useState([])

  const getData = async () => {
    try {
      const response = await fetch(
        `http://en.wikipedia.org/w/api.php?action=query&list=search&origin=*&format=json&srsearch=${term}`
      )
      const result = await response.json()
      setResult(result.query.search)
      console.log(result.query.search)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (term) {
        getData()
      }
    }, 1000)
    return () => {
      clearTimeout(timeoutId)
    }
  }, [term])

  const renderResult = result.map((item) => {
    return (
      <div class='ui message' key={item.pageid}>
        <div class='header'>{item.title}</div>

        <p dangerouslySetInnerHTML={{ __html: item.snippet }}></p>
      </div>
    )
  })

  return (
    <>
      <form className='ui form'>
        <div className='field'>
          <label>Search</label>
          <input
            type='text'
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            name='Search'
            placeholder='Search'
          />
        </div>

        <button className='ui button' type='submit'>
          Submit
        </button>
      </form>
      <hr />
      {renderResult}
    </>
  )
}

export default Wiki
