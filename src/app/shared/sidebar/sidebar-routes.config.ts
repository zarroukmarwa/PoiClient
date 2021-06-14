import { RouteInfo } from './sidebar.metadata';

//Sidebar menu Routes and data
export const ROUTES: RouteInfo[] = [

    { path: '/dashboard/dashboard1', title: 'Tableau de bord', icon: 'ft-home', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []},
    { path: '/pages/campaigns', title: 'Gestion des Campagnes', icon: 'fa fa-book', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    { path: '/pages/products', title: 'Gestion des Produits', icon: 'fa fa-list-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    { path: '/pages/customers', title: 'Gestion des Clients', icon: 'fa fa-user', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    {
        path: '', title: 'Administration', icon: 'ft-copy', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: '/pages/actions', title: 'Gestion des actions', icon: 'ft-arrow-right', class: 'submenu-icon', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/pages/roles', title: 'Gestion des Roles', icon: 'ft-arrow-right', class: 'submenu-icon', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/pages/affectations', title: 'Affectation des Acces', icon: 'ft-arrow-right', class: 'submenu-icon', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/pages/users', title: 'Gestion des utilisateurs', icon: 'ft-arrow-right', class: 'submenu-icon', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
    },
    /*{
        path: '', title: 'Pages', icon: 'ft-copy', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: '/pages/forgotpassword', title: 'Forgot Password', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/pages/horizontaltimeline', title: 'Horizontal Timeline', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/pages/verticaltimeline', title: 'Vertical Timeline', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/pages/login', title: 'Login', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/pages/register', title: 'Register', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/pages/profile', title: 'User Profile', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/pages/lockscreen', title: 'Lock Screen', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/pages/invoice', title: 'Invoice', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/pages/error', title: 'Error', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/pages/comingsoon', title: 'Coming Soon', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/pages/maintenance', title: 'Maintenance', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/pages/gallery', title: 'Gallery', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/pages/search', title: 'Search', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/pages/faq', title: 'FAQ', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/pages/kb', title: 'Knowledge Base', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
    },*/
    
];
