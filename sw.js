const CACHE_NAME='mass-islamic-media-v20-0';
const APP_SHELL=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png','./maskable-icon-512.png','./apple-touch-icon.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(APP_SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 const u=new URL(e.request.url);
 if(u.hostname==='api.aladhan.com'){e.respondWith(fetch(e.request,{cache:'no-store'}).catch(()=>caches.match(e.request)));return;}
 e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE_NAME).then(x=>x.put(e.request,c)).catch(()=>{});return r;}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));
});
