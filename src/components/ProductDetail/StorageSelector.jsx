import { StorageSelectorLabel, StorageSelectorInput, StorageSelectorLabelWrapper } from './StorageSelector.styles'

const StorageSelector = ({ storageOptions, selectedCapacity, onStorageChange }) => {
    return (
        <>
            <fieldset>
                <legend className="font-s font-weight-light text-uppercase margin-block-end-l">Storage ¿How much space do you need?</legend>
                <StorageSelectorLabelWrapper>
                    {storageOptions?.map((option) => (
                            <StorageSelectorLabel key={option.capacity}>
                                <input
                                    type="radio"
                                    checked={selectedCapacity === option.capacity}
                                    className="sr-only"
                                    name="storage"
                                    onChange={() => onStorageChange(option.capacity)}
                                    value={option.capacity}
                                />
                                <StorageSelectorInput 
                                    className="font-s font-weight-light text-uppercase" 
                                    aria-hidden="true"
                                >
                                    {option.capacity}
                                </StorageSelectorInput>
                            </StorageSelectorLabel>
                    ))}
                </StorageSelectorLabelWrapper>
            </fieldset>
        </>
    )
}

export default StorageSelector