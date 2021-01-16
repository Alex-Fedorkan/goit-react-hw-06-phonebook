import { connect } from 'react-redux';
import { changeFilter } from '../../redux/contacts/contacts-actions';
import PropTypes from 'prop-types';

const Filter = ({ value, onChange }) => {
  return (
    <label>
      Find contacts by name
      <input type="text" value={value} onChange={onChange} />
    </label>
  );
};

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  value: state.filter,
});

const mapDispatchToProps = dispatch => ({
  onChange: event => {
    dispatch(changeFilter(event.target.value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
