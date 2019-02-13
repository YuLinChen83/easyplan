import { connect } from 'react-redux';
import { submitData } from '../actions';
import Form from '../components/Form';

const mapStateToProps = state => ({
  plandate: state.plandate,
});

const mapDispatchToProps = dispatch => ({
  onSubmit: inputData => dispatch(submitData(inputData)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form);
