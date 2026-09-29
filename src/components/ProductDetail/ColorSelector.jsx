import { useId } from 'react'
import { ColorSelectorOptions, ColorSelectorLabel, ColorSelectorSquare } from './ColorSelector.styles'

const ColorSelector = ({ colorOptions = [], selectedColorName, onColorChange }) => {
    const groupId = useId()
    
    if (!colorOptions.length) return null

    return (
        <>
            <fieldset>
                <legend className="font-s font-weight-light text-uppercase margin-block-end-l">
                    Color. Pick your favourite.
                </legend>
                <ColorSelectorOptions>
                    {colorOptions?.map((option) => {
                        return (
                            <ColorSelectorLabel key={option.name}>
                                <input
                                    className="sr-only"
                                    type="radio"
                                    name={groupId}
                                    value={option.name}
                                    checked={selectedColorName === option.name}
                                    onChange={() => onColorChange(option.name)}
                                />
                                <ColorSelectorSquare 
                                    aria-hidden="true"
                                    style={{
                                        backgroundColor: option.hexCode,
                                    }}
                                ></ColorSelectorSquare>
                                <span className="sr-only">{option.name}</span>
                            </ColorSelectorLabel>
                        )
                    })}
                </ColorSelectorOptions>
                <span
                    className="font-s font-weight-light"
                    aria-live="polite"
                    style={{ display: 'block', minHeight: '1.5em' }}
                    >
                    {selectedColorName
                        ? `Selected color: ${selectedColorName}`
                        : '\u00a0'}
                </span>
            </fieldset>
        </>
    )
}

export default ColorSelector