import './SelectOption.css'

function SelectOption({label, options, disabled = false, onChange, value}) {

    const id = label.toLowerCase();
    const name = label.toLowerCase();

    const optionsTag = options.map((option) => {
        return <option value={option}>{option}</option>
    })

    return (
        <div className='container-select'>
            <label for="category">{label}:</label>
            <select id={id} name={name} onChange={onChange} disabled={disabled} value={value} active={value}>
                {optionsTag}
            </select>
        </div>
    )
}

export default SelectOption;