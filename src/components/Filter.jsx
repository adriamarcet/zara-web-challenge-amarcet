import { useEffect, useState } from "react";

const Filter = function() {
    const [query, setQuery] = useState()
    const [debouncedQuery, setDebouncedQuery] = useState()

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedQuery(query)
        }, 250)
        return () => clearTimeout(timeoutId)
    }, [query])

    useEffect(() => {
        if(debouncedQuery) {
            console.log('searching for:', debouncedQuery)
        }
    }, [debouncedQuery])

    const handleFilterInput = e => {
        setQuery(e.target.value)
    }

    return (
        <div className="container">
            <form action="">
                <input type="text" name="filterInput" onChange={handleFilterInput} />
            </form>
        </div>
    )

}

export default Filter;