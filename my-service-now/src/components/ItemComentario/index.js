import './index.css';

function ItemComentario({
    text = 'Lorem ipsum dolor sit amet, consectetur adipiscing', 
    datetime = '15/08/2024 11:48'
}) {
    return (
        <div className='item-comentario-container'>
            <p>{text}</p>
            <p className="datetime">{datetime}</p>
        </div>
    )
}

export default ItemComentario;