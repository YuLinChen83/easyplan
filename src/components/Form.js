import React from 'react';

class Form extends React.Component {
  state = {
    inputName: 'Tiffany',
    inputPreferDate: '',
    inputUnavailableDate: '',
  };

  inputName = (plandate, inputName) => (
    <label htmlFor="name">
      建立者
      <select
        id="name"
        name="name"
        value={inputName}
        onChange={e => this.setState({ inputName: e.target.value })}
      >
        {plandate.userList.map(name => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </label>
  );

  preferDate = inputPreferDate => (
    <label htmlFor="preferDate">
      優先日期
      <input
        id="preferDate"
        name="preferDate"
        type="text"
        value={inputPreferDate}
        onChange={e => this.setState({ inputPreferDate: e.target.value })}
      />
    </label>
  );

  unavailableDate = inputUnavailableDate => (
    <label htmlFor="unavailableDate">
      排除日期
      <input
        id="unavailableDate"
        name="unavailableDate"
        type="text"
        value={inputUnavailableDate}
        onChange={e => this.setState({ inputUnavailableDate: e.target.value })}
      />
    </label>
  );

  handleSubmit(e) {
    e.preventDefault();
    const { onSubmit } = this.props;
    const { inputName, inputPreferDate, inputUnavailableDate } = this.state;
    const nameInput = inputName;
    const preferDateInput = inputPreferDate;
    const unavailableDateInput = inputUnavailableDate;
    const formData = {
      name: nameInput,
      preferDate: preferDateInput,
      unavailableDate: unavailableDateInput,
    };
    onSubmit(formData);
  }

  render() {
    const { plandate } = this.props;
    const { inputName, inputPreferDate, inputUnavailableDate } = this.state;
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        {this.inputName(plandate, inputName)}
        {this.preferDate(inputPreferDate)}
        {this.unavailableDate(inputUnavailableDate)}
        <button type="submit">提交</button>
      </form>
    );
  }
}

export default Form;
