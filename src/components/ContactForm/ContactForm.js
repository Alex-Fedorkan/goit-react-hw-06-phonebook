import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { addContact } from '../../redux/contacts/contacts-actions';
import PropTypes from 'prop-types';
import s from './ContactForm.module.css';

const ContactForm = ({ contacts, handleFormSubmit }) => {
  const { register, handleSubmit, errors } = useForm();
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const addNewContact = ({ name, number }, e) => {
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase(),
      )
    ) {
      alert(`${name} is already in contacts.`);
      e.target.reset();
      return;
    }

    handleFormSubmit({ name, number });

    e.target.reset();
  };

  return (
    <form
      className={s.form}
      onSubmit={handleSubmit(addNewContact)}
      autoComplete="off"
    >
      <label className={s.label} htmlFor="name">
        Name
      </label>
      <input
        className={s.input}
        name="name"
        type="text"
        ref={register({ required: true })}
      />
      {errors.name && 'This field is required!'}
      <label className={s.label} htmlFor="number">
        Number
      </label>
      <input
        className={s.input}
        name="number"
        type="text"
        ref={register({
          required: 'This field is required!',
          pattern: phoneRegExp,
        })}
      />
      {errors.number?.message}
      {errors.number?.type === 'pattern' && 'Phone number is not valid!'}
      <button className={s.btn} type="submit">
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  contacts: PropTypes.array.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = ({ items }) => ({
  contacts: items,
});

const mapDispatchToProps = dispatch => ({
  handleFormSubmit: ({ name, number }) => {
    dispatch(addContact({ name, number }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
