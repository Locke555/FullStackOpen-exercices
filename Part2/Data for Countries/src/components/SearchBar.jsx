const SearchBar = ({search, setSearch}) => {

    const handleNewSearchChange = (e) => setSearch(e.target.value)
    
    const handleSubmit = (e) => {
        e.preventDefault()
     
    }

    return(
            <div>
                Find Countries
                <form onSubmit={handleSubmit}>
                    <input type="text" value={search} onChange={handleNewSearchChange}/>
                </form>
            </div>
    )
}

export default SearchBar