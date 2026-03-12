import { useState, createContext, useContext, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TabsContextType {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextType | null>(null);

interface TabsProps {
  children: ReactNode;
  defaultTab?: string;
  fill?: boolean;
  pills?: boolean;
  icons?: boolean;
  centered?: boolean;
  variant?: 'primary' | 'success' | 'info' | 'warning' | 'danger';
  className?: string;
}

interface TabProps {
  id: string;
  title: string;
  icon?: string;
  children: ReactNode;
}

interface TabListProps {
  children: ReactNode;
  className?: string;
}

interface TabPanelsProps {
  children: ReactNode;
  className?: string;
}

export function Tabs({
  children,
  defaultTab,
  fill = true,
  pills = true,
  icons = false,
  centered = false,
  variant = 'primary',
  className,
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || '');

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={cn('tabs-container', className)} data-fill={fill} data-pills={pills} data-icons={icons} data-centered={centered} data-variant={variant}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabList({ children, className }: TabListProps) {
  return (
    <div className={cn('flex flex-wrap gap-2 mb-4', className)} role="tablist">
      {children}
    </div>
  );
}

export function TabButton({
  id,
  title,
  icon,
  active,
  onClick,
}: {
  id: string;
  title: string;
  icon?: string;
  active?: boolean;
  onClick?: () => void;
}) {
  const context = useContext(TabsContext);
  const isActive = active ?? context?.activeTab === id;

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (context) {
      context.setActiveTab(id);
    }
  };

  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-controls={`panel-${id}`}
      onClick={handleClick}
      className={cn(
        'px-4 py-2 rounded-full font-medium transition-colors flex items-center gap-2',
        isActive
          ? 'bg-primary-500 text-white shadow'
          : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
      )}
    >
      {icon && <i className={icon}></i>}
      {title}
    </button>
  );
}

export function TabPanels({ children, className }: TabPanelsProps) {
  return <div className={className}>{children}</div>;
}

export function TabPanel({
  id,
  children,
  className,
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  const context = useContext(TabsContext);
  const isActive = context?.activeTab === id;

  if (!isActive) return null;

  return (
    <div
      role="tabpanel"
      id={`panel-${id}`}
      aria-labelledby={id}
      className={className}
    >
      {children}
    </div>
  );
}

export function Tab({ children }: TabProps) {
  return <>{children}</>;
}
