import formatPrice from '../../utils/formatPrice'

const StorageSelector = ({ storageOptions, selectedCapacity, onStorageChange }) => {
    return (
        <>
            <p>Storage ¿How much space do you need?</p>
            <fieldset>
                <legend className="sr-only">Storage options</legend>
                {storageOptions?.map((option) => (
                    <label key={option.capacity}>
                        <input
                            type="radio"
                            name="storage"
                            value={option.capacity}
                            checked={selectedCapacity === option.capacity}
                            onChange={() => onStorageChange(option.capacity)}
                        />
                        {option.capacity} - {formatPrice(option.price)} EUR
                    </label>
                ))}
            </fieldset>
        </>
    )
}

export default StorageSelector