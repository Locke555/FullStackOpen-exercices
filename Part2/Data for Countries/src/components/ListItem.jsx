const ListItem = ({setSearch, name}) => {

    const handleClick = () => setSearch(prev=>name)
    return (
        <>
            <div>{ name } <button onClick={handleClick}>Show</button ></div>
        </>
    )}
export default ListItem