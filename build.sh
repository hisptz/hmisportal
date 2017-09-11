# Production buid
ng build --prod --aot

# Generate a SW manifest from our app
./node_modules/.bin/ngu-sw-manifest --module src/app/app.module.ts \
                                    --out dist/ngsw-manifest.json

# Copy prebuilt worker into our site
cp node_modules/@angular/service-worker/bundles/worker-basic.min.js dist/
