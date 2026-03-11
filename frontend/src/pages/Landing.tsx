import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export function Landing() {
  return (
    <div>
      {/* Hero Section */}
      <section className="section-shaped bg-gradient-to-br from-primary-500 to-purple-600 py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(9)].map((_, i) => (
            <span key={i} className="absolute opacity-10" />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-white mb-6">
                Full Stack Web App
                <span className="block mt-2">Built with AppSeed</span>
              </h1>
              <p className="text-xl text-white mb-8">
                JWT token authentication. The design system comes with four pre-built pages to help
                you get started faster.
              </p>
              <div className="space-y-4">
                <p className="text-white">
                  This web app can be generated in React combined with Express, Flask or Laravel.
                  Your choice :)
                </p>
                <a
                  href="https://appseed.us/fullstack-apps-generator/vuejs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-primary-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  <i className="fa fa-rocket text-danger"></i>
                  Full Stack App Generator
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section section-lg pt-lg-0 -mt-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card hover shadow className="p-8 text-center">
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ni ni-check-bold text-white text-2xl"></i>
              </div>
              <h6 className="text-primary-500 uppercase font-semibold mb-3">Download Argon</h6>
              <p className="text-gray-600 mb-4">
                Argon is a great free UI package based on Bootstrap 4 that includes the most
                important components and features.
              </p>
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                <span className="px-3 py-1 bg-primary-100 text-primary-500 rounded-full text-sm">
                  design
                </span>
                <span className="px-3 py-1 bg-primary-100 text-primary-500 rounded-full text-sm">
                  system
                </span>
                <span className="px-3 py-1 bg-primary-100 text-primary-500 rounded-full text-sm">
                  creative
                </span>
              </div>
              <Button variant="primary">Learn more</Button>
            </Card>

            <Card hover shadow className="p-8 text-center">
              <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ni ni-istanbul text-white text-2xl"></i>
              </div>
              <h6 className="text-success uppercase font-semibold mb-3">Build Something</h6>
              <p className="text-gray-600 mb-4">
                Argon is a great free UI package based on Bootstrap 4 that includes the most
                important components and features.
              </p>
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                <span className="px-3 py-1 bg-green-100 text-success rounded-full text-sm">
                  business
                </span>
                <span className="px-3 py-1 bg-green-100 text-success rounded-full text-sm">
                  vision
                </span>
                <span className="px-3 py-1 bg-green-100 text-success rounded-full text-sm">
                  success
                </span>
              </div>
              <Button variant="success">Learn more</Button>
            </Card>

            <Card hover shadow className="p-8 text-center">
              <div className="w-16 h-16 bg-warning rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ni ni-planet text-white text-2xl"></i>
              </div>
              <h6 className="text-warning uppercase font-semibold mb-3">Prepare Launch</h6>
              <p className="text-gray-600 mb-4">
                Argon is a great free UI package based on Bootstrap 4 that includes the most
                important components and features.
              </p>
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                <span className="px-3 py-1 bg-orange-100 text-warning rounded-full text-sm">
                  marketing
                </span>
                <span className="px-3 py-1 bg-orange-100 text-warning rounded-full text-sm">
                  product
                </span>
                <span className="px-3 py-1 bg-orange-100 text-warning rounded-full text-sm">
                  launch
                </span>
              </div>
              <Button variant="warning">Learn more</Button>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-secondary py-16">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-warning to-orange-500 p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-white">
                <h3 className="text-3xl font-bold mb-3">Build this app in React</h3>
                <p className="text-lg">
                  I will be the leader of a company that ends up being worth billions of dollars,
                  because I got the answers. I understand culture.
                </p>
              </div>
              <div className="flex-shrink-0">
                <a
                  href="https://appseed.us/fullstack-apps-generator/vuejs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Build with AppSeed
                </a>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section section-lg py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card shadow className="p-8">
            <h4 className="text-2xl font-bold mb-2">Want to work with us?</h4>
            <p className="text-gray-600 mb-6">Your project is very important to us.</p>
            <form className="space-y-4">
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <i className="ni ni-user-run text-gray-400"></i>
                </div>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <i className="ni ni-email-83 text-gray-400"></i>
                </div>
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <textarea
                rows={4}
                placeholder="Type a message..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              ></textarea>
              <Button type="submit" className="w-full" size="lg">
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </section>
    </div>
  );
}