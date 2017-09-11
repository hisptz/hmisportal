# Production buid
ng build --prod --aot

# Copy prebuilt worker into our site
cp node_modules/@angular/service-worker/bundles/worker-basic.min.js dist/

# ./node_modules/.bin/ngu-sw-manifest --module src/app/app.module.ts
