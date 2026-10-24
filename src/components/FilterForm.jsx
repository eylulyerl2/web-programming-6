function FilterForm({ value, onChange }) {
  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <label htmlFor="filter">Filter by title: </label>
      <input
        id="filter"
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Type to filter..."
      />
    </form>
  );
}

export default FilterForm;
