import React from 'react';

class Form extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
    const { onSubmit } = this.props;
    const formData = {};
    for (const field in this.refs) {
      formData[field] = this.refs[field].value || '';
    }
    // console.log('-->', formData);
    onSubmit(formData);
  }

  render() {
    const { plandate } = this.props;
    return (
      <div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <label htmlFor="name">
            建立者
            <select ref="name" id="name" name="name">
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
              ref="preferDate"
              id="preferDate"
              name="preferDate"
              type="text"
            />
          </label>
          <label htmlFor="unavailableDate">
            排除日期
            <input
              ref="unavailableDate"
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
