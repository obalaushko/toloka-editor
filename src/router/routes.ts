export const routes = {
    home: '*/',
    welcome: '/',
	editor: '/editor',
    notFound: '*',
    about: '/about',
    settings: {
        root: '/settings',
        userLink: '/settings/user/:id',
        user: (id: number) => `user/${id}`,
    },
};
