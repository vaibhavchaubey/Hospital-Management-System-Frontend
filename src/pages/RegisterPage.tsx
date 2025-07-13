import {
  Button,
  PasswordInput,
  SegmentedControl,
  TextInput,
} from '@mantine/core';
import { IconHeartbeat } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { Link, useNavigate } from 'react-router-dom';
import type { RegisterUserInput } from '../types';
import { registerUser } from '../service/UserService';
import {
  errorNotification,
  successNotification,
} from '../Utility/NotificationUtil';
import { useState } from 'react';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm<RegisterUserInput>({
    initialValues: {
      name: '',
      role: 'PATIENT',
      email: '',
      password: '',
      confirmPassword: '',
    },

    validate: {
      name: (value) => (value ? null : 'Name is required'),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),

      password: (value) => {
        if (!value) return 'Password is required';
        const passwordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,15}$/;
        return passwordRegex.test(value)
          ? null
          : 'Password must be 8–15 characters long and include at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character';
      },

      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords don't match" : null,
    },
  });

  const handleSubmit = async (values: RegisterUserInput) => {
    setLoading(true);
    try {
      await registerUser(values);
      successNotification('Registration Successful.');
      navigate('/login', { replace: true });
    } catch (error: any) {
      errorNotification(
        error?.response?.data?.errorMessage || 'Registration failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ background: 'url("/bg.jpg")' }}
      className="h-screen w-screen !bg-cover !bg-center !bg-no-repeat flex flex-col items-center justify-center"
    >
      <div className="py-3 text-pink-500 flex gap-1 items-center">
        <IconHeartbeat size={40} stroke={2.5} />
        <span className="font-family-heading font-semibold text-4xl ">
          Pulse
        </span>
      </div>
      <div className="w-[450px] backdrop-blur-md p-10 py-8 rounded-lg">
        <form
          onSubmit={form.onSubmit(handleSubmit)}
          className="flex flex-col gap-5 [&_input]:!placeholder-neutral-100 [&_.mantine-Input-input]:!border-white [&_.mantine-Input-input]:!border [&_input]:!p-2 [&_svg]:!text-white [&_input]:!text-white"
        >
          <div className="self-center font-medium font-family-heading text-white text-xl">
            Register
          </div>
          <SegmentedControl
            {...form.getInputProps('role')}
            fullWidth
            size="md"
            radius="md"
            color="pink"
            bg="none"
            className="[&_*]:!text-white border border-white"
            data={[
              { value: 'PATIENT', label: 'Patient' },
              { value: 'DOCTOR', label: 'Doctor' },
              { value: 'ADMIN', label: 'Admin' },
            ]}
          />
          <div className="focus-within:[&_.mantine-Input-input]:!border-pink-400">
            <TextInput
              className="transition duration-300"
              variant="unstyled"
              size="md"
              radius="md"
              placeholder="Name"
              {...form.getInputProps('name')}
            />
          </div>
          <div className="focus-within:[&_.mantine-Input-input]:!border-pink-400">
            <TextInput
              className="transition duration-300"
              variant="unstyled"
              size="md"
              radius="md"
              placeholder="Email"
              {...form.getInputProps('email')}
            />
          </div>
          <div className="focus-within:[&_.mantine-Input-input]:!border-pink-400">
            <PasswordInput
              className="transition duration-300"
              variant="unstyled"
              size="md"
              radius="md"
              placeholder="Password"
              {...form.getInputProps('password')}
            />
          </div>
          <div className="focus-within:[&_.mantine-Input-input]:!border-pink-400">
            <PasswordInput
              className="transition duration-300"
              variant="unstyled"
              size="md"
              radius="md"
              placeholder="Confirm Password"
              {...form.getInputProps('confirmPassword')}
            />
          </div>
          <Button
            radius="md"
            size="md"
            type="submit"
            color="pink"
            loading={loading}
            disabled={loading}
          >
            Register
          </Button>
          <div className="text-neutral-100 text-sm self-center">
            Have an account?{' '}
            <Link to={'/login'} className="hover:underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
