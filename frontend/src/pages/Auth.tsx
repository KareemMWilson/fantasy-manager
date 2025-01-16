import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import InputField from '../components/Form/Fields/Input.Field';
import { emailSchema, passwordSchema } from '../utils/validations';
import Button from '@/components/Button';
import { GiOpenGate } from 'react-icons/gi';

const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

type LoginFormData = z.infer<typeof loginSchema>;

const Auth: React.FC = () => {
  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <InputField
          name="email"
          label="Email"
          type="email"
          required
          placeholder="Enter your email"
        />
        
        <InputField
          name="password"
          label="Password"
          type="password"
          required
          placeholder="Enter your password"
        />

        <Button type="submit" iconRight={<GiOpenGate />} primary>Login</Button>
      </form>
    </FormProvider>
  );
};

export default Auth; 