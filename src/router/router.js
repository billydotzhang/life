import App from '../App'

export default [{
  path: '/',
  component: App,
  children: [{
      path: '',
      redirect: '/appActivity' //默认跳转页面
    },
    {
      path: '/appActivity',
      component: r => require.ensure([], () => r(require('../page/app/activity/activity')), 'appActivity'),
      meta: {
        requireAuth: false,
        app: true
      }
    }, {
      path: '/appActivity/appActDetail',
      component: r => require.ensure([], () => r(require('../page/app/activity/children/actDetail')), 'appActDetail'),

      meta: {
        requireAuth: false,
        app: true
      }
    }, {
      path: '/appActivity/appReservation',
      component: r => require.ensure([], () => r(require('../page/app/activity/children/reservation')), 'appReservation'),

      meta: {
        requireAuth: true,
        app: true
      }
    },
    {
      path: '/codeRegister/:pNum',
      component: r => require.ensure([], () => r(require('../page/register/codeRegister')), 'codeRegister'),

      meta: {
        requireAuth: false
      }
    },
    {
      path: '/appProfile',
      component: r => require.ensure([], () => r(require('../page/app/profile/profile')), 'appProfile'),
      meta: {
        requireAuth: false,
        app: true
      },
    },
    {
      path: '/appProfile/appPayment',
      component: r => require.ensure([], () => r(require('../page/app/profile/children/payment')), 'appPayment'),
      meta: {
        requireAuth: true,
        app: true
      }
    },
    {
      path: '/appProfile/appMyActivity',
      component: r => require.ensure([], () => r(require('../page/app/profile/children/myActivity')), 'appMyActivity'),

      meta: {
        requireAuth: true,
        app: true
      }
    }, {
      path: '/appProfile/appMyActivity/appMyActDetail',
      component: r => require.ensure([], () => r(require('../page/app/profile/children/myActDetail')), 'appMyActDetail'),
      meta: {
        requireAuth: true,
        app: true
      }
    },
    {
      path: '/appProfile/appInvite',
      component: r => require.ensure([], () => r(require('../page/app/profile/children/invite')), 'appInvite'),

      meta: {
        requireAuth: true,
        app: true
      }
    },
    {
      path: '/appProfile/appMyId',
      component: r => require.ensure([], () => r(require('../page/app/profile/children/myId')), 'appMyId'),

      meta: {
        requireAuth: true,
        app: true
      }
    },
    {
      path: '/appProfile/appInvite/appSetInvite',
      component: r => require.ensure([], () => r(require('../page/app/profile/children/children/setInvite')), 'appSetInvite'),
      meta: {
        requireAuth: true,
        app: true
      }
    },
    {
      path: '/appHybProtocol',
      component: r => require.ensure([], () => r(require('../page/app/protocol/hyb')), 'appHybProtocol'),

      meta: {
        requireAuth: true,
        app: true

      }
    },
    {
      path: '/appProtocol',
      component: r => require.ensure([], () => r(require('../page/app/protocol/appHyb')), 'appProtocol'),

      meta: {
        requireAuth: true,
        app: true

      }
    },
    {
      path: '/appProfile/appSetPwd/appPayPwd',
      component: r => require.ensure([], () => r(require('../page/app/profile/children/payPwd')), 'appPayPwd'),
      meta: {
        requireAuth: true,
        app: true
      }
    },
    {
      path: '/fiveDetail',
      component: r => require.ensure([], () => r(require('../page/app/activity/fiveDetail')), 'fiveDetail'),
      meta: {
        requireAuth: true,
        app: true
      }
    },
    {
      path: '/hybdesc',
      component: r => require.ensure([], () => r(require('../page/app/protocol/hybdesc')), 'hybdesc'),
      meta: {
        requireAuth: true,
        app: true
      }
    }

  ]
}]
