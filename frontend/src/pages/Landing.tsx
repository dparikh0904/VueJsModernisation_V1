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

      {/* Awesome Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mb-6">
                <i className="fa fa-cog text-success text-2xl"></i>
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Awesome features</h2>
              <p className="text-gray-600 mb-8">
                The kit comes with three pre-built pages to help you get started faster. You can change
                the text and images and you're good to go.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center">
                    <i className="fa fa-cog text-success"></i>
                  </div>
                  <span className="text-gray-700">Carefully crafted components</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center">
                    <i className="fa fa-file text-success"></i>
                  </div>
                  <span className="text-gray-700">Amazing page examples</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center">
                    <i className="fa fa-smile text-success"></i>
                  </div>
                  <span className="text-gray-700">Super friendly support team</span>
                </div>
              </div>
            </div>
            <div className="relative">
              {/* Stacked cards illustration */}
              <div className="relative w-full h-80">
                <div className="absolute top-0 right-0 w-64 h-40 bg-warning rounded-lg shadow-lg transform rotate-3 z-10">
                  <div className="p-4">
                    <div className="flex gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-white/30 rounded w-3/4"></div>
                      <div className="h-2 bg-white/30 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-12 right-12 w-64 h-48 bg-primary-500 rounded-lg shadow-lg z-20">
                  <div className="p-4">
                    <div className="flex gap-2 mb-3">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-white/30 rounded w-full"></div>
                      <div className="h-2 bg-white/30 rounded w-3/4"></div>
                      <div className="h-2 bg-white/30 rounded w-1/2"></div>
                      <div className="flex gap-2 mt-4">
                        <div className="w-8 h-8 rounded-full bg-primary-400"></div>
                        <div className="w-8 h-8 rounded-full bg-success"></div>
                        <div className="w-8 h-8 rounded-full bg-info"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-24 right-24 w-64 h-44 bg-white rounded-lg shadow-xl border z-30">
                  <div className="p-4">
                    <div className="flex gap-2 mb-3">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-200 rounded w-full"></div>
                      <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design System / Our Customers Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=600&h=400&fit=crop"
                  alt="Design System"
                  className="w-full h-80 object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-gray-800 text-white p-6 rounded-lg max-w-xs">
                <h4 className="text-xl font-bold mb-2">Design System</h4>
                <p className="text-gray-300 text-sm">
                  The Arctic Ocean freezes every winter and much of the sea-ice then thaws every summer,
                  and that process will continue whatever happens.
                </p>
              </div>
            </div>
            <div>
              <div className="w-16 h-16 bg-warning/20 rounded-full flex items-center justify-center mb-6">
                <i className="fa fa-wrench text-warning text-2xl"></i>
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Our customers</h2>
              <p className="text-gray-600 mb-6">
                Don't let your uses guess by attaching tooltips and popovers to any element. Just make
                sure you enable them first via JavaScript.
              </p>
              <p className="text-gray-600 mb-4">
                The kit comes with three pre-built pages to help you get started faster. You can change
                the text and images and you're good to go.
              </p>
              <p className="text-gray-600 mb-6">
                The kit comes with three pre-built pages to help you get started faster. You can change
                the text and images and you're good to go.
              </p>
              <a href="#" className="text-warning font-semibold hover:underline">
                Build this app in React →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Interface Section */}
      <section className="py-20 bg-gradient-to-r from-warning to-orange-400 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-20 right-40 w-48 h-48 bg-white/10 rounded-full"></div>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center">
                  <i className="fa fa-th text-white text-xl"></i>
                </div>
                <h2 className="text-4xl font-bold text-white">Modern Interface</h2>
              </div>
              <p className="text-white/80 mb-8">
                The Arctic Ocean freezes every winter and much of the sea-ice then thaws every summer,
                and that process will continue whatever happens.
              </p>

              {/* Feature cards */}
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="fa fa-headphones text-success"></i>
                    </div>
                    <div>
                      <h5 className="text-lg font-semibold text-success mb-2">Awesome Support</h5>
                      <p className="text-gray-600 text-sm">
                        The Arctic Ocean freezes every winter and much of the sea-ice then thaws every
                        summer, and that process will continue whatever happens.
                      </p>
                      <a href="#" className="text-success text-sm font-semibold hover:underline mt-2 inline-block">
                        Learn more
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-warning/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="fa fa-clock text-warning"></i>
                    </div>
                    <div>
                      <h5 className="text-lg font-semibold text-warning mb-2">Modular Components</h5>
                      <p className="text-gray-600 text-sm">
                        The Arctic Ocean freezes every winter and much of the sea-ice then thaws every
                        summer, and that process will continue whatever happens.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              {/* Illustration - person at desk */}
              <div className="relative">
                <img
                  src="https://raw.githubusercontent.com/creativetimofficial/argon-design-system/master/assets/img/ill/ill-2.svg"
                  alt="Modern Interface"
                  className="w-full max-w-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">The amazing Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              According to the National Oceanic and Atmospheric Administration, Ted, Scambos, NSIDClead
              scentist, puts the potentially record maximum.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
                  alt="Ryan Tompson"
                  className="w-full h-full object-cover"
                />
              </div>
              <h5 className="text-lg font-semibold text-gray-800">Ryan Tompson</h5>
              <p className="text-gray-500 text-sm mb-3">Web Developer</p>
              <div className="flex justify-center gap-2">
                <a href="#" className="w-8 h-8 bg-info rounded-full flex items-center justify-center text-white hover:opacity-80">
                  <i className="fab fa-twitter text-sm"></i>
                </a>
                <a href="#" className="w-8 h-8 bg-danger rounded-full flex items-center justify-center text-white hover:opacity-80">
                  <i className="fab fa-facebook text-sm"></i>
                </a>
                <a href="#" className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white hover:opacity-80">
                  <i className="fab fa-dribbble text-sm"></i>
                </a>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face"
                  alt="Romina Hadid"
                  className="w-full h-full object-cover"
                />
              </div>
              <h5 className="text-lg font-semibold text-gray-800">Romina Hadid</h5>
              <p className="text-gray-500 text-sm mb-3">Marketing Strategist</p>
              <div className="flex justify-center gap-2">
                <a href="#" className="w-8 h-8 bg-info rounded-full flex items-center justify-center text-white hover:opacity-80">
                  <i className="fab fa-twitter text-sm"></i>
                </a>
                <a href="#" className="w-8 h-8 bg-danger rounded-full flex items-center justify-center text-white hover:opacity-80">
                  <i className="fab fa-facebook text-sm"></i>
                </a>
                <a href="#" className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white hover:opacity-80">
                  <i className="fab fa-dribbble text-sm"></i>
                </a>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&crop=face"
                  alt="Alexander Smith"
                  className="w-full h-full object-cover"
                />
              </div>
              <h5 className="text-lg font-semibold text-gray-800">Alexander Smith</h5>
              <p className="text-gray-500 text-sm mb-3">UI/UX Designer</p>
              <div className="flex justify-center gap-2">
                <a href="#" className="w-8 h-8 bg-info rounded-full flex items-center justify-center text-white hover:opacity-80">
                  <i className="fab fa-twitter text-sm"></i>
                </a>
                <a href="#" className="w-8 h-8 bg-danger rounded-full flex items-center justify-center text-white hover:opacity-80">
                  <i className="fab fa-facebook text-sm"></i>
                </a>
                <a href="#" className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white hover:opacity-80">
                  <i className="fab fa-dribbble text-sm"></i>
                </a>
              </div>
            </div>

            {/* Team Member 4 */}
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face"
                  alt="John Doe"
                  className="w-full h-full object-cover"
                />
              </div>
              <h5 className="text-lg font-semibold text-gray-800">John Doe</h5>
              <p className="text-gray-500 text-sm mb-3">Founder and CEO</p>
              <div className="flex justify-center gap-2">
                <a href="#" className="w-8 h-8 bg-info rounded-full flex items-center justify-center text-white hover:opacity-80">
                  <i className="fab fa-twitter text-sm"></i>
                </a>
                <a href="#" className="w-8 h-8 bg-danger rounded-full flex items-center justify-center text-white hover:opacity-80">
                  <i className="fab fa-facebook text-sm"></i>
                </a>
                <a href="#" className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white hover:opacity-80">
                  <i className="fab fa-dribbble text-sm"></i>
                </a>
              </div>
            </div>
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