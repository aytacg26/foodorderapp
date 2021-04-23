import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import classes from './Input.module.css';
import PropTypes from 'prop-types';

/**
 * ref can be used on this component, forwardRef applied
 * Imperative Functions => focus, 
 * @param {string} id - Id to be used on htmlFor of label and input element (props)
 * @param {string} name - name of input element
 * @param {string} label - the label text for the input element, it will be used for also placeholder in case of undefined placeholder (label prop)
 * @param {string} type - type of input element (default is text) (type prop)
 * @param {string} placeholder - placeholder for input element, (default will be the text of label prop)
 * @param {any} value - the value of input element which will come from state or user input (value prop)
 * @param {string | number} maxLength - the maxlength attribute of the input element (specifies the maximum number of characters allowed in input field)
 * @param {function} onChange - onchange event handler function prop
 * @param {function} onBlur - onblur event handler function prop
 * @param {function} onFocus - onfocus event handler function prop
 * @param {string} className - class to be applied to the component, component has default class, this will overwrite it
 * @param {string} title - built - in title attribute for the component
     
 }} 
 * @returns Input Component JSX
 */
const Input = (
  {
    id,
    label,
    type,
    placeholder,
    name,
    maxLength,
    value,
    onChange,
    onBlur,
    onFocus,
    className,
    title,
  },
  ref
) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
  }));

  const compClass =
    className !== null && className !== undefined ? className : classes.Input;

  return (
    <div className={compClass} title={title}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type || `text`}
        placeholder={placeholder || label}
        value={value}
        onChange={onChange}
        name={name}
        onBlur={onBlur}
        onFocus={onFocus}
        ref={inputRef}
        maxLength={`${maxLength}`}
      />
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  maxLength: PropTypes.oneOfType(['number', 'string']),
  value: PropTypes.any,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  className: PropTypes.string,
};

export default forwardRef(Input);
