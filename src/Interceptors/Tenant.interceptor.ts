import { HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';


export const tenantInterceptor: HttpInterceptorFn = (req, next) => {

  const host = window.location.hostname;

  let tenant = '';

  if (host === 'localhost') {

    tenant = 'test';

  } else {

    tenant = host.split('.')[0];

    tenant = tenant.replace('-admin', '');
  }

  const cloned = req.clone({
    setHeaders: {
      'X-Tenant': tenant
    }
  });

  return next(cloned);
};