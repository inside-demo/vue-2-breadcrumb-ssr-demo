import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// route-level code splitting
const createListView = id => () => import('../views/CreateListView').then(m => m.default(id))
const ItemView = () => import('../views/ItemView.vue')
const UserView = () => import('../views/UserView.vue')

export function createRouter () {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { 
        path: '/top/:page(\\d+)?', 
        component: createListView('top')
      },
      { path: '/new/:page(\\d+)?', component: createListView('new') },
      { path: '/show/:page(\\d+)?', component: createListView('show') },
      { path: '/ask/:page(\\d+)?', component: createListView('ask') },
      { path: '/job/:page(\\d+)?', component: createListView('job') },
      { path: '/item/:id(\\d+)', component: ItemView },
      { path: '/user/:id', component: UserView },
      { path: '/', redirect: '/top' },
      {
        path: '/about',
        component: { 
          render(createElement) {
            return createElement('router-view')
          } 
        },
        meta: {
          breadcrumb: 'About'
        },
        children: [
          {
              path: '',
              name: 'About',
              component: { 
                render(createElement) {
                  return createElement(
                    'div', 
                    [
                      createElement('h2', 'About'),
                      createElement(
                        'router-link',
                        {
                          props: {
                            to: { path: '/about/foo' }
                          }
                        },
                        'foo'
                      )
                    ]
                  )
                } 
              }
          },
          {
              path: 'foo',
              component: { 
                render(createElement) {
                  return createElement('div', [createElement('h2', 'foo')])
                } 
              },
              meta: {
                  breadcrumb: () => `foo`
              }
          },
        ]
      },
    ]
  })
}
