import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts } from '../../redux/contacts/contacts-selectors';
import { addContact } from '../../redux/contacts/contacts-actions';
import s from './ContactForm.module.css';

const ContactForm = () => {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

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

    dispatch(addContact({ name, number }));
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
      {errors.name && <p className={s.text}>This field is required!</p>}
      <label className={s.label} htmlFor="number">
        Number
      </label>
      <input
        className={s.input}
        name="number"
        type="text"
        ref={register({
          required: true,
          pattern: phoneRegExp,
        })}
      />
      {errors.number && <p className={s.text}>This field is required!</p>}
      {errors.number?.type === 'pattern' && (
        <p className={s.text}>Phone number is not valid!</p>
      )}
      <button className={s.btn} type="submit">
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;
