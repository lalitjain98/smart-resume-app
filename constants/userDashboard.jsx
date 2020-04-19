import React from 'react';
import DescriptionSharpIcon from '@material-ui/icons/DescriptionSharp';
import AccountBoxSharpIcon from '@material-ui/icons/AccountBoxSharp';
import HomeSharpIcon from '@material-ui/icons/HomeSharp';
export const MenuBarOptions = {
  ...[
    {
      title: 'Dashboard',
      link: '/dashboard',
      iconComponent: HomeSharpIcon,
    },
    {
      title: 'Profile',
      link: '/dashboard/profile',
      iconComponent: AccountBoxSharpIcon,
    },
    {
      title: 'Manage Resume',
      link: '/dashboard/manage-resume',
      iconComponent: DescriptionSharpIcon,
    },
  ],
};

export default { MenuBarOptions };
