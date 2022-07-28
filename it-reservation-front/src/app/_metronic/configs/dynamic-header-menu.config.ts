export const DynamicHeaderMenuConfig = {
  items: [
    {
      title: 'Dashboards',
      root: true,
      alignment: 'left',
      page: '/dashboard',
      translate: 'MENU.DASHBOARD',
    },
    {
      title: 'NgBootstrap',
      bullet: 'dot',
      icon: 'flaticon-web',
      page: '/ngbootstrap',
      mega: true,
      submenu: [
        {
          title: 'A ... C',
          submenu: [{
            title: 'Accordion',
            page: '/ngbootstrap/accordion'
          },
          {
            title: 'Alert',
            page: '/ngbootstrap/alert'
          },
          {
            title: 'Buttons',
            page: '/ngbootstrap/buttons'
          },
          {
            title: 'Carousel',
            page: '/ngbootstrap/carousel'
          }]
        },
        {
          title: 'C ... M',
          submenu: [{
            title: 'Collapse',
            page: '/ngbootstrap/collapse'
          },
          {
            title: 'Datepicker',
            page: '/ngbootstrap/datepicker'
          },
          {
            title: 'Dropdown',
            page: '/ngbootstrap/dropdown'
          },
          {
            title: 'Modal',
            page: '/ngbootstrap/modal'
          }]
        },
        {
          title: 'P ... R',
          submenu: [{
            title: 'Pagination',
            page: '/ngbootstrap/pagination'
          },
          {
            title: 'Popover',
            page: '/ngbootstrap/popover'
          },
          {
            title: 'Progressbar',
            page: '/ngbootstrap/progressbar'
          },
          {
            title: 'Rating',
            page: '/ngbootstrap/rating'
          }]
        },
        {
          title: 'T ... Z',
          submenu: [
            {
              title: 'Timepicker',
              page: '/ngbootstrap/timepicker'
            },
            {
              title: 'Tooltips',
              page: '/ngbootstrap/tooltip'
            },
            {
              title: 'Typehead',
              page: '/ngbootstrap/typehead'
            }
          ]
        }
      ]
    },
    {
      title: 'eCommerce',
      root: true,
      alignment: 'left',
      toggle: 'click',
      page: '',
      submenu: [
        {
          title: 'Customers',
          bullet: 'dot',
          page: '/ecommerce/customers'
        },
        {
          title: 'Products',
          bullet: 'dot',
          page: '/ecommerce/products'
        }
      ]
    }
  ]
};
