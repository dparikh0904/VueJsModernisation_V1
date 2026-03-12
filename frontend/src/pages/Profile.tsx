import { useAuthStore } from '@/stores/authStore';
import { Card } from '@/components/ui/Card';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export function Profile() {
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <section className="relative bg-gradient-to-br from-primary-500 to-purple-600 py-32">
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="absolute opacity-10" />
          ))}
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex justify-center">
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-white shadow-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl font-bold text-primary-500">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {user.name} {user.surname}
              </h1>
              <p className="text-xl text-white">{user.email}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 -mt-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Stats Card */}
            <Card shadow className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Account Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-gray-600">Projects</span>
                  <span className="font-bold text-primary-500">12</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-gray-600">Tasks</span>
                  <span className="font-bold text-success">48</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600">Messages</span>
                  <span className="font-bold text-warning">24</span>
                </div>
              </div>
            </Card>

            {/* User Info Card */}
            <Card shadow className="lg:col-span-2 p-6">
              <h3 className="text-lg font-semibold mb-6 text-gray-700">Profile Information</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={`${user.name} ${user.surname}`}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    User ID
                  </label>
                  <input
                    type="text"
                    value={user.id}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    About Me
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about yourself..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Activity Section */}
          <div className="mt-8">
            <Card shadow className="p-6">
              <h3 className="text-lg font-semibold mb-6 text-gray-700">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { action: 'Logged in', time: '2 hours ago', icon: 'ni-key-25' },
                  { action: 'Updated profile', time: '1 day ago', icon: 'ni-single-02' },
                  { action: 'Created new project', time: '3 days ago', icon: 'ni-folder-17' },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 py-3 border-b last:border-b-0"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <i className={`ni ${activity.icon} text-primary-500`}></i>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}