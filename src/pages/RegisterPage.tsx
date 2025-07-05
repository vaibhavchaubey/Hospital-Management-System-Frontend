import {
  Button,
  PasswordInput,
  SegmentedControl,
  TextInput,
} from '@mantine/core';
import { IconHeartbeat } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const form = useForm({
    initialValues: {
      type: 'PATIENT',
      email: '',
      password: '',
      confirmPassword: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (!value ? 'Password is required' : null),
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords don't match" : null,
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log(values);
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
            {...form.getInputProps('type')}
            fullWidth
            size="md"
            radius="md"
            color="pink"
            bg="none"
            className="[&_*]:!text-white border border-white"
            data={[
              { value: 'Patient', label: 'PATIENT' },
              { value: 'Doctor', label: 'DOCTOR' },
              { value: 'Admin', label: 'ADMIN' },
            ]}
          />
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
          <Button radius="md" size="md" type="submit" color="pink">
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
