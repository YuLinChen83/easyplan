import React from 'react';

class Form extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
    const { onSubmit } = this.props;
    const nameInput = this.nameInput.value;
    const preferDateInput = this.preferDateInput.value;
    const unavailableDateInput = this.unavailableDateInput.value;
    const formData = {
      name: nameInput,
      preferDate: preferDateInput,
      unavailableDate: unavailableDateInput,
    };
    onSubmit(formData);
  }

  render() {
    const { plandate } = this.props;
    return (
      <div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <label htmlFor="name">
            建立者
            <select
              ref={(e) => {
                this.nameInput = e;
              }}
              id="name"
              name="name"
            >
              {plandate.userList.map(name => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="preferDate">
            優先日期
            <input
              ref={(e) => {
                this.preferDateInput = e;
              }}
              id="preferDate"
              name="preferDate"
              type="text"
            />
          </label>
          <label htmlFor="unavailableDate">
            排除日期
            <input
              ref={(e) => {
                this.unavailableDateInput = e;
              }}
              id="unavailableDate"
              name="unavailableDate"
              type="text"
            />
          </label>
          <button type="submit">提交</button>
        </form>
      </div>
    );
  }
}

export default Form;
