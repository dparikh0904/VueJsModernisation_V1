import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

export function Components() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Components Showcase</h1>
          <p className="text-xl text-gray-600">
            Explore the beautiful components of Argon Design System
          </p>
        </div>

        {/* Buttons */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Buttons</h2>
          <Card shadow className="p-8">
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="success">Success</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="warning">Warning</Button>
              <Button variant="outline">Outline</Button>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <Button variant="primary" size="sm">
                Small
              </Button>
              <Button variant="primary" size="md">
                Medium
              </Button>
              <Button variant="primary" size="lg">
                Large
              </Button>
            </div>

            <div className="mt-6">
              <Button variant="primary" isLoading>
                Loading Button
              </Button>
            </div>
          </Card>
        </section>

        {/* Inputs */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Inputs</h2>
          <Card shadow className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                type="text"
                placeholder="Default Input"
                label="Default Input"
              />
              <Input
                type="email"
                placeholder="With Icon"
                label="Email with Icon"
                icon="ni ni-email-83"
              />
              <Input
                type="password"
                placeholder="Password"
                label="Password"
                icon="ni ni-lock-circle-open"
              />
              <Input
                type="text"
                placeholder="Error State"
                label="Error Input"
                error="This field is required"
              />
            </div>
          </Card>
        </section>

        {/* Cards */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card shadow className="p-6">
              <h3 className="text-xl font-bold mb-2">Simple Card</h3>
              <p className="text-gray-600">
                This is a simple card component with shadow and padding.
              </p>
            </Card>

            <Card hover shadow className="p-6">
              <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center mb-4">
                <i className="ni ni-check-bold text-white"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Hover Card</h3>
              <p className="text-gray-600">
                This card has a hover effect that lifts it up slightly.
              </p>
            </Card>

            <Card shadow className="overflow-hidden">
              <img
                src="/img/theme/promo-1.png"
                alt="Card"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Image Card</h3>
                <p className="text-gray-600">
                  Cards can contain images and other content.
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* Typography */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Typography</h2>
          <Card shadow className="p-8">
            <h1 className="text-5xl font-bold mb-4">Heading 1</h1>
            <h2 className="text-4xl font-bold mb-4">Heading 2</h2>
            <h3 className="text-3xl font-bold mb-4">Heading 3</h3>
            <h4 className="text-2xl font-bold mb-4">Heading 4</h4>
            <h5 className="text-xl font-bold mb-4">Heading 5</h5>
            <h6 className="text-lg font-bold mb-4">Heading 6</h6>
            <p className="text-base mb-4">
              This is a paragraph of regular text. It demonstrates the default font and line
              height settings.
            </p>
            <p className="text-gray-600 italic">
              This is italicized text with a gray color for secondary content.
            </p>
          </Card>
        </section>

        {/* Badges */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Badges</h2>
          <Card shadow className="p-8">
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-primary-500 text-white rounded-full text-sm font-semibold">
                Primary
              </span>
              <span className="px-3 py-1 bg-success text-white rounded-full text-sm font-semibold">
                Success
              </span>
              <span className="px-3 py-1 bg-danger text-white rounded-full text-sm font-semibold">
                Danger
              </span>
              <span className="px-3 py-1 bg-warning text-white rounded-full text-sm font-semibold">
                Warning
              </span>
              <span className="px-3 py-1 bg-info text-white rounded-full text-sm font-semibold">
                Info
              </span>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}