import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function Login() {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    clearError();
    // Pre-fill email from registration
    const newUserEmail = Cookies.get('new_user');
    if (newUserEmail) {
      setValue('email', newUserEmail);
    }
  }, [clearError, setValue]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      navigate('/');
    } catch (err) {
      // Error is handled by store
    }
  };

  return (
    <section className="section section-shaped section-lg bg-gradient-to-br from-primary-500 to-purple-600 min-h-screen flex items-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="shape shape-default">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="opacity-10" />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <Card className="border-0 shadow-lg">
              <div className="bg-white pb-5 px-8 pt-8 rounded-t-lg">
                <div className="text-center text-gray-500 mb-3">
                  <small>Sign in with</small>
                </div>
                <div className="flex justify-center gap-3">
                  <Button variant="outline" className="flex items-center gap-2">
                    <img src="/img/icons/common/github.svg" alt="Github" className="h-4 w-4" />
                    Github
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <img src="/img/icons/common/google.svg" alt="Google" className="h-4 w-4" />
                    Google
                  </Button>
                </div>
              </div>

              <div className="px-8 py-8">
                <div className="text-center text-gray-500 mb-4">
                  <small>Or sign in with credentials</small>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <Input
                    {...register('email')}
                    type="email"
                    placeholder="Email"
                    icon="ni ni-email-83"
                    error={errors.email?.message}
                  />

                  <Input
                    {...register('password')}
                    type="password"
                    placeholder="Password"
                    icon="ni ni-lock-circle-open"
                    error={errors.password?.message}
                  />

                  {error && (
                    <div className="text-danger text-sm text-center">{error}</div>
                  )}

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>

                  <div className="text-center">
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Signing In...' : 'Sign In'}
                    </Button>
                  </div>
                </form>
              </div>
            </Card>

            <div className="flex justify-between mt-4 text-sm">
              <a href="#" className="text-white hover:text-gray-200">
                Forgot password?
              </a>
              <Link to="/register" className="text-white hover:text-gray-200">
                Create new account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}