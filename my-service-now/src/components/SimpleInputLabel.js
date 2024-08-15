import './SimpleInputLabel.css'

function SimpleInputLabel({id, label = false, inputType = 'default', placeholder = '', value='', disabled=false, onChange, inputClassName='', text = ''}, ) {
    return (
        <div className="simple-input-label-container">
            {label ? <label>{label}:</label> : ''}
            {inputType === 'textarea' ? <textarea className={text} type={inputType} placeholder={placeholder} value={value} disabled={disabled} onChange={onChange}/> : <input id={id} type={inputType} className={inputClassName} placeholder={placeholder} value={value} disabled={disabled} onChange={onChange}/>}
        </div>
    )
}

export default SimpleInputLabel;