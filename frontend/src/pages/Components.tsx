import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';
import { Badge } from '@/components/ui/Badge';
import { Checkbox } from '@/components/ui/Checkbox';
import { Radio } from '@/components/ui/Radio';
import { Switch } from '@/components/ui/Switch';
import { Progress } from '@/components/ui/Progress';
import { Pagination } from '@/components/ui/Pagination';
import { Tabs, TabList, TabButton, TabPanels, TabPanel } from '@/components/ui/Tabs';
import { Modal } from '@/components/ui/Modal';
import { Navbar, NavItem, NavIcon } from '@/components/ui/Navbar';
import { Slider } from '@/components/ui/Slider';
import { Dropdown, DropdownItem, DropdownDivider } from '@/components/ui/Dropdown';
import { Tooltip } from '@/components/ui/Tooltip';

export function Components() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('tab1');
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);
  const [checkboxChecked, setCheckboxChecked] = useState(true);
  const [switchOn, setSwitchOn] = useState(true);

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Components Showcase</h1>
          <p className="text-xl text-gray-600">
            Explore the beautiful components of Argon Design System
          </p>
        </div>

        {/* Alerts */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Alerts</h2>
          <div className="space-y-4">
            <Alert variant="success">This is a success alert — check it out!</Alert>
            <Alert variant="info">This is an info alert — check it out!</Alert>
            <Alert variant="warning">This is a warning alert — check it out!</Alert>
            <Alert variant="danger">This is a danger alert — check it out!</Alert>
          </div>
        </section>

        {/* Buttons */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Buttons</h2>
          <Card shadow className="p-8">
            <h3 className="text-lg font-semibold mb-4 text-success">Pick your color</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="success">Success</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="warning">Warning</Button>
              <Button variant="outline">Outline</Button>
            </div>

            <h3 className="text-lg font-semibold mb-4 mt-8 text-success">Pick your size</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="md">Regular</Button>
              <Button variant="primary" size="lg">Large Button</Button>
            </div>

            <h3 className="text-lg font-semibold mb-4 mt-8 text-success">Outline</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline">Outline Primary</Button>
            </div>

            <h3 className="text-lg font-semibold mb-4 mt-8 text-success">Loading State</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" isLoading>Loading Button</Button>
            </div>
          </Card>
        </section>

        {/* Inputs */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Inputs</h2>
          <Card shadow className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input type="text" placeholder="Default Input" label="Default Input" />
              <Input type="email" placeholder="With Icon" label="Email with Icon" icon="ni ni-email-83" />
              <Input type="password" placeholder="Password" label="Password" icon="ni ni-lock-circle-open" />
              <Input type="text" placeholder="Error State" label="Error Input" error="This field is required" />
            </div>
          </Card>
        </section>

        {/* Custom Controls */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Custom Controls</h2>
          <Card shadow className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-sm font-semibold uppercase mb-4">Checkboxes</h3>
                <div className="space-y-3">
                  <Checkbox label="Unchecked" />
                  <Checkbox label="Checked" checked={checkboxChecked} onChange={(e) => setCheckboxChecked(e.target.checked)} />
                  <Checkbox label="Disabled" disabled />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase mb-4">Radios</h3>
                <div className="space-y-3">
                  <Radio name="radio-group" label="Option 1" defaultChecked />
                  <Radio name="radio-group" label="Option 2" />
                  <Radio name="radio-group" label="Disabled" disabled />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase mb-4">Toggle Buttons</h3>
                <div className="space-y-3">
                  <Switch />
                  <Switch checked={switchOn} onChange={(e) => setSwitchOn(e.target.checked)} />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase mb-4">Sliders</h3>
                <Slider value={sliderValue} onChange={(e) => setSliderValue(Number(e.target.value))} />
              </div>
            </div>
          </Card>
        </section>

        {/* Navigation Bars */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Navigation</h2>
          <div className="space-y-4">
            <Navbar variant="default" title="DEFAULT COLOR">
              <NavIcon icon="ni ni-favourite-28" />
              <NavIcon icon="ni ni-notification-70" />
              <NavIcon icon="ni ni-settings-gear-65" />
            </Navbar>
            <Navbar variant="primary" title="MENU">
              <NavItem>Discover</NavItem>
              <NavItem>Profile</NavItem>
              <NavItem>Settings</NavItem>
            </Navbar>
            <Navbar variant="success" title="MENU">
              <NavIcon icon="ni ni-favourite-28" />
              <NavIcon icon="ni ni-notification-70" />
              <NavIcon icon="ni ni-settings-gear-65" />
            </Navbar>
            <Navbar variant="danger" title="MENU">
              <NavIcon icon="fa fa-facebook" />
              <NavIcon icon="fa fa-twitter" />
              <NavIcon icon="fa fa-google-plus" />
              <NavIcon icon="fa fa-instagram" />
            </Navbar>
            <Navbar variant="warning" title="MENU">
              <NavIcon icon="fa fa-facebook" />
              <NavIcon icon="fa fa-twitter" />
              <NavIcon icon="fa fa-pinterest" />
            </Navbar>
            <Navbar variant="info" title="MENU">
              <NavItem icon="fa fa-facebook">Facebook</NavItem>
              <NavItem icon="fa fa-twitter">Twitter</NavItem>
              <NavItem icon="fa fa-instagram">Instagram</NavItem>
            </Navbar>
          </div>
        </section>

        {/* Tabs */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Tabs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold uppercase mb-4">With Icons</h3>
              <Card shadow className="p-6">
                <Tabs defaultTab="tab1">
                  <TabList>
                    <TabButton id="tab1" title="Home" icon="ni ni-cloud-upload-96" active={activeTab === 'tab1'} onClick={() => setActiveTab('tab1')} />
                    <TabButton id="tab2" title="Profile" icon="ni ni-bell-55" active={activeTab === 'tab2'} onClick={() => setActiveTab('tab2')} />
                    <TabButton id="tab3" title="Messages" icon="ni ni-calendar-grid-58" active={activeTab === 'tab3'} onClick={() => setActiveTab('tab3')} />
                  </TabList>
                  <TabPanels>
                    {activeTab === 'tab1' && (
                      <p className="text-gray-600">Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse.</p>
                    )}
                    {activeTab === 'tab2' && (
                      <p className="text-gray-600">Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone.</p>
                    )}
                    {activeTab === 'tab3' && (
                      <p className="text-gray-600">Raw denim you probably haven't heard of them jean shorts Austin. Mustache cliche tempor, williamsburg carles vegan helvetica.</p>
                    )}
                  </TabPanels>
                </Tabs>
              </Card>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase mb-4">With Text</h3>
              <Card shadow className="p-6">
                <Tabs defaultTab="text1">
                  <TabList>
                    <TabButton id="text1" title="Home" active={activeTab === 'text1'} onClick={() => setActiveTab('text1')} />
                    <TabButton id="text2" title="Profile" active={activeTab === 'text2'} onClick={() => setActiveTab('text2')} />
                    <TabButton id="text3" title="Messages" active={activeTab === 'text3'} onClick={() => setActiveTab('text3')} />
                  </TabList>
                </Tabs>
              </Card>
            </div>
          </div>
        </section>

        {/* Progress Bars */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Progress Bars</h2>
          <Card shadow className="p-8">
            <div className="space-y-6">
              <Progress value={40} label="Task Completed" />
              <Progress value={60} label="Task Completed" variant="success" />
              <Progress value={80} variant="danger" />
            </div>
          </Card>
        </section>

        {/* Pagination */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Pagination</h2>
          <Card shadow className="p-8">
            <div className="space-y-6">
              <Pagination currentPage={currentPage} totalPages={5} onPageChange={setCurrentPage} />
              <Pagination currentPage={currentPage} totalPages={5} onPageChange={setCurrentPage} size="lg" />
            </div>
          </Card>
        </section>

        {/* Modals */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Modals</h2>
          <Card shadow className="p-8">
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" onClick={() => setShowModal1(true)}>Default</Button>
              <Button variant="warning" onClick={() => setShowModal2(true)}>Notification</Button>
              <Button variant="secondary" onClick={() => setShowModal3(true)}>Form</Button>
            </div>

            <Modal show={showModal1} onClose={() => setShowModal1(false)} title="Type your modal title">
              <p className="text-gray-600">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
            </Modal>

            <Modal show={showModal2} onClose={() => setShowModal2(false)} title="Your attention is required" gradient="danger">
              <div className="text-center py-4">
                <i className="ni ni-bell-55 text-5xl mb-4"></i>
                <h4 className="text-xl font-bold mb-2">You should read this!</h4>
                <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
              </div>
            </Modal>

            <Modal show={showModal3} onClose={() => setShowModal3(false)} title="Sign in" size="sm">
              <div className="space-y-4">
                <Input type="email" placeholder="Email" icon="ni ni-email-83" />
                <Input type="password" placeholder="Password" icon="ni ni-lock-circle-open" />
                <Checkbox label="Remember me" />
                <Button variant="primary" className="w-full">Sign In</Button>
              </div>
            </Modal>
          </Card>
        </section>

        {/* Tooltips */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Tooltips</h2>
          <Card shadow className="p-8">
            <div className="flex flex-wrap gap-8 justify-center">
              <Tooltip content="Tooltip on top" position="top">
                <Button variant="primary">Top</Button>
              </Tooltip>
              <Tooltip content="Tooltip on right" position="right">
                <Button variant="primary">Right</Button>
              </Tooltip>
              <Tooltip content="Tooltip on bottom" position="bottom">
                <Button variant="primary">Bottom</Button>
              </Tooltip>
              <Tooltip content="Tooltip on left" position="left">
                <Button variant="primary">Left</Button>
              </Tooltip>
            </div>
          </Card>
        </section>

        {/* Dropdowns */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Dropdowns</h2>
          <Card shadow className="p-8">
            <div className="flex gap-4">
              <Dropdown trigger={<Button variant="primary">Dropdown</Button>}>
                <DropdownItem>Action</DropdownItem>
                <DropdownItem>Another action</DropdownItem>
                <DropdownDivider />
                <DropdownItem>Something else here</DropdownItem>
              </Dropdown>
            </div>
          </Card>
        </section>

        {/* Cards */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card shadow className="p-6">
              <h3 className="text-xl font-bold mb-2">Simple Card</h3>
              <p className="text-gray-600">This is a simple card component with shadow and padding.</p>
            </Card>

            <Card hover shadow className="p-6">
              <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center mb-4">
                <i className="ni ni-check-bold text-white"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Hover Card</h3>
              <p className="text-gray-600">This card has a hover effect that lifts it up slightly.</p>
            </Card>

            <Card shadow className="overflow-hidden">
              <img src="/img/theme/promo-1.png" alt="Card" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Image Card</h3>
                <p className="text-gray-600">Cards can contain images and other content.</p>
              </div>
            </Card>
          </div>
        </section>

        {/* Badges */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Badges</h2>
          <Card shadow className="p-8">
            <div className="flex flex-wrap gap-3">
              <Badge variant="primary" rounded>Primary</Badge>
              <Badge variant="success" rounded>Success</Badge>
              <Badge variant="danger" rounded>Danger</Badge>
              <Badge variant="warning" rounded>Warning</Badge>
              <Badge variant="info" rounded>Info</Badge>
              <Badge variant="default" rounded>Default</Badge>
            </div>
          </Card>
        </section>

        {/* Typography */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Typography</h2>
          <Card shadow className="p-8">
            <h3 className="text-lg font-semibold mb-4 text-success">Headings</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="w-24 text-sm text-gray-500">Heading 1</span>
                <h1 className="text-5xl font-bold">Argon Design System</h1>
              </div>
              <div className="flex items-center">
                <span className="w-24 text-sm text-gray-500">Heading 2</span>
                <h2 className="text-4xl font-bold">Argon Design System</h2>
              </div>
              <div className="flex items-center">
                <span className="w-24 text-sm text-gray-500">Heading 3</span>
                <h3 className="text-3xl font-bold">Argon Design System</h3>
              </div>
              <div className="flex items-center">
                <span className="w-24 text-sm text-gray-500">Heading 4</span>
                <h4 className="text-2xl font-bold">Argon Design System</h4>
              </div>
              <div className="flex items-center">
                <span className="w-24 text-sm text-gray-500">Heading 5</span>
                <h5 className="text-xl font-bold">Argon Design System</h5>
              </div>
              <div className="flex items-center">
                <span className="w-24 text-sm text-gray-500">Heading 6</span>
                <h6 className="text-lg font-bold">Argon Design System</h6>
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-4 mt-8 text-success">Paragraphs</h3>
            <p className="text-base mb-4">I will be the leader of a company that ends up being worth billions of dollars, because I got the answers.</p>
            <p className="text-xl text-gray-500 mb-4">Lead text: I will be the leader of a company that ends up being worth billions of dollars.</p>
            <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante."
              <footer className="text-sm mt-2">— Someone famous</footer>
            </blockquote>

            <h3 className="text-lg font-semibold mb-4 mt-8 text-success">Text Colors</h3>
            <div className="space-y-2">
              <p className="text-gray-500">Muted text</p>
              <p className="text-primary-500">Primary text</p>
              <p className="text-info">Info text</p>
              <p className="text-success">Success text</p>
              <p className="text-warning">Warning text</p>
              <p className="text-danger">Danger text</p>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}