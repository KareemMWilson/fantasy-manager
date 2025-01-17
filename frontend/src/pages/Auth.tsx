import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import InputField from '../components/Form/Fields/Input.Field';
import { emailSchema, passwordSchema } from '../utils/validations';
import Button from '@/components/Button';
import { GiOpenGate } from 'react-icons/gi';
import { useLoginMutation } from '../store/services/authService';
import { useAppDispatch } from '../hooks/redux';
import { setCredentials } from '../store/slices/authSlice';

const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

type LoginFormData = z.infer<typeof loginSchema>;

export const Auth = () => {
  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const handleLogin = async (data: LoginFormData) => {
    try {
      const result = await login(data).unwrap();
      dispatch(setCredentials(result));
    } catch (err) {
      console.error('Failed to login:', err);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleLogin)}>
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

        <Button type="submit" isLoading={isLoading} iconRight={<GiOpenGate />} primary>Login</Button>
      </form>
    </FormProvider>
  );
};

export default Auth; 