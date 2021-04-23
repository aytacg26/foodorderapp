import classes from './DropDown.module.css';
import React from 'react';
import PropTypes from 'prop-types';

/**
 *
 * @param {Object []} options - options object array [{id:optionId, name:optionText, value:optionValue}] for <select> element  (props)
 * @param {string} label - label for the drop down <select> element (props)
 * @param {string} id - id for select element and it is used on <label htmlFor=id> (props)
 * @param {string} name - name for select element (props)
 * @param {boolena} isMultiple - Specifies that multiple options can be selected at once (props)
 * @param {boolena} isRequired - Specifies that the user is required to select a value before submitting the form (props)
 * @param {number} size - Defines the number of visible options in a drop-down list (props)
 * @param {string} className - class to overwrite current class of the component (props)
 * @param {function} onChange - onchange event handler function for the component (props)
 * @param {string} title - built-in title attribute for component (props)
 * @returns
 */

const DropDown = ({
  options,
  label,
  id,
  name,
  isMultiple,
  isRequired,
  size,
  className,
  onChange,
  title,
}) => {
  const dropDownClass =
    className !== undefined && className !== null
      ? className
      : `${classes.DropDown} ${label ? '' : classes.pushUp}`;

  return (
    <div className={dropDownClass} title={title}>
      {label && <label htmlFor={id}>{label}</label>}
      <select
        id={id}
        name={name}
        multiple={isMultiple}
        required={isRequired}
        size={size || 1}
        onChange={onChange}
      >
        {options.map((op) => (
          <option value={op.value} key={op.id}>
            {op.name}
          </option>
        ))}
      </select>
    </div>
  );
};

DropDown.propTypes = {
  options: PropTypes.array.isRequired,
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  isMultiple: PropTypes.bool,
  isRequired: PropTypes.bool,
  size: PropTypes.number,
  className: PropTypes.string,
};

export default DropDown;

/**
 * SAMPLE : 
 *       <DropDown
        options={[
          { id: 'op-0', name: 'Choose a car', value: '' },
          { id: 'op-1', name: 'BMW', value: 'bmw' },
          { id: 'op-2', name: 'Mercedes', value: 'mercedes' },
          { id: 'op-3', name: 'Porsche', value: 'porsche' },
        ]}
        id='luxury'
        name='cars'
        label='Cars'
      />
 * 
 */
