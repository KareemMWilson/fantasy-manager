import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import InputField from '../components/Form/Fields/Input.Field';
import { emailSchema, passwordSchema } from '../utils/validations';
import Button from '@/components/Button';
import { GiOpenGate } from 'react-icons/gi';
import { useAppDispatch } from '../hooks/redux';
import { setCredentials } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { Form } from '@/components/Form';
import { toaster } from '@/components/Toaster';
import { useAuthMutation } from '@/store/services/auth.Service';

const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

type LoginFormData = z.infer<typeof loginSchema>;

export const Auth = () => {
  const navigate = useNavigate();
  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });
  const [login, { isLoading }] = useAuthMutation();
  const dispatch = useAppDispatch();

  const handleLogin = async (data: LoginFormData) => {
    try {
      const {data: userData, success} = await login(data).unwrap();
      if (userData && success) {
        dispatch(setCredentials(userData));
        
        toaster.success({
          title: 'Logged In',
          description: 'Welcome In Fantasy World',
        })
        navigate('/home', {state: {isNewUser: userData.isNewUser}});
      } else {
        toaster.error({
          title: 'Opps',
          description: 'Something Went Wrong',
        })
      }
    } catch (err) {
      console.error('Failed to login:', err);
      toaster.error({
        title: 'Opps',
        description: 'Something Went Wrong',
      })
    }
  };

  return (
      <Form onSubmit={handleLogin} methods={methods}>
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
      </Form>
  );
};

export default Auth; 