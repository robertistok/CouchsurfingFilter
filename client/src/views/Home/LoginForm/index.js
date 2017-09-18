import React from 'react';

import { Form, Icon, Input, Button, Checkbox } from 'antd';

const { Item: FormItem } = Form;

const LoginForm = props => {
  const { getFieldDecorator } = props.form;

  return (
    <Form onSubmit={() => console.log('form')}>
      <FormItem>
        {getFieldDecorator('username', {
          rules: [{ required: true, message: 'Please input your username' }]
        })(
          <Input
            prefix={<Icon type="user" style={{ fontSize: 13 }} />}
            placeholder={'Username'}
          />
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: 'Please input your password' }]
        })(
          <Input
            prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
            type="password"
            placeholder={'Password'}
          />
        )}
      </FormItem>
    </Form>
  );
};

export default Form.create()(LoginForm);
