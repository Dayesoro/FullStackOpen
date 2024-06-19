const Filter = ({ handleFilteredNumbers, filteredNumbers }) => {
    return (
        <div>
            filter shown with:{' '}
            <input
                value={filteredNumbers}
                onChange={handleFilteredNumbers}
            />
        </div>
    )
}

export default Filter