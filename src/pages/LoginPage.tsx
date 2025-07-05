import { Button, PasswordInput, TextInput } from '@mantine/core';
import { IconHeartbeat } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (!value ? 'Password is required' : null),
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
            Login
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
          <Button radius="md" size="md" type="submit" color="pink">
            Login
          </Button>
          <div className="text-neutral-100 text-sm self-center">
            Don't have an account?{' '}
            <Link to={'/register'} className="hover:underline">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
