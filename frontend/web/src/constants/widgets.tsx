import { MessageSquare, Home, User } from 'lucide-react';

const widgetsData = [
  {
    icon: MessageSquare,
    title: 'Messages',
    figure: 128,
    link: '/dashboard/messages',
    linkText: 'View all messages',
  },
  {
    icon: Home,
    title: 'Properties',
    figure: 45,
    link: '/dashboard/properties',
    linkText: 'See all properties',
  },
  {
    icon: User,
    title: 'Users',
    figure: 340,
    link: '/dashboard/users',
    linkText: 'See all users',
  },
];

export default widgetsData;