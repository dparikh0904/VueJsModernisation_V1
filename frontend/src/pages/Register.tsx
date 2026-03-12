import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { useEffect } from 'react';

const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export function Register() {
  const navigate = useNavigate();
  const { register: registerUser, isLoading, error, clearError } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    clearError();
  }, [clearError]);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data.name, data.email, data.password);
      navigate('/login');
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
                  <small>Sign up with</small>
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
                  <small>Or sign up with credentials</small>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <Input
                    {...register('name')}
                    type="text"
                    placeholder="Name"
                    icon="ni ni-hat-3"
                    error={errors.name?.message}
                  />

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

                  <div className="text-sm text-gray-500 italic">
                    password strength: <span className="text-success font-bold">strong</span>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="policy"
                      className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
                      required
                    />
                    <label htmlFor="policy" className="ml-2 text-sm text-gray-700">
                      I agree with the <a href="#" className="text-primary-500">Privacy Policy</a>
                    </label>
                  </div>

                  <div className="text-center">
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Creating Account...' : 'Create Account'}
                    </Button>
                  </div>
                </form>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}